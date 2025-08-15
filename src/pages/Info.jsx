import React from 'react';
import { Shield, AlertTriangle, Mail, Smartphone, Phone, Users, Lock, Eye, CheckCircle } from 'lucide-react';

const Info = () => {
  const phishingTypes = [
    {
      title: 'Email Phishing',
      icon: <Mail className="w-6 h-6" />,
      description: 'Mass emails sent to many recipients with malicious links or attachments.',
      redFlags: [
        'Urgent requests for personal information',
        'Poor grammar and spelling',
        'Suspicious sender addresses',
        'Requests for passwords or financial data'
      ],
      prevention: [
        'Never click suspicious links',
        'Verify sender email addresses',
        'Don\'t share personal information via email',
        'Use email security filters'
      ]
    },
    {
      title: 'Spear Phishing',
      icon: <Users className="w-6 h-6" />,
      description: 'Targeted attacks on specific individuals or organizations using personalized information.',
      redFlags: [
        'Personalized information about you',
        'Requests from "colleagues" or "managers"',
        'Unusual requests for sensitive data',
        'Pressure to act quickly'
      ],
      prevention: [
        'Verify requests through other channels',
        'Be suspicious of urgent requests',
        'Check with colleagues about unusual requests',
        'Use multi-factor authentication'
      ]
    },
    {
      title: 'Whaling',
      icon: <Users className="w-6 h-6" />,
      description: 'Targeted attacks on high-level executives or important individuals.',
      redFlags: [
        'Requests from "CEOs" or "executives"',
        'Large financial transactions',
        'Confidential information requests',
        'Pressure to bypass normal procedures'
      ],
      prevention: [
        'Verify executive requests in person',
        'Follow established approval processes',
        'Be cautious of large financial requests',
        'Use secure communication channels'
      ]
    },
    {
      title: 'Smishing (SMS Phishing)',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Phishing attacks delivered via text messages.',
      redFlags: [
        'Unexpected text messages',
        'Requests to click links',
        'Urgent account updates',
        'Suspicious phone numbers'
      ],
      prevention: [
        'Don\'t click links in texts',
        'Verify messages with official sources',
        'Block suspicious numbers',
        'Use SMS security apps'
      ]
    },
    {
      title: 'Vishing (Voice Phishing)',
      icon: <Phone className="w-6 h-6" />,
      description: 'Phishing attacks conducted over phone calls.',
      redFlags: [
        'Calls from unknown numbers',
        'Requests for personal information',
        'Pressure to act immediately',
        'Suspicious caller ID'
      ],
      prevention: [
        'Don\'t answer unknown numbers',
        'Never share personal info over phone',
        'Hang up on suspicious calls',
        'Verify caller identity independently'
      ]
    }
  ];

  const generalTips = [
    'Always verify the source before clicking links',
    'Use strong, unique passwords for each account',
    'Enable two-factor authentication wherever possible',
    'Keep software and systems updated',
    'Be suspicious of urgent or threatening messages',
    'Don\'t share personal information online',
    'Use reputable security software',
    'Regularly backup important data'
  ];

  const urlChecklist = [
    'Check for HTTPS in the URL',
    'Look for misspellings in domain names',
    'Verify the website is legitimate',
    'Check for suspicious subdomains',
    'Look for unusual TLDs (top-level domains)',
    'Verify the site has proper security certificates',
    'Check for suspicious redirects',
    'Look for poor website design or content'
  ];

  const realPhishingIncidents = [
    {
      title: 'Google Docs Phishing Attack (2017)',
      description: 'A sophisticated phishing attack that used Google Docs to steal credentials from over 1 million users. Attackers sent emails with a link to a fake Google Docs page that requested access to users\' Google accounts.',
      impact: '1+ million users affected',
      lessons: [
        'Always verify app permissions before granting access',
        'Be suspicious of unexpected permission requests',
        'Check the actual domain in the address bar',
        'Enable two-factor authentication'
      ]
    },
    {
      title: 'Facebook-Cambridge Analytica Data Scandal (2018)',
      description: 'While not a traditional phishing attack, this incident involved deceptive data collection practices where users were tricked into sharing personal information through seemingly legitimate surveys and personality tests.',
      impact: '87 million users\' data compromised',
      lessons: [
        'Be cautious of free online quizzes and surveys',
        'Read privacy policies and terms of service',
        'Limit the information you share on social media',
        'Regularly review and revoke app permissions'
      ]
    },
    {
      title: 'Target Data Breach (2013)',
      description: 'Attackers gained access to Target\'s network through a phishing email sent to a third-party vendor, eventually compromising 40 million credit card records and 70 million customer records.',
      impact: '110 million customers affected',
      lessons: [
        'Third-party vendors can be attack vectors',
        'Phishing attacks can target employees, not just customers',
        'Implement strong email security measures',
        'Regular security training for all staff members'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
            <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Phishing Awareness & Prevention
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn about different types of phishing attacks, recognize red flags, and discover effective prevention strategies to protect yourself online.
          </p>
        </div>

        {/* Phishing Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Types of Phishing Attacks
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {phishingTypes.map((type, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    {type.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{type.title}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{type.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-red-600 dark:text-red-400 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Red Flags
                    </h4>
                    <ul className="space-y-1">
                      {type.redFlags.map((flag, flagIndex) => (
                        <li key={flagIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {flag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-600 dark:text-green-400 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Prevention Tips
                    </h4>
                    <ul className="space-y-1">
                      {type.prevention.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Security Tips */}
        <div className="mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              General Security Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-blue-600" />
                  Essential Security Tips
                </h3>
                <ul className="space-y-3">
                  {generalTips.slice(0, 4).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  More Security Tips
                </h3>
                <ul className="space-y-3">
                  {generalTips.slice(4).map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Real Phishing Incidents */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Real-World Phishing Incidents
          </h2>
          <div className="space-y-8">
            {realPhishingIncidents.map((incident, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{incident.title}</h3>
                  <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                    {incident.impact}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {incident.description}
                </p>
                
                <div>
                  <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-3 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Key Lessons Learned
                  </h4>
                  <ul className="space-y-2">
                    {incident.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* URL Safety Checklist */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">URL Safety Checklist</h2>
            <p className="text-blue-100 text-center mb-8 max-w-2xl mx-auto">
              Before clicking any link, run through this checklist to identify potential threats
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urlChecklist.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-blue-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Use our advanced AI-powered phishing detection tool to scan suspicious URLs and protect yourself from threats.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200">
              Start Scanning URLs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
