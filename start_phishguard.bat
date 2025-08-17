@echo off
title PhishGuard AI - Phishing Detection System
color 0A

echo.
echo  ██████╗ ██╗  ██╗██╗███████╗██╗  ██╗ ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗ 
echo  ██╔══██╗██║  ██║██║██╔════╝██║  ██║██╔═══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗
echo  ██████╔╝███████║██║███████╗ ███████║██║   ██║██║   ██║███████║██████╔╝██║  ██║
echo  ██╔═══╝ ██╔══██║██║╚════██║ ██╔══██║██║   ██║╚██╗ ██╔╝██╔══██║██╔══██╗██║  ██║
echo  ██║     ██║  ██║██║███████║ ██║  ██║╚██████╔╝ ╚████╔╝ ██║  ██║██║  ██║██████╔╝
echo  ╚═╝     ╚═╝  ╚═╝╚═╝╚══════╝ ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
echo.
echo  █████╗ ██╗     █████╗ ██╗   ██╗███████╗███████╗███████╗███████╗███████╗███████╗
echo ██╔══██╗██║    ██╔══██╗██║   ██║██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝██╔════╝
echo ███████║██║    ███████║██║   ██║█████╗  █████╗  █████╗  █████╗  █████╗  █████╗ 
echo ██╔══██║██║    ██╔══██║╚██╗ ██╔╝██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝  ██╔══╝ 
echo ██║  ██║███████╗██║  ██║ ╚████╔╝ ███████╗███████╗███████╗███████╗███████╗███████╗
echo ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝╚══════╝
echo.
echo ================================================================================
echo                    Professional Phishing Detection System
echo ================================================================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python is not installed or not in PATH
    echo.
    echo Please install Python 3.8 or higher from: https://python.org
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo ✅ Python found: 
python --version
echo.

:: Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ❌ Failed to create virtual environment
        pause
        exit /b 1
    )
    echo ✅ Virtual environment created
)

:: Activate virtual environment
echo 🔄 Activating virtual environment...
call venv\Scripts\activate.bat
if errorlevel 1 (
    echo ❌ Failed to activate virtual environment
    pause
    exit /b 1
)
echo ✅ Virtual environment activated
echo.

:: Install/Update dependencies
echo 📥 Installing/Updating dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    echo.
    echo Please check your internet connection and try again
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

:: Check if database exists
if not exist "phishing_detection.db" (
    echo 🗄️  Initializing database...
    python init_db.py
    if errorlevel 1 (
        echo ❌ Failed to initialize database
        pause
        exit /b 1
    )
    echo ✅ Database initialized
    echo.
    echo 📋 Default login credentials:
    echo    Admin: username='admin', password='admin123'
    echo    Demo:  username='demo',  password='demo123'
    echo.
) else (
    echo ✅ Database found
)

echo.
echo 🚀 Starting PhishGuard AI...
echo.
echo 📍 Access the application at: http://localhost:5000
echo 🔐 Login with admin/demo accounts
echo 🧪 Test with URLs from test_urls.py
echo.
echo Press Ctrl+C to stop the server
echo ================================================================================
echo.

:: Start the Flask application
python app.py

echo.
echo ================================================================================
echo                           PhishGuard AI stopped
echo ================================================================================
echo.
pause
