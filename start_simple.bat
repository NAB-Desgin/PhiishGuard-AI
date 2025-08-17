@echo off
title PhishGuard AI - Quick Start
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
echo                    Quick Start - PhishGuard AI
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

:: Check if database exists, if not initialize it
if not exist "phishing_detection.db" (
    echo 🗄️  Database not found. Initializing...
    python init_db.py
    if errorlevel 1 (
        echo ❌ Failed to initialize database
        pause
        exit /b 1
    )
    echo ✅ Database initialized successfully!
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
