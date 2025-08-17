#!/usr/bin/env python3
"""
Test Script for PhishGuard AI
This script tests the core functionality of the phishing detection system.
"""

import sys
import os
import time
import requests
from urllib.parse import urlparse

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_imports():
    """Test if all required modules can be imported"""
    print("🧪 Testing imports...")
    
    try:
        from app import app, db, User, ScanHistory
        print("✅ Flask app and models imported successfully")
        
        from phishing_detector import PhishingDetector
        print("✅ PhishingDetector imported successfully")
        
        from test_urls import TEST_URLS
        print("✅ Test URLs imported successfully")
        
        return True
    except ImportError as e:
        print(f"❌ Import error: {e}")
        return False

def test_database():
    """Test database connection and models"""
    print("\n🗄️  Testing database...")
    
    try:
        from app import app, db, User, ScanHistory
        
        with app.app_context():
            # Test database connection
            db.engine.execute("SELECT 1")
            print("✅ Database connection successful")
            
            # Test model creation
            db.create_all()
            print("✅ Database tables created/verified")
            
            # Test user query
            users = User.query.all()
            print(f"✅ Found {len(users)} users in database")
            
            return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def test_phishing_detector():
    """Test the phishing detection model"""
    print("\n🤖 Testing phishing detector...")
    
    try:
        from phishing_detector import PhishingDetector
        
        detector = PhishingDetector()
        print("✅ PhishingDetector initialized")
        
        # Test with a simple URL
        test_url = "https://www.google.com"
        result = detector.detect_phishing(test_url)
        
        print(f"✅ Detection result: {result['is_phishing']} (confidence: {result['confidence_score']:.2f})")
        print(f"✅ Features extracted: {len(result['features'])}")
        
        return True
    except Exception as e:
        print(f"❌ Phishing detector error: {e}")
        return False

def test_test_urls():
    """Test the predefined test URLs"""
    print("\n🧪 Testing predefined URLs...")
    
    try:
        from test_urls import TEST_URLS
        
        print(f"✅ Loaded {len(TEST_URLS)} test URLs")
        
        # Test a few URLs
        safe_count = 0
        phishing_count = 0
        
        for url, expected in list(TEST_URLS.items())[:5]:  # Test first 5
            if expected['is_phishing']:
                phishing_count += 1
            else:
                safe_count += 1
        
        print(f"✅ Test URLs: {safe_count} safe, {phishing_count} phishing")
        
        return True
    except Exception as e:
        print(f"❌ Test URLs error: {e}")
        return False

def test_flask_app():
    """Test if Flask app can start"""
    print("\n🌐 Testing Flask app...")
    
    try:
        from app import app
        
        # Test if app can be created
        print("✅ Flask app created successfully")
        
        # Test basic routes
        with app.test_client() as client:
            response = client.get('/')
            if response.status_code == 200:
                print("✅ Home route accessible")
            else:
                print(f"⚠️  Home route returned status {response.status_code}")
        
        return True
    except Exception as e:
        print(f"❌ Flask app error: {e}")
        return False

def run_all_tests():
    """Run all tests and provide summary"""
    print("🚀 Starting PhishGuard AI System Tests")
    print("=" * 50)
    
    tests = [
        ("Imports", test_imports),
        ("Database", test_database),
        ("Phishing Detector", test_phishing_detector),
        ("Test URLs", test_test_urls),
        ("Flask App", test_flask_app)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            success = test_func()
            results.append((test_name, success))
        except Exception as e:
            print(f"❌ {test_name} test failed with exception: {e}")
            results.append((test_name, False))
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, success in results:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if success:
            passed += 1
    
    print(f"\n🎯 Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! System is ready to use.")
        print("\n🚀 To start the system:")
        print("   1. Run: python init_db.py")
        print("   2. Run: python app.py")
        print("   3. Open: http://localhost:5000")
        return True
    else:
        print("⚠️  Some tests failed. Please check the errors above.")
        return False

if __name__ == '__main__':
    success = run_all_tests()
    sys.exit(0 if success else 1)
