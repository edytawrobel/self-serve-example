import React from 'react';
import { OnboardingState, ValidationResult } from '../types';
import { CheckCircle, AlertTriangle, XCircle, User, Code, Package, Settings, Eye } from 'lucide-react';

interface ReviewStepProps {
  state: OnboardingState;
  onValidate: (results: ValidationResult[]) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ state, onValidate }) => {
  const { user, projectConfig, selectedTemplates } = state;

  React.useEffect(() => {
    // Perform validation
    const validationResults: ValidationResult[] = [];

    // Project name validation
    if (!projectConfig.name) {
      validationResults.push({
        field: 'projectName',
        message: 'Project name is required',
        type: 'error'
      });
    } else if (projectConfig.name.length < 3) {
      validationResults.push({
        field: 'projectName',
        message: 'Project name should be at least 3 characters',
        type: 'error'
      });
    }

    // Environment validation
    if (!projectConfig.environment) {
      validationResults.push({
        field: 'environment',
        message: 'Environment selection is required',
        type: 'error'
      });
    }

    // Template validation
    if (selectedTemplates.length === 0) {
      validationResults.push({
        field: 'templates',
        message: 'At least one template must be selected',
        type: 'error'
      });
    }

    // Budget warning
    if (projectConfig.budget && projectConfig.budget > 1000) {
      validationResults.push({
        field: 'budget',
        message: 'High budget detected - ensure approval is obtained',
        type: 'warning'
      });
    }

    // Compliance validation
    if (projectConfig.environment === 'production' && !projectConfig.compliance?.length) {
      validationResults.push({
        field: 'compliance',
        message: 'Production environments should have compliance requirements',
        type: 'warning'
      });
    }

    onValidate(validationResults);
  }, [projectConfig, selectedTemplates, onValidate]);

  const hasErrors = state.validationResults.some(r => r.type === 'error');
  const hasWarnings = state.validationResults.some(r => r.type === 'warning');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Review Configuration</h2>
        <p className="text-gray-600 mt-2">
          Review your project configuration before provisioning
        </p>
      </div>

      {/* Validation Results */}
      {state.validationResults.length > 0 && (
        <div className="mb-8">
          {hasErrors && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <XCircle className="w-5 h-5 text-red-600 mr-2" />
                <h3 className="font-medium text-red-900">Errors Found</h3>
              </div>
              <div className="space-y-1">
                {state.validationResults.filter(r => r.type === 'error').map((result, index) => (
                  <p key={index} className="text-sm text-red-800">{result.message}</p>
                ))}
              </div>
            </div>
          )}

          {hasWarnings && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="font-medium text-yellow-900">Warnings</h3>
              </div>
              <div className="space-y-1">
                {state.validationResults.filter(r => r.type === 'warning').map((result, index) => (
                  <p key={index} className="text-sm text-yellow-800">{result.message}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">User Information</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              {user?.avatar && (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-600">{user?.role} • {user?.team}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Code className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Project Details</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{projectConfig.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Display Name</p>
              <p className="font-medium">{projectConfig.displayName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-medium">{projectConfig.projectType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Language</p>
              <p className="font-medium">{projectConfig.language}</p>
            </div>
            {projectConfig.framework && (
              <div>
                <p className="text-sm text-gray-600">Framework</p>
                <p className="font-medium">{projectConfig.framework}</p>
              </div>
            )}
          </div>
        </div>

        {/* Selected Templates */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Package className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Selected Templates</h3>
          </div>
          <div className="space-y-3">
            {selectedTemplates.map((template) => (
              <div key={template.id} className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">{template.name}</p>
                  <p className="text-sm text-gray-600">{template.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {template.complexity} • {template.estimatedTime}
                  </p>
                </div>
                <span className={`
                  px-2 py-1 text-xs rounded-full
                  ${template.type === 'infrastructure' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                  }
                `}>
                  {template.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Configuration</h3>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Environment</p>
              <p className="font-medium">{projectConfig.environment}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Data Store</p>
              <p className="font-medium">{projectConfig.dataStore}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Budget</p>
              <p className="font-medium">
                {projectConfig.budget && projectConfig.budget > 0 
                  ? `$${projectConfig.budget}/month` 
                  : 'No limit'
                }
              </p>
            </div>
            {projectConfig.compliance && projectConfig.compliance.length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Compliance</p>
                <p className="font-medium">{projectConfig.compliance.join(', ')}</p>
              </div>
            )}
            {projectConfig.tags && Object.keys(projectConfig.tags).length > 0 && (
              <div>
                <p className="text-sm text-gray-600">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(projectConfig.tags).map(([key, value]) => (
                    <span key={key} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="font-semibold text-gray-900">Ready to Provision</h3>
        </div>
        <p className="text-gray-700 mb-4">
          Your project configuration has been reviewed and is ready for provisioning. The following resources will be created:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Infrastructure</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedTemplates
                .filter(t => t.type === 'infrastructure')
                .map(t => t.resources)
                .flat()
                .map((resource, index) => (
                  <li key={index}>• {resource}</li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Repository</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedTemplates
                .filter(t => t.type === 'repository')
                .map(t => t.resources)
                .flat()
                .map((resource, index) => (
                  <li key={index}>• {resource}</li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Estimated total setup time:</strong> {
              selectedTemplates.reduce((total, template) => {
                const minutes = parseInt(template.estimatedTime);
                return total + minutes;
              }, 0)
            } minutes
          </p>
        </div>
      </div>
    </div>
  );
};