import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Shield, 
  Search, 
  Brain, 
  Lock, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Users,
  BarChart3,
  Sparkles,
  Target,
  TrendingUp
} from 'lucide-react'

const Home = () => {
  const { user } = useAuth()

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze URLs in real-time to identify phishing attempts with high accuracy.',
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500'
    },
    {
      icon: Search,
      title: 'Instant URL Scanning',
      description: 'Get comprehensive security analysis of any URL within seconds, including detailed risk assessment and recommendations.',
      gradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is encrypted and never stored. All scans are performed securely with enterprise-grade protection.',
      gradient: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-500'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay protected with continuously updated threat intelligence and evolving detection capabilities.',
      gradient: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500'
    }
  ]

  const stats = [
    { 
      label: 'URLs Scanned', 
      value: '1000+', 
      icon: Search,
      gradient: 'from-blue-600 to-purple-600',
      bgGradient: 'from-blue-500/20 to-purple-500/20'
    },
    { 
      label: 'Threats Detected', 
      value: '500+', 
      icon: Shield,
      gradient: 'from-red-600 to-pink-600',
      bgGradient: 'from-red-500/20 to-pink-500/20'
    },
    { 
      label: 'Active Users', 
      value: '5+', 
      icon: Users,
      gradient: 'from-green-600 to-emerald-600',
      bgGradient: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      label: 'Accuracy Rate', 
      value: '99.8%', 
      icon: CheckCircle,
      gradient: 'from-indigo-600 to-blue-600',
      bgGradient: 'from-indigo-500/20 to-blue-500/20'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Enter URL',
      description: 'Simply paste or type the URL you want to check for phishing attempts.',
      icon: Target,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-100 to-cyan-100'
    },
    {
      number: '2',
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes the URL using multiple security parameters and threat indicators.',
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-100 to-pink-100'
    },
    {
      number: '3',
      title: 'Get Results',
      description: 'Receive instant results with detailed analysis, risk assessment, and security recommendations.',
      icon: CheckCircle,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-100 to-emerald-100'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 py-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            {/* Floating Icon */}
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Protect Yourself from
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Phishing Attacks
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Advanced AI-powered phishing detection that keeps you safe online. 
              Scan URLs instantly and get real-time security insights with unmatched accuracy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {user ? (
                <Link to="/scan" className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-10 py-5 rounded-full font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <Search className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Scan a URL
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg px-10 py-5 rounded-full font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    Get Started Free
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/info" className="group border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white text-lg px-10 py-5 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1">
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PhishGuard AI</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our cutting-edge technology provides comprehensive protection against 
              all types of phishing attacks with unmatched accuracy and real-time updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border-l-4 ${feature.borderColor} bg-white dark:bg-gray-800 shadow-lg`}
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Thousands</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform has successfully protected users worldwide with proven results
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`w-20 h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              How It <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get instant protection in just three simple steps with our advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center group relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 transform -translate-y-1/2 z-0"></div>
                  )}
                  
                  <div className={`relative z-10 w-24 h-24 bg-gradient-to-r ${step.bgGradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg`}>
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Stay <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Protected</span>?
          </h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who trust PhishGuard AI to keep them safe online. 
            Start your free account today and experience the future of cybersecurity.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {user ? (
              <Link to="/scan" className="group bg-white text-indigo-600 hover:bg-gray-50 font-bold px-10 py-5 rounded-full transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Search className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Start Scanning
              </Link>
            ) : (
              <>
                <Link to="/register" className="group bg-white text-indigo-600 hover:bg-gray-50 font-bold px-10 py-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get Started Free
                </Link>
                <Link to="/info" className="group border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold px-10 py-5 rounded-full transition-all duration-300 transform hover:-translate-y-1">
                  Learn More
                </Link>
              </>
            )}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-indigo-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>99.8% Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-300" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
