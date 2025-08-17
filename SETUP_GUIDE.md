# PhishGuard AI - Complete Setup Guide

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git (optional, for version control)

### 1. Clone/Download the Project
```bash
# If using Git
git clone <repository-url>
cd "Phiishing AI"

# Or simply download and extract the ZIP file
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Initialize the Database
```bash
python init_db.py
```

### 4. Run the Application
```bash
python app.py
```

### 5. Access the Application
Open your browser and go to: `http://localhost:5000`

## 🔐 Default Login Credentials

After running `init_db.py`, you'll have these accounts:

- **Admin User:**
  - Username: `admin`
  - Password: `admin123`
  - Access: Full admin privileges

- **Demo User:**
  - Username: `demo`
  - Password: `demo123`
  - Access: Regular user privileges

## 🗄️ Database Setup

### SQLite (Default)
The system uses SQLite by default, which requires no additional setup.

### PostgreSQL (Production)
For production use, you can switch to PostgreSQL:

1. Install PostgreSQL
2. Create a database
3. Update `config.py`:
```python
SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/phishing_detection'
```

### MySQL
For MySQL support:

1. Install MySQL
2. Create a database
3. Update `config.py`:
```python
SQLALCHEMY_DATABASE_URI = 'mysql://username:password@localhost/phishing_detection'
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=sqlite:///phishing_detection.db

# Security
SECRET_KEY=your-super-secret-key-change-this-in-production

# API Settings
API_RATE_LIMIT=100
API_TIMEOUT=30

# ML Model Settings
MODEL_CONFIDENCE_THRESHOLD=0.7
SCAN_DELAY_MIN=5
SCAN_DELAY_MAX=8

# Environment
FLASK_ENV=development
```

### Configuration Classes
The system supports multiple configuration profiles:

- **Development**: `FLASK_ENV=development`
- **Production**: `FLASK_ENV=production`
- **Testing**: `FLASK_ENV=testing`

## 🔧 Database Management

### Initialize Database
```bash
python init_db.py
```

### Reset Database (WARNING: Deletes all data!)
```bash
python init_db.py --reset
```

### Database Schema
The system automatically creates these tables:

- **Users**: User accounts and authentication
- **Scan History**: URL scan results and metadata

### Backup Database
```bash
# SQLite
cp phishing_detection.db phishing_detection_backup.db

# PostgreSQL
pg_dump phishing_detection > backup.sql

# MySQL
mysqldump -u username -p phishing_detection > backup.sql
```

## 🌐 API Usage

### Authentication
The API supports both session-based and token-based authentication.

#### Get Token
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

#### Use Token
```bash
curl -X POST http://localhost:5000/api/scan \
  -H "Authorization: Bearer token_1_1640995200" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### API Endpoints
- `POST /api/login` - User authentication
- `POST /api/register` - User registration
- `POST /api/scan` - URL scanning
- `GET /api/user/profile` - User profile

## 🧪 Testing

### Test URLs
The system includes predefined test URLs:

**Safe URLs:**
- `https://www.google.com/`
- `https://www.facebook.com/`
- `https://www.microsoft.com/`

**Phishing URLs:**
- `https://secure-login-google.com/`
- `https://amaz0n-support.net`
- `https://micros0ft-update.org`

### Testing the System
1. Login with demo account
2. Go to Scan page
3. Try both safe and phishing URLs
4. Observe realistic scanning delays (5-8 seconds)

## 🚀 Deployment

### Development Server
```bash
python app.py
```

### Production Server (Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Docker Deployment
```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 5000

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

## 🔒 Security Features

### Built-in Security
- Password hashing with Werkzeug
- Session management with Flask-Login
- CSRF protection
- XSS prevention headers
- Secure cookie settings

### Production Security Checklist
- [ ] Change default admin password
- [ ] Use strong SECRET_KEY
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Configure firewall rules
- [ ] Regular security updates

## 📊 Monitoring and Logs

### Application Logs
The Flask development server shows logs in the console.

### Database Monitoring
Monitor the SQLite database size and performance:
```bash
# Check database size
ls -lh phishing_detection.db

# Check table sizes
sqlite3 phishing_detection.db ".tables"
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Database Connection Error
```bash
# Solution: Reinitialize database
python init_db.py --reset
```

#### 2. Import Errors
```bash
# Solution: Install missing dependencies
pip install -r requirements.txt
```

#### 3. Port Already in Use
```bash
# Solution: Change port in app.py
app.run(debug=True, port=5001)
```

#### 4. Permission Errors
```bash
# Solution: Check file permissions
chmod +x init_db.py
chmod +x app.py
```

### Debug Mode
Enable debug mode for detailed error messages:
```python
# In config.py
DEBUG = True
```

## 📚 Additional Resources

### Documentation
- `API_DOCUMENTATION.md` - Complete API reference
- `README.md` - Project overview
- `requirements.txt` - Dependencies list

### Support
- Check the troubleshooting section
- Review error logs
- Test with known good URLs
- Verify database integrity

## 🎯 Next Steps

After successful setup:

1. **Customize the UI** - Modify templates in `templates/` folder
2. **Add More Features** - Extend the phishing detection algorithm
3. **Integrate External APIs** - Add more threat intelligence sources
4. **Scale the System** - Move to production database and server
5. **Add Monitoring** - Implement logging and alerting systems

## 🏆 Success Indicators

Your system is working correctly when:

- ✅ Database initializes without errors
- ✅ Application starts on localhost:5000
- ✅ Login works with admin/demo accounts
- ✅ URL scanning shows realistic delays
- ✅ Results display correctly
- ✅ API endpoints respond properly

---

**Happy Phishing Detection! 🛡️**
