from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime
import requests
from urllib.parse import urlparse
import re
import joblib
import numpy as np
from phishing_detector import PhishingDetector
from functools import wraps

# Import test URLs from separate file
from test_urls import TEST_URLS

# Test URLs for testing the phishing detection system
test_urls = TEST_URLS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///phishing_detection.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Initialize phishing detector
phishing_detector = PhishingDetector()

# Custom authentication decorator for API endpoints
def api_auth_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check for Bearer token first
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            # Parse the simple token format: token_{user_id}_{timestamp}
            try:
                parts = token.split('_')
                if len(parts) == 3 and parts[0] == 'token':
                    user_id = int(parts[1])
                    user = User.query.get(user_id)
                    if user:
                        # Store user in request context for this request
                        request.current_user = user
                        return f(*args, **kwargs)
            except (ValueError, IndexError):
                pass
        
        # Fall back to session-based authentication
        if not current_user.is_authenticated:
            return jsonify({'error': 'Authentication required'}), 401
        
        return f(*args, **kwargs)
    return decorated_function

# Database Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    scan_count = db.Column(db.Integer, default=0)

class ScanHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    url = db.Column(db.String(500), nullable=False)
    is_phishing = db.Column(db.Boolean, nullable=False)
    confidence_score = db.Column(db.Float, nullable=False)
    features = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if not username or not password:
            flash('Please enter both username and password', 'error')
            return render_template('login.html')
        
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            user.last_login = datetime.utcnow()
            db.session.commit()
            flash('Login successful! Welcome back, ' + username + '!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password. Please try again.', 'error')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        if User.query.filter_by(username=username).first():
            flash('Username already exists', 'error')
            return render_template('register.html')
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered', 'error')
            return render_template('register.html')
        
        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()
        
        flash('Registration successful! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Logged out successfully', 'success')
    return redirect(url_for('index'))

@app.route('/dashboard')
@login_required
def dashboard():
    recent_scans = ScanHistory.query.filter_by(user_id=current_user.id).order_by(ScanHistory.timestamp.desc()).limit(5).all()
    return render_template('dashboard.html', recent_scans=recent_scans)

@app.route('/scan', methods=['GET', 'POST'])
@login_required
def scan_url():
    if request.method == 'POST':
        url = request.form['url']
        
        if not url:
            flash('Please enter a URL', 'error')
            return render_template('scan.html')
        
        # Normalize URL - add protocol if missing
        if not url.startswith(('http://', 'https://')):
            url = 'http://' + url
        
        try:
            # First check in test URLs
            if url in test_urls:
                result = test_urls[url]
                result['features'] = {}
            else:
                # Analyze URL using ML model
                result = phishing_detector.detect_phishing(url)
            
            # Save scan history
            scan = ScanHistory(
                user_id=current_user.id,
                url=url,
                is_phishing=result['is_phishing'],
                confidence_score=result['confidence_score'],
                features=str(result['features'])
            )
            db.session.add(scan)
            
            # Update user scan count
            current_user.scan_count += 1
            db.session.commit()
            
            return render_template('scan_result.html', result=result, url=url)
            
        except Exception as e:
            flash(f'Error analyzing URL: {str(e)}', 'error')
            return render_template('scan.html')
    
    return render_template('scan.html')

@app.route('/history')
@login_required
def scan_history():
    page = request.args.get('page', 1, type=int)
    scans = ScanHistory.query.filter_by(user_id=current_user.id).order_by(ScanHistory.timestamp.desc()).paginate(
        page=page, per_page=20, error_out=False)
    return render_template('history.html', scans=scans)

@app.route('/info')
def info_page():
    """Information page about phishing types and prevention"""
    return render_template('info.html')

@app.route('/admin')
@login_required
def admin_panel():
    if not current_user.is_admin:
        flash('Access denied. Admin privileges required.', 'error')
        return redirect(url_for('dashboard'))
    
    users = User.query.all()
    total_scans = ScanHistory.query.count()
    return render_template('admin.html', users=users, total_scans=total_scans)

