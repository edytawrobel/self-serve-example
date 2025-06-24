import React, { useState, useEffect } from 'react';
import { ProjectConfig } from '../types';
import { Settings, Database, Globe, DollarSign, Shield } from 'lucide-react';

interface ConfigurationStepProps {
  config: Partial<ProjectConfig>;
  onUpdate: (config: Partial<ProjectConfig>) => void;
}

export const ConfigurationStep: React.FC<ConfigurationStepProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState({
    environment: config.environment || '',
    dataStore: config.dataStore || '',
    budget: config.budget || 0,
    compliance: config.compliance || [],
    tags: config.tags || {},
  });

  const environments = [
    { id: 'development', name: 'Development', description: 'For development and testing', color: 'bg-blue-100 text-blue-800' },
    { id: 'staging', name: 'Staging', description: 'Pre-production environment', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'production', name: 'Production', description: 'Live production environment', color: 'bg-red-100 text-red-800' },
  ];

  const dataStores = [
    { id: 'none', name: 'None', description: 'No database required', icon: '🚫' },
    { id: 'postgres', name: 'PostgreSQL', description: 'Relational database', icon: '🐘' },
    { id: 'mongodb', name: 'MongoDB', description: 'Document database', icon: '🍃' },
    { id: 'redis', name: 'Redis', description: 'In-memory cache', icon: '🔴' },
    { id: 'dynamodb', name: 'DynamoDB', description: 'NoSQL database', icon: '⚡' },
  ];

  const complianceOptions = [
    { id: 'gdpr', name: 'GDPR', description: 'General Data Protection Regulation' },
    { id: 'hipaa', name: 'HIPAA', description: 'Health Insurance Portability and Accountability Act' },
    { id: 'sox', name: 'SOX', description: 'Sarbanes-Oxley Act' },
    { id: 'pci-dss', name: 'PCI DSS', description: 'Payment Card Industry Data Security Standard' },
  ];

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplianceToggle = (complianceId: string) => {
    const newCompliance = formData.compliance.includes(complianceId)
      ? formData.compliance.filter(id => id !== complianceId)
      : [...formData.compliance, complianceId];
    handleInputChange('compliance', newCompliance);
  };

  const handleTagChange = (key: string, value: string) => {
    const newTags = { ...formData.tags };
    if (value) {
      newTags[key] = value;
    } else {
      delete newTags[key];
    }
    handleInputChange('tags', newTags);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        <p className="text-gray-600 mt-2">
          Configure environment settings, data storage, and compliance requirements
        </p>
      </div>

      <div className="space-y-8">
        {/* Environment Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Globe className="inline w-4 h-4 mr-2" />
            Environment *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {environments.map((env) => (
              <button
                key={env.id}
                onClick={() => handleInputChange('environment', env.id)}
                className={`
                  p-4 border rounded-lg text-left transition-all duration-200 hover:scale-105
                  ${formData.environment === env.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <div className="font-medium text-gray-900">{env.name}</div>
                <div className="text-sm text-gray-600 mt-1">{env.description}</div>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${env.color}`}>
                  {env.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Data Store Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Database className="inline w-4 h-4 mr-2" />
            Data Store *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dataStores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleInputChange('dataStore', store.id)}
                className={`
                  p-3 border rounded-lg text-center transition-all duration-200 hover:scale-105
                  ${formData.dataStore === store.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <div className="text-2xl mb-2">{store.icon}</div>
                <div className="font-medium text-sm">{store.name}</div>
                <div className="text-xs text-gray-600 mt-1">{store.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-2" />
            Monthly Budget (USD)
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
              placeholder="0"
              min="0"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Set to 0 for no budget limit. This helps with cost monitoring and alerts.
          </p>
        </div>

        {/* Compliance Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Shield className="inline w-4 h-4 mr-2" />
            Compliance Requirements
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {complianceOptions.map((compliance) => (
              <button
                key={compliance.id}
                onClick={() => handleComplianceToggle(compliance.id)}
                className={`
                  p-3 border rounded-lg text-left transition-all duration-200 hover:scale-105
                  ${formData.compliance.includes(compliance.id) 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <div className="font-medium text-gray-900">{compliance.name}</div>
                <div className="text-sm text-gray-600 mt-1">{compliance.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Resource Tags
          </label>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.tags.CostCenter || ''}
                onChange={(e) => handleTagChange('CostCenter', e.target.value)}
                placeholder="Cost Center"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={formData.tags.Environment || formData.environment || ''}
                onChange={(e) => handleTagChange('Environment', e.target.value)}
                placeholder="Environment"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={formData.tags.Project || ''}
                onChange={(e) => handleTagChange('Project', e.target.value)}
                placeholder="Project"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={formData.tags.Team || ''}
                onChange={(e) => handleTagChange('Team', e.target.value)}
                placeholder="Team"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            These tags will be applied to all provisioned resources for better organization and cost tracking.
          </p>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Configuration Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Environment:</span>
            <span className="ml-2 font-medium">{formData.environment || 'Not selected'}</span>
          </div>
          <div>
            <span className="text-gray-600">Data Store:</span>
            <span className="ml-2 font-medium">{formData.dataStore || 'Not selected'}</span>
          </div>
          <div>
            <span className="text-gray-600">Budget:</span>
            <span className="ml-2 font-medium">
              {formData.budget > 0 ? `$${formData.budget}/month` : 'No limit'}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Compliance:</span>
            <span className="ml-2 font-medium">
              {formData.compliance.length > 0 ? formData.compliance.join(', ') : 'None'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};