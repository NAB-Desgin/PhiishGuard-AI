import re
import numpy as np
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import pickle

class PhishingDetector:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.load_or_train_model()
    
    def load_or_train_model(self):
        """Load pre-trained model or train a new one if not available"""
        model_path = 'phishing_model.pkl'
        scaler_path = 'phishing_scaler.pkl'
        
        if os.path.exists(model_path) and os.path.exists(scaler_path):
            try:
                self.model = joblib.load(model_path)
                self.scaler = joblib.load(scaler_path)
                print("Loaded pre-trained phishing detection model")
            except:
                print("Error loading model, training new one...")
                self.train_model()
        else:
            print("No pre-trained model found, training new one...")
            self.train_model()
    
    def extract_features(self, url):
        """Extract features from URL for phishing detection"""
        features = {}
        
        # URL-based features
        parsed_url = urlparse(url)
        
        # Basic URL features
        features['url_length'] = len(url)
        features['domain_length'] = len(parsed_url.netloc)
        features['dots_in_domain'] = parsed_url.netloc.count('.')
        features['hyphens_in_domain'] = parsed_url.netloc.count('-')
        features['underscores_in_domain'] = parsed_url.netloc.count('_')
        features['slashes_in_path'] = url.count('/')
        features['equal_signs'] = url.count('=')
        features['at_symbols'] = url.count('@')
        features['exclamation_marks'] = url.count('!')
        features['spaces'] = url.count(' ')
        features['digits'] = sum(c.isdigit() for c in url)
        
        # Special characters count
        special_chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '"', "'", '<', '>', ',', '.', '?', '/', '~', '`']
        features['special_chars'] = sum(url.count(char) for char in special_chars)
        
        # Security features
        features['has_ip'] = 1 if re.search(r'\d+\.\d+\.\d+\.\d+', parsed_url.netloc) else 0
        features['has_port'] = 1 if ':' in parsed_url.netloc else 0
        features['uses_https'] = 1 if parsed_url.scheme == 'https' else 0
        
        # Domain structure
        features['subdomain_count'] = len(parsed_url.netloc.split('.')) - 1
        features['path_depth'] = len([x for x in parsed_url.path.split('/') if x]) if parsed_url.path else 0
        features['query_params'] = len(parsed_url.query.split('&')) if parsed_url.query else 0
        features['fragment_length'] = len(parsed_url.fragment) if parsed_url.fragment else 0
        
        # TLD analysis
        tld = parsed_url.netloc.split('.')[-1] if '.' in parsed_url.netloc else ''
        features['tld_length'] = len(tld)
        
        # Common legitimate domains (whitelist)
        common_domains = [
            'google.com', 'facebook.com', 'amazon.com', 'microsoft.com', 'apple.com', 
            'netflix.com', 'youtube.com', 'twitter.com', 'instagram.com', 'linkedin.com',
            'github.com', 'stackoverflow.com', 'reddit.com', 'wikipedia.org', 'yahoo.com',
            'bing.com', 'dropbox.com', 'spotify.com', 'discord.com', 'telegram.org',
            'whatsapp.com', 'snapchat.com', 'tiktok.com', 'uber.com', 'lyft.com',
            'airbnb.com', 'booking.com', 'expedia.com', 'hotels.com', 'trivago.com',
            'agoda.com', 'tripadvisor.com', 'yelp.com', 'zomato.com', 'doordash.com',
            'grubhub.com', 'ubereats.com', 'postmates.com', 'instacart.com',
            'amazonfresh.com', 'wholefoods.com', 'walmart.com', 'target.com',
            'costco.com', 'bestbuy.com', 'homedepot.com', 'lowes.com', 'ikea.com',
            'wayfair.com', 'etsy.com', 'shopify.com', 'woocommerce.com'
        ]
        features['is_common_domain'] = 1 if parsed_url.netloc.lower() in common_domains else 0
        
        # Suspicious patterns
        suspicious_words = [
            'secure', 'account', 'banking', 'login', 'signin', 'verify', 'update', 
            'confirm', 'billing', 'paypal', 'ebay', 'amazon', 'apple', 'google', 
            'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'netflix'
        ]
        features['suspicious_words'] = sum(1 for word in suspicious_words if word.lower() in url.lower())
        
        # Entropy calculations
        features['url_entropy'] = self.calculate_entropy(url)
        features['domain_entropy'] = self.calculate_entropy(parsed_url.netloc)
        features['path_entropy'] = self.calculate_entropy(parsed_url.path)
        features['query_entropy'] = self.calculate_entropy(parsed_url.query)
        features['fragment_entropy'] = self.calculate_entropy(parsed_url.fragment)
        
        # Redirect and tracking patterns
        features['has_redirect'] = 1 if 'redirect' in url.lower() else 0
        features['has_click'] = 1 if 'click' in url.lower() else 0
        features['has_track'] = 1 if 'track' in url.lower() else 0
        
        # Additional security indicators
        features['has_shortener'] = 1 if any(shortener in url.lower() for shortener in ['bit.ly', 'tinyurl', 'goo.gl', 't.co', 'is.gd']) else 0
        features['has_suspicious_tld'] = 1 if tld in ['tk', 'ml', 'ga', 'cf', 'gq'] else 0
        
        # Normalize features
        features['url_length_norm'] = min(features['url_length'] / 200, 1.0)
        features['domain_length_norm'] = min(features['domain_length'] / 50, 1.0)
        features['special_chars_norm'] = min(features['special_chars'] / 20, 1.0)
        
        return features
    
    def calculate_entropy(self, text):
        """Calculate Shannon entropy of text"""
        if not text:
            return 0
        
        # Count character frequencies
        char_counts = {}
        for char in text:
            char_counts[char] = char_counts.get(char, 0) + 1
        
        # Calculate entropy
        entropy = 0
        text_length = len(text)
        for count in char_counts.values():
            probability = count / text_length
            entropy -= probability * np.log2(probability)
        
        return entropy
    
    def extract_text_features(self, url):
        """Extract text-based features for additional analysis"""
        try:
            # Try to get the webpage content
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
            response = requests.get(url, headers=headers, timeout=10, verify=False)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract text content
            text = soup.get_text()
            
            # Clean text
            text = re.sub(r'\s+', ' ', text).strip()
            
            return text
        except:
            # If we can't fetch the page, return the URL itself
            return url
    
    def train_model(self):
        """Train a new phishing detection model with improved data"""
        print("Training new phishing detection model...")
        
        # Generate more realistic training data
        np.random.seed(42)
        n_samples = 2000
        
        # Generate features for training data
        X = []
        y = []
        
        # Generate legitimate URLs (more realistic)
        for i in range(n_samples // 2):
            features = {
                'url_length': np.random.randint(20, 150),
                'domain_length': np.random.randint(8, 30),
                'dots_in_domain': np.random.randint(1, 3),
                'hyphens_in_domain': np.random.randint(0, 2),
                'underscores_in_domain': 0,  # Legitimate sites rarely have underscores
                'slashes_in_path': np.random.randint(0, 5),
                'equal_signs': np.random.randint(0, 3),
                'at_symbols': 0,  # Legitimate sites don't have @ in domain
                'exclamation_marks': 0,
                'spaces': 0,
                'digits': np.random.randint(0, 10),
                'special_chars': np.random.randint(0, 8),
                'has_ip': 0,  # Legitimate sites rarely use IP addresses
                'has_port': 0,
                'uses_https': np.random.choice([0, 1], p=[0.2, 0.8]),  # Most legitimate sites use HTTPS
                'subdomain_count': np.random.randint(0, 2),
                'path_depth': np.random.randint(0, 4),
                'query_params': np.random.randint(0, 4),
                'fragment_length': np.random.randint(0, 15),
                'tld_length': np.random.randint(2, 5),
                'is_common_domain': np.random.choice([0, 1], p=[0.7, 0.3]),
                'suspicious_words': np.random.randint(0, 2),
                'url_entropy': np.random.uniform(2, 4),
                'domain_entropy': np.random.uniform(2, 4),
                'path_entropy': np.random.uniform(1, 3),
                'query_entropy': np.random.uniform(0, 2),
                'fragment_entropy': np.random.uniform(0, 1),
                'has_redirect': 0,
                'has_click': 0,
                'has_track': 0,
                'has_shortener': 0,
                'has_suspicious_tld': 0,
                'url_length_norm': np.random.uniform(0.1, 0.7),
                'domain_length_norm': np.random.uniform(0.2, 0.6),
                'special_chars_norm': np.random.uniform(0, 0.4)
            }
            
            X.append(list(features.values()))
            y.append(0)  # Legitimate
        
        # Generate phishing URLs (more realistic)
        for i in range(n_samples // 2):
            features = {
                'url_length': np.random.randint(50, 250),
                'domain_length': np.random.randint(15, 60),
                'dots_in_domain': np.random.randint(2, 6),
                'hyphens_in_domain': np.random.randint(1, 5),
                'underscores_in_domain': np.random.randint(0, 3),
                'slashes_in_path': np.random.randint(2, 12),
                'equal_signs': np.random.randint(1, 8),
                'at_symbols': np.random.choice([0, 1], p=[0.8, 0.2]),
                'exclamation_marks': np.random.randint(0, 4),
                'spaces': np.random.randint(0, 3),
                'digits': np.random.randint(5, 30),
                'special_chars': np.random.randint(8, 25),
                'has_ip': np.random.choice([0, 1], p=[0.7, 0.3]),
                'has_port': np.random.choice([0, 1], p=[0.8, 0.2]),
                'uses_https': np.random.choice([0, 1], p=[0.6, 0.4]),  # Phishing sites often don't use HTTPS
                'subdomain_count': np.random.randint(2, 8),
                'path_depth': np.random.randint(3, 15),
                'query_params': np.random.randint(2, 10),
                'fragment_length': np.random.randint(5, 40),
                'tld_length': np.random.randint(2, 8),
                'is_common_domain': 0,  # Phishing sites rarely mimic common domains exactly
                'suspicious_words': np.random.randint(2, 8),
                'url_entropy': np.random.uniform(3, 6),
                'domain_entropy': np.random.uniform(3, 6),
                'path_entropy': np.random.uniform(2, 5),
                'query_entropy': np.random.uniform(1, 4),
                'fragment_entropy': np.random.uniform(1, 3),
                'has_redirect': np.random.choice([0, 1], p=[0.6, 0.4]),
                'has_click': np.random.choice([0, 1], p=[0.7, 0.3]),
                'has_track': np.random.choice([0, 1], p=[0.8, 0.2]),
                'has_shortener': np.random.choice([0, 1], p=[0.7, 0.3]),
                'has_suspicious_tld': np.random.choice([0, 1], p=[0.8, 0.2]),
                'url_length_norm': np.random.uniform(0.3, 1.0),
                'domain_length_norm': np.random.uniform(0.4, 1.0),
                'special_chars_norm': np.random.uniform(0.4, 1.0)
            }
            
            X.append(list(features.values()))
            y.append(1)  # Phishing
        
        # Convert to numpy arrays
        X = np.array(X)
        y = np.array(y)
        
        # Shuffle the data
        indices = np.arange(len(X))
        np.random.shuffle(indices)
        X = X[indices]
        y = y[indices]
        
        # Scale features
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)
        
        # Train Random Forest model with better parameters
        self.model = RandomForestClassifier(
            n_estimators=200, 
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            class_weight='balanced'
        )
        self.model.fit(X_scaled, y)
        
        # Save the model and scaler
        joblib.dump(self.model, 'phishing_model.pkl')
        joblib.dump(self.scaler, 'phishing_scaler.pkl')
        print("Model trained and saved successfully!")
    
    def detect_phishing(self, url):
        """Detect if a URL is phishing with improved accuracy"""
        try:
            # Extract features
            features = self.extract_features(url)
            feature_vector = list(features.values())
            
            # Scale features
            feature_vector_scaled = self.scaler.transform([feature_vector])
            
            # Make prediction
            prediction = self.model.predict(feature_vector_scaled)[0]
            confidence_probs = self.model.predict_proba(feature_vector_scaled)[0]
            
            # Use the probability of the predicted class as confidence
            confidence = confidence_probs[prediction]
            
            # Extract text features for additional analysis
            text_content = self.extract_text_features(url)
            
            # Determine risk level based on confidence and features
            risk_score = 0
            if prediction == 1:  # Phishing
                risk_score += confidence * 0.6
                risk_score += features['has_ip'] * 0.1
                risk_score += features['has_suspicious_tld'] * 0.1
                risk_score += features['has_shortener'] * 0.1
                risk_score += (features['suspicious_words'] / 10) * 0.1
            else:  # Legitimate
                risk_score += (1 - confidence) * 0.6
                risk_score += features['is_common_domain'] * 0.2
                risk_score += features['uses_https'] * 0.2
            
            # Determine risk level based on confidence percentage (will be overridden by backend)
            if risk_score > 0.7:
                risk_level = 'High'
            elif risk_score > 0.4:
                risk_level = 'Medium'
            else:
                risk_level = 'Low'
            
            result = {
                'is_phishing': bool(prediction),
                'confidence_score': float(confidence),
                'features': features,
                'text_content': text_content[:500] + '...' if len(text_content) > 500 else text_content,
                'risk_level': risk_level,
                'risk_score': float(risk_score)
            }
            
            return result
            
        except Exception as e:
            print(f"Error in phishing detection: {e}")
            # Return a safe default
            return {
                'is_phishing': False,
                'confidence_score': 0.0,
                'features': {},
                'text_content': '',
                'risk_level': 'Unknown',
                'risk_score': 0.0
            }
