import React, { useState } from 'react';
import { Shield, Github, Building, CheckCircle, Cloud, Key, Users } from 'lucide-react';

interface AuthStepProps {
  onAuthenticate: (user: any) => void;
}

export const AuthStep: React.FC<AuthStepProps> = ({ onAuthenticate }) => {
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const providers = [
    { 
      id: 'github', 
      name: 'GitHub', 
      icon: Github, 
      color: 'bg-gray-900 hover:bg-gray-800',
      description: 'Developer authentication via GitHub OAuth'
    },
    { 
      id: 'aws-sso', 
      name: 'AWS SSO', 
      icon: Shield, 
      color: 'bg-orange-600 hover:bg-orange-700',
      description: 'AWS Identity Center (formerly AWS SSO)'
    },
    { 
      id: 'cognito', 
      name: 'Amazon Cognito', 
      icon: Cloud, 
      color: 'bg-blue-600 hover:bg-blue-700',
      description: 'AWS managed user authentication'
    },
    { 
      id: 'azure-ad', 
      name: 'Azure AD', 
      icon: Building, 
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Microsoft Azure Active Directory'
    },
    { 
      id: 'google-workspace', 
      name: 'Google Workspace', 
      icon: Users, 
      color: 'bg-red-600 hover:bg-red-700',
      description: 'Google Workspace SSO'
    },
    { 
      id: 'saml', 
      name: 'SAML 2.0', 
      icon: Key, 
      color: 'bg-purple-600 hover:bg-purple-700',
      description: 'Enterprise SAML identity provider'
    },
  ];

  const handleAuthenticate = async (providerId: string) => {
    setSelectedProvider(providerId);
    setIsAuthenticating(true);

    // Simulate authentication with provider-specific user data
    setTimeout(() => {
      const mockUsers = {
        github: {
          id: '1',
          name: 'Alex Chen',
          email: 'alex.chen@company.com',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          role: 'Senior Developer',
          team: 'Platform Engineering',
          provider: 'GitHub'
        },
        'aws-sso': {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          role: 'DevOps Engineer',
          team: 'Infrastructure',
          provider: 'AWS SSO'
        },
        cognito: {
          id: '3',
          name: 'Michael Rodriguez',
          email: 'michael.rodriguez@company.com',
          avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          role: 'Full Stack Developer',
          team: 'Product Engineering',
          provider: 'Amazon Cognito'
        },
        'azure-ad': {
          id: '4',
          name: 'Emily Watson',
          email: 'emily.watson@company.com',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          role: 'Cloud Architect',
          team: 'Enterprise Architecture',
          provider: 'Azure AD'
        },
        'google-workspace': {
          id: '5',
          name: 'David Kim',
          email: 'david.kim@company.com',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          role: 'Tech Lead',
          team: 'Mobile Development',
          provider: 'Google Workspace'
        },
        saml: {
          id: '6',
          name: 'Lisa Thompson',
          email: 'lisa.thompson@company.com',
          avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
          role: 'Security Engineer',
          team: 'Information Security',
          provider: 'SAML 2.0'
        }
      };
      
      const mockUser = mockUsers[providerId as keyof typeof mockUsers] || mockUsers.github;
      
      setIsAuthenticated(true);
      setIsAuthenticating(false);
      onAuthenticate(mockUser);
    }, 2000);
  };

  if (isAuthenticated) {
    const selectedProviderName = providers.find(p => p.id === selectedProvider)?.name || 'Provider';
    
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Successful!</h2>
        <p className="text-gray-600 mb-6">
          Successfully authenticated via {selectedProviderName}. Proceeding to project setup...
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Ready to continue</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Secure Authentication</h2>
        <p className="text-gray-600 mt-2">
          Sign in with your organization's identity provider to begin project onboarding
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider) => {
          const Icon = provider.icon;
          const isSelected = selectedProvider === provider.id;
          const isLoading = isAuthenticating && isSelected;

          return (
            <button
              key={provider.id}
              onClick={() => handleAuthenticate(provider.id)}
              disabled={isAuthenticating}
              className={`
                flex items-center p-4 rounded-lg text-white font-medium transition-all duration-200 text-left
                ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:transform hover:scale-105 active:scale-95'}
                ${provider.color}
                ${isAuthenticating && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center w-full">
                <Icon className="w-6 h-6 mr-4 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold">{provider.name}</div>
                  <div className="text-sm opacity-90 mt-1">{provider.description}</div>
                </div>
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-3 flex-shrink-0"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {isAuthenticating && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Redirecting to {providers.find(p => p.id === selectedProvider)?.name} for authentication...
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start">
          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Secure & Compliant</p>
            <p>All authentication is handled through your organization's approved identity providers with full audit logging and compliance monitoring.</p>
          </div>
        </div>
      </div>

      {/* Provider Categories */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-1">Developer Tools</h4>
          <p className="text-xs text-gray-600">GitHub OAuth</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-1">AWS Native</h4>
          <p className="text-xs text-gray-600">AWS SSO, Cognito</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-1">Enterprise</h4>
          <p className="text-xs text-gray-600">Azure AD, Google, SAML</p>
        </div>
      </div>
    </div>
  );
};