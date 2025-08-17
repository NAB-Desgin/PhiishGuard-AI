#!/usr/bin/env python3
"""
Database Initialization Script for PhishGuard AI
This script sets up the database, creates tables, and adds initial data.
"""

import os
import sys
from datetime import datetime, timedelta
import random

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db, User, ScanHistory
from werkzeug.security import generate_password_hash

def init_database():
    """Initialize the database with tables and sample data"""
    print("🚀 Initializing PhishGuard AI Database...")
    
    with app.app_context():
        # Create all tables
        print("📊 Creating database tables...")
        db.create_all()
        print("✅ Database tables created successfully!")
        
        # Check if admin user exists
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            print("👑 Creating admin user...")
            admin = User(
                username='admin',
                email='admin@phishguard.ai',
                password_hash=generate_password_hash('admin123'),
                is_admin=True,
                created_at=datetime.utcnow(),
                last_login=datetime.utcnow()
            )
            db.session.add(admin)
            print("✅ Admin user created: username='admin', password='admin123'")
        
        # Check if demo user exists
        demo_user = User.query.filter_by(username='demo').first()
        if not demo_user:
            print("👤 Creating demo user...")
            demo_user = User(
                username='demo',
                email='demo@phishguard.ai',
                password_hash=generate_password_hash('demo123'),
                is_admin=False,
                created_at=datetime.utcnow(),
                last_login=datetime.utcnow()
            )
            db.session.add(demo_user)
            print("✅ Demo user created: username='demo', password='demo123'")
        
        # Create sample scan history for demo user
        if demo_user:
            existing_scans = ScanHistory.query.filter_by(user_id=demo_user.id).count()
            if existing_scans == 0:
                print("📈 Creating sample scan history...")
                
                # Sample URLs for demo
                sample_urls = [
                    "https://www.google.com/",
                    "https://www.facebook.com/",
                    "https://secure-login-google.com/",
                    "https://amaz0n-support.net",
                    "https://www.microsoft.com/",
                    "https://micros0ft-update.org",
                    "https://www.apple.com/",
                    "https://appleid-helpcenter.com"
                ]
                
                # Create sample scans over the past 30 days
                for i, url in enumerate(sample_urls):
                    # Random date within last 30 days
                    days_ago = random.randint(0, 30)
                    scan_date = datetime.utcnow() - timedelta(days=days_ago)
                    
                    # Determine if phishing based on URL
                    is_phishing = any(suspicious in url.lower() for suspicious in ['secure-login', 'amaz0n', 'micros0ft', 'appleid'])
                    confidence = random.uniform(0.85, 0.98) if not is_phishing else random.uniform(0.15, 0.75)
                    
                    scan = ScanHistory(
                        user_id=demo_user.id,
                        url=url,
                        is_phishing=is_phishing,
                        confidence_score=confidence,
                        features=str({
                            'url_length': len(url),
                            'domain_length': len(url.split('/')[2]) if '//' in url else len(url),
                            'uses_https': 1 if url.startswith('https') else 0
                        }),
                        timestamp=scan_date
                    )
                    db.session.add(scan)
                
                print(f"✅ Created {len(sample_urls)} sample scan records")
        
        # Commit all changes
        try:
            db.session.commit()
            print("💾 All changes committed to database!")
        except Exception as e:
            print(f"❌ Error committing to database: {e}")
            db.session.rollback()
            return False
        
        print("\n🎉 Database initialization completed successfully!")
        print("\n📋 Login Credentials:")
        print("   Admin: username='admin', password='admin123'")
        print("   Demo:  username='demo',  password='demo123'")
        print("\n🔗 You can now run the application with: python app.py")
        
        return True

def reset_database():
    """Reset the database (WARNING: This will delete all data!)"""
    print("⚠️  WARNING: This will delete all data!")
    confirm = input("Type 'YES' to confirm: ")
    
    if confirm == 'YES':
        with app.app_context():
            print("🗑️  Dropping all tables...")
            db.drop_all()
            print("✅ All tables dropped!")
            
            print("🔄 Reinitializing database...")
            return init_database()
    else:
        print("❌ Database reset cancelled.")
        return False

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--reset':
        reset_database()
    else:
        init_database()
