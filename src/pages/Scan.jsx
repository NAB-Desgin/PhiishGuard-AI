import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Scan = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { scanUrl, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL to scan');
      return;
    }

    // Normalize URL - add protocol if missing
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'http://' + normalizedUrl;
    }

    console.log('Starting scan for URL:', normalizedUrl);
    
    setIsScanning(true);
    setError('');
    setResult(null);

    try {
      const response = await scanUrl(normalizedUrl);
      console.log('Scan response:', response);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.error || 'Failed to scan URL. Please try again.');
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError(err.response?.data?.error || 'Failed to scan URL. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskColor = (confidencePercentage) => {
    if (confidencePercentage > 85) {
      return 'text-green-500';
    } else if (confidencePercentage > 50) {
      return 'text-yellow-500';
    } else {
      return 'text-red-500';
    }
  };

  const getRiskIcon = (confidencePercentage) => {
    if (confidencePercentage > 85) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (confidencePercentage > 50) {
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    } else {
      return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Phishing URL Scanner
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Analyze URLs for potential phishing threats using advanced AI detection
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            No account required - scan URLs instantly!
          </p>
        </div>

        {/* URL Input Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter URL to Scan
              </label>
              <div className="relative">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                  disabled={isScanning}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isScanning || !url.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isScanning ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Scan URL</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 dark:text-red-400">{error}</span>
            </div>
          </div>
        )}

        {/* Scan Results */}
        {result && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {getRiskIcon(result.confidence_percentage || (result.confidence * 100))}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Scan Complete
              </h2>
              <p className={`text-lg font-semibold ${getRiskColor(result.confidence_percentage || (result.confidence * 100))}`}>
                Risk Level: {result.risk_level}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">URL Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 break-all">{result.url}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Confidence Score</h3>
                <p className={`text-2xl font-bold ${getRiskColor(result.confidence_percentage || (result.confidence * 100))}`}>
                  {Math.round(result.confidence_percentage || (result.confidence * 100))}%
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Analysis Summary</h3>
              <div className="mb-4">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {result.is_phishing ? 
                    'This URL has been identified as potentially malicious based on our AI analysis.' :
                    'This URL appears to be safe based on our analysis.'
                  }
                </p>
                <p className={`text-lg font-semibold ${getRiskColor(result.confidence_percentage || (result.confidence * 100))}`}>
                  Confidence: {Math.round(result.confidence_percentage || (result.confidence * 100))}%
                </p>
              </div>
              
              {result.features && (
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Features Analyzed:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(result.features).slice(0, 9).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{key}: </span>
                        <span className="font-medium text-gray-900 dark:text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setUrl('');
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Scan Another URL
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scan;
