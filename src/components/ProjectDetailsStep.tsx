import React, { useState, useEffect } from 'react';
import { ProjectConfig } from '../types';
import { Code, Layers, AlertCircle, CheckCircle } from 'lucide-react';

interface ProjectDetailsStepProps {
  config: Partial<ProjectConfig>;
  onUpdate: (config: Partial<ProjectConfig>) => void;
}

export const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({ config, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: config.name || '',
    displayName: config.displayName || '',
    description: config.description || '',
    projectType: config.projectType || '',
    language: config.language || '',
    framework: config.framework || '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const projectTypes = [
    { id: 'web-app', name: 'Web Application', icon: '🌐', description: 'Frontend or full-stack web application' },
    { id: 'api-service', name: 'API Service', icon: '🔗', description: 'RESTful or GraphQL API service' },
    { id: 'mobile-app', name: 'Mobile App', icon: '📱', description: 'iOS, Android, or cross-platform mobile app' },
    { id: 'data-pipeline', name: 'Data Pipeline', icon: '📊', description: 'ETL, streaming, or batch data processing' },
    { id: 'ml-model', name: 'ML Model', icon: '🤖', description: 'Machine learning model or AI service' },
  ];

  const languages = [
    { id: 'typescript', name: 'TypeScript', icon: '📘' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'go', name: 'Go', icon: '🐹' },
    { id: 'rust', name: 'Rust', icon: '🦀' },
  ];

  const frameworks = {
    typescript: ['React', 'Next.js', 'Vue.js', 'Angular', 'Express.js', 'Nest.js'],
    python: ['FastAPI', 'Django', 'Flask', 'Streamlit', 'Jupyter'],
    java: ['Spring Boot', 'Quarkus', 'Micronaut'],
    go: ['Gin', 'Echo', 'Fiber'],
    rust: ['Actix', 'Rocket', 'Axum'],
  };

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const validateField = (field: string, value: string) => {
    const errors = { ...validationErrors };

    switch (field) {
      case 'name':
        if (!value) {
          errors.name = 'Project name is required';
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          errors.name = 'Project name must be lowercase letters, numbers, and hyphens only';
        } else if (value.length < 3) {
          errors.name = 'Project name must be at least 3 characters';
        } else {
          delete errors.name;
        }
        break;
      case 'displayName':
        if (!value) {
          errors.displayName = 'Display name is required';
        } else {
          delete errors.displayName;
        }
        break;
      case 'description':
        if (!value) {
          errors.description = 'Description is required';
        } else if (value.length < 10) {
          errors.description = 'Description must be at least 10 characters';
        } else {
          delete errors.description;
        }
        break;
    }

    setValidationErrors(errors);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const isValid = Object.keys(validationErrors).length === 0 && 
    formData.name && formData.displayName && formData.description && 
    formData.projectType && formData.language;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Project Details</h2>
        <p className="text-gray-600 mt-2">
          Configure your project's basic information and technology stack
        </p>
      </div>

      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="my-awesome-project"
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
              ${validationErrors.name 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }
            `}
          />
          {validationErrors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Name *
          </label>
          <input
            type="text"
            value={formData.displayName}
            onChange={(e) => handleInputChange('displayName', e.target.value)}
            placeholder="My Awesome Project"
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
              ${validationErrors.displayName 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }
            `}
          />
          {validationErrors.displayName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {validationErrors.displayName}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe what this project does and its purpose..."
            rows={3}
            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none
              ${validationErrors.description 
                ? 'border-red-300 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }
            `}
          />
          {validationErrors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {validationErrors.description}
            </p>
          )}
        </div>

        {/* Project Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Project Type *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleInputChange('projectType', type.id)}
                className={`
                  p-4 border rounded-lg text-left transition-all duration-200 hover:scale-105
                  ${formData.projectType === type.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{type.icon}</span>
                  <span className="font-medium">{type.name}</span>
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Primary Language *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((language) => (
              <button
                key={language.id}
                onClick={() => {
                  handleInputChange('language', language.id);
                  handleInputChange('framework', '');
                }}
                className={`
                  p-3 border rounded-lg text-center transition-all duration-200 hover:scale-105
                  ${formData.language === language.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-900' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <div className="text-2xl mb-1">{language.icon}</div>
                <div className="font-medium">{language.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Framework */}
        {formData.language && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Framework (Optional)
            </label>
            <select
              value={formData.framework}
              onChange={(e) => handleInputChange('framework', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a framework...</option>
              {frameworks[formData.language as keyof typeof frameworks]?.map((framework) => (
                <option key={framework} value={framework}>{framework}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          {isValid ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          ) : (
            <Layers className="w-5 h-5 text-gray-400 mr-3" />
          )}
          <div className="text-sm">
            <p className="font-medium text-gray-900">
              {isValid ? 'Configuration Valid' : 'Complete Required Fields'}
            </p>
            <p className="text-gray-600">
              {isValid 
                ? 'All required project details have been provided.'
                : 'Please fill in all required fields to continue.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};