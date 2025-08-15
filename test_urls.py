# Test URLs for Phishing Detection System
# This file contains various URLs used to test the phishing detection algorithm

TEST_URLS = {
    # Safe URLs (Legitimate websites)
    "https://www.google.com/": {"is_phishing": False, "confidence_score": 0.98},
    "https://www.facebook.com/": {"is_phishing": False, "confidence_score": 0.97},
    "https://www.microsoft.com/": {"is_phishing": False, "confidence_score": 0.96},
    "https://www.apple.com/": {"is_phishing": False, "confidence_score": 0.94},
    "https://www.amazon.com/": {"is_phishing": False, "confidence_score": 0.96},
    "https://www.openai.com/": {"is_phishing": False, "confidence_score": 0.92},
    "https://www.nasa.gov/": {"is_phishing": False, "confidence_score": 0.93},
    "https://www.stackoverflow.com/": {"is_phishing": False, "confidence_score": 0.97},
    "https://www.github.com/": {"is_phishing": False, "confidence_score": 0.95},
    "https://www.bbc.com/": {"is_phishing": False, "confidence_score": 0.96},
    "https://vtu.ac.in/": {"is_phishing": False, "confidence_score": 0.99},
    "https://www.pesitm.edu.in/": {"is_phishing": False, "confidence_score": 0.99},

    # Medium Risk URLs (>75% risk)
    "https://secure-login-google.com/": {"is_phishing": True, "confidence_score": 0.70},
    "https://amaz0n-support.net": {"is_phishing": True, "confidence_score": 0.78},
    "https://micros0ft-update.org": {"is_phishing": True, "confidence_score": 0.72},
    "https://appleid-helpcenter.com": {"is_phishing": True, "confidence_score": 0.66},
    "https://paypa1-verification.net": {"is_phishing": True, "confidence_score": 0.67},
    "https://bankofamerica-login-support.com": {"is_phishing": True, "confidence_score": 0.71},
    "https://faceb00k-loginalert.net": {"is_phishing": True, "confidence_score": 0.79},
    "https://youtube-security-update.com": {"is_phishing": True, "confidence_score": 0.73},
    "https://g00gle-account-check.com": {"is_phishing": True, "confidence_score": 0.70},
    "https://login-verification-github.org": {"is_phishing": True, "confidence_score": 0.74},

    # High Risk URLs (<50% safe score)
    "http://paypal-login.secure-authenticate.com": {"is_phishing": True, "confidence_score": 0.15},
    "http://update-microsoft-security-alerts.com": {"is_phishing": True, "confidence_score": 0.10},
    "http://bank-login-verification-now.com": {"is_phishing": True, "confidence_score": 0.25},
    "http://secure-chasebank-login-alert.com": {"is_phishing": True, "confidence_score": 0.20},
    "http://free-giftcard-claim-now.com": {"is_phishing": True, "confidence_score": 0.30},
    "http://appleid-login-verification-urgent.com": {"is_phishing": True, "confidence_score": 0.18},
    "http://google-security-warning-immediate.com": {"is_phishing": True, "confidence_score": 0.12},
    "http://insta-followers-free-giveaway.com": {"is_phishing": True, "confidence_score": 0.28},
    "http://verify-your-account-today-online.com": {"is_phishing": True, "confidence_score": 0.22},
    "http://win-big-prize-now-luckyuser.com": {"is_phishing": True, "confidence_score": 0.35},
}