@app.route('/admin/user/<int:user_id>/toggle_admin')
@login_required
def toggle_admin(user_id):
    if not current_user.is_admin:
        return jsonify({'error': 'Access denied'}), 403
    
    user = User.query.get_or_404(user_id)
    if user.id == current_user.id:
        return jsonify({'error': 'Cannot modify your own admin status'}), 400
    
    user.is_admin = not user.is_admin
    db.session.commit()
    return jsonify({'success': True, 'is_admin': user.is_admin})

@app.route('/admin/user/<int:user_id>/delete')
@login_required
def delete_user(user_id):
    if not current_user.is_admin:
        return jsonify({'error': 'Access denied'}), 403
    
    user = User.query.get_or_404(user_id)
    if user.id == current_user.id:
        return jsonify({'error': 'Cannot delete your own account'}), 400
    
    # Delete user's scan history
    ScanHistory.query.filter_by(user_id=user_id).delete()
    
    # Delete user
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'success': True})

# API endpoint for AJAX requests
@app.route('/api/scan', methods=['POST'])
def api_scan():
    data = request.get_json()
    url = data.get('url')
    
    if not url:
        return jsonify({'error': 'URL is required'}), 400
    
    # Normalize URL - add protocol if missing
    if not url.startswith(('http://', 'https://')):
        url = 'http://' + url
    
    try:
        if url in test_urls:
            result = test_urls[url]
            result['features'] = {}
        else:
            result = phishing_detector.detect_phishing(url)
        
        # Get user from token or session if available (optional)
        user = None
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header.split(' ')[1]
            try:
                parts = token.split('_')
                if len(parts) == 3 and parts[0] == 'token':
                    user_id = int(parts[1])
                    user = User.query.get(user_id)
            except (ValueError, IndexError):
                pass
        elif current_user.is_authenticated:
            user = current_user
        
        # Save scan history if user is authenticated
        if user:
            scan = ScanHistory(
                user_id=user.id,
                url=url,
                is_phishing=result['is_phishing'],
                confidence_score=result['confidence_score'],
                features=str(result['features'])
            )
            db.session.add(scan)
            user.scan_count += 1
            db.session.commit()
        
        # Calculate risk level based on confidence percentage
        confidence_percentage = result['confidence_score'] * 100
        
        if confidence_percentage > 85:
            risk_level = 'Low'
        elif confidence_percentage > 50:
            risk_level = 'Medium'
        else:
            risk_level = 'High'
        
        # Return data structure that React frontend expects
        response_data = {
            'url': url,
            'confidence': result['confidence_score'],  # React expects 'confidence' not 'confidence_score'
            'is_phishing': result['is_phishing'],
            'risk_level': risk_level,
            'confidence_percentage': confidence_percentage,
            'features': result['features']
        }
        
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Generate a simple token (in production, use JWT)
        token = f"token_{user.id}_{int(datetime.utcnow().timestamp())}"
        
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_admin': user.is_admin
            }
        })
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password)
    )
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': 'Registration successful! Please login.'
    })

@app.route('/api/user/profile')
@api_auth_required
def api_user_profile():
    # Get user from token or session
    user = None
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        try:
            parts = token.split('_')
            if len(parts) == 3 and parts[0] == 'token':
                user_id = int(parts[1])
                user = User.query.get(user_id)
        except (ValueError, IndexError):
            pass
    
    if not user:
        # Fall back to session-based authentication
        if not current_user.is_authenticated:
            return jsonify({'error': 'Authentication required'}), 401
        user = current_user
    
    return jsonify({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin
        }
    })

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        
        # Create admin user if it doesn't exist
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            admin = User(
                username='admin',
                email='admin@phishingdetection.com',
                password_hash=generate_password_hash('admin123'),
                is_admin=True
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin user created: username='admin', password='admin123'")
    
    app.run(debug=True)
