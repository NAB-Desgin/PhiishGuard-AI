# 🛡️ PhishGuard AI - Phishing URL Detection System

A modern, AI-powered phishing URL detection system built with Python Flask backend and React frontend, featuring machine learning models for accurate threat detection.

## ✨ Features

- **🔍 AI-Powered Detection**: Advanced machine learning models for accurate phishing detection
- **🎨 Modern UI**: Beautiful React frontend with Tailwind CSS and dark/light theme toggle
- **📊 Real-time Analysis**: Instant URL scanning with confidence scores and risk levels
- **🔐 User Authentication**: Secure login/registration system with admin panel
- **📈 Scan History**: Track and manage your scanning activities
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🌙 Dark/Light Theme**: Toggle between themes for better user experience

## 🚀 Tech Stack

### Backend
- **Python 3.10+**
- **Flask** - Web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database
- **scikit-learn** - Machine learning
- **Random Forest Classifier** - ML model
- **BeautifulSoup** - Web scraping

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📋 Prerequisites

- Python 3.10 or higher
- Node.js 16 or higher
- npm or yarn

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <your-github-repo-url>
cd Phishing-AI
```

### 2. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py
```

The backend will be available at `http://localhost:5000`

### 3. Frontend Setup
```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Environment Variables
Create a `.env` file in the root directory:
```env
SECRET_KEY=your-secret-key-here
DATABASE_URI=sqlite:///phishing_detection.db
```

## 📊 Risk Level Classification

The system classifies URLs based on confidence scores:

- **🟢 Low Risk**: Confidence > 85% (Safe)
- **🟡 Medium Risk**: Confidence 50-85% (Caution)
- **🔴 High Risk**: Confidence < 50% (Dangerous)

## 🎯 How It Works

1. **URL Input**: User enters a URL to scan
2. **Feature Extraction**: System analyzes URL characteristics
3. **ML Analysis**: Machine learning model processes features
4. **Risk Assessment**: Calculates confidence and risk level
5. **Results Display**: Shows detailed analysis with color-coded indicators

## 🔍 Features Analyzed

- URL length and structure
- Domain characteristics
- Special characters and patterns
- Security indicators (HTTPS, IP addresses)
- Suspicious words and patterns
- Entropy calculations
- Redirect and tracking patterns

## 📱 API Endpoints

- `POST /api/scan` - Scan a URL for phishing
- `POST /api/login` - User authentication
- `POST /api/register` - User registration
- `GET /api/user/profile` - Get user profile

## 🚀 Deployment

### Backend (Production)
```bash
# Use a production WSGI server
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend (Production)
```bash
# Build for production
npm run build

# Serve static files
npm install -g serve
serve -s dist -l 3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for educational and research purposes. Always verify URLs independently and use at your own risk. The developers are not responsible for any misuse or damages.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/Phishing-AI/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- Flask community for the excellent web framework
- React team for the amazing frontend library
- scikit-learn for machine learning capabilities
- Tailwind CSS for the beautiful styling system

---

**Made with ❤️ for cybersecurity education**
