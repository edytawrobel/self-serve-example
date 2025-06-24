import React, { useState, useEffect } from 'react';
import { ProvisioningStep as ProvisioningStepType } from '../types';
import { Loader, CheckCircle, XCircle, Clock, Zap } from 'lucide-react';

interface ProvisioningStepProps {
  steps: ProvisioningStepType[];
  onUpdate: (steps: ProvisioningStepType[]) => void;
  onComplete: (completionData: any) => void;
}

export const ProvisioningStep: React.FC<ProvisioningStepProps> = ({ 
  steps, 
  onUpdate, 
  onComplete 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const initialSteps: ProvisioningStepType[] = [
    {
      id: 'validate-config',
      name: 'Validate Configuration',
      status: 'pending',
      message: 'Validating project configuration and templates'
    },
    {
      id: 'create-repo',
      name: 'Create Repository',
      status: 'pending',
      message: 'Creating GitHub repository from template'
    },
    {
      id: 'provision-infra',
      name: 'Provision Infrastructure',
      status: 'pending',
      message: 'Deploying CloudFormation stacks'
    },
    {
      id: 'configure-ci-cd',
      name: 'Configure CI/CD',
      status: 'pending',
      message: 'Setting up deployment pipeline'
    },
    {
      id: 'apply-security',
      name: 'Apply Security Policies',
      status: 'pending',
      message: 'Configuring security settings and permissions'
    },
    {
      id: 'finalize-setup',
      name: 'Finalize Setup',
      status: 'pending',
      message: 'Completing project setup and generating documentation'
    }
  ];

  useEffect(() => {
    if (steps.length === 0) {
      onUpdate(initialSteps);
    }
  }, [steps.length, onUpdate]);

  useEffect(() => {
    if (!isProvisioning && steps.length > 0) {
      setIsProvisioning(true);
      startProvisioning();
    }
  }, [steps.length, isProvisioning]);

  const startProvisioning = async () => {
    const updatedSteps = [...initialSteps];

    for (let i = 0; i < updatedSteps.length; i++) {
      setCurrentStepIndex(i);
      
      // Start the current step
      updatedSteps[i] = {
        ...updatedSteps[i],
        status: 'running',
        startTime: new Date()
      };
      onUpdate([...updatedSteps]);

      // Simulate step execution
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

      // Complete the current step
      updatedSteps[i] = {
        ...updatedSteps[i],
        status: 'completed',
        endTime: new Date(),
        details: getStepDetails(updatedSteps[i].id)
      };
      onUpdate([...updatedSteps]);

      // Short pause between steps
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // All steps completed
    const completionData = {
      repositoryUrl: 'https://github.com/company/my-awesome-project',
      infrastructureUrls: [
        'https://console.aws.amazon.com/cloudformation/home#/stacks/stackinfo?stackId=my-awesome-project-vpc',
        'https://console.aws.amazon.com/lambda/home#/functions/my-awesome-project-api'
      ],
      accessDetails: [
        'Repository: https://github.com/company/my-awesome-project',
        'API Gateway: https://api.myawesomeproject.com',
        'CloudWatch Logs: https://console.aws.amazon.com/cloudwatch/home#logGroups'
      ],
      nextSteps: [
        'Clone the repository to your local machine',
        'Review the generated documentation in the README',
        'Configure your local development environment',
        'Run the initial tests to verify setup',
        'Begin development on your first feature'
      ]
    };

    onComplete(completionData);
  };

  const getStepDetails = (stepId: string): string => {
    const details = {
      'validate-config': 'Configuration validated successfully. All requirements met.',
      'create-repo': 'Repository created at https://github.com/company/my-awesome-project',
      'provision-infra': 'Infrastructure provisioned: VPC, Lambda functions, API Gateway',
      'configure-ci-cd': 'CI/CD pipeline configured with GitHub Actions',
      'apply-security': 'Security policies applied: IAM roles, VPC security groups',
      'finalize-setup': 'Project setup completed. Documentation generated.'
    };
    return details[stepId as keyof typeof details] || 'Step completed successfully.';
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Loader className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'border-blue-500 bg-blue-50';
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'failed':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Provisioning Project</h2>
        <p className="text-gray-600 mt-2">
          Setting up your project infrastructure and repository
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {completedSteps} of {totalSteps} steps completed
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Provisioning Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`
              p-4 border rounded-lg transition-all duration-300
              ${getStepColor(step.status)}
              ${index === currentStepIndex ? 'ring-2 ring-blue-300' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStepIcon(step.status)}
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{step.name}</h3>
                  <p className="text-sm text-gray-600">{step.message}</p>
                  {step.details && (
                    <p className="text-xs text-gray-500 mt-1">{step.details}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                {step.startTime && (
                  <p className="text-xs text-gray-500">
                    Started: {step.startTime.toLocaleTimeString()}
                  </p>
                )}
                {step.endTime && (
                  <p className="text-xs text-gray-500">
                    Completed: {step.endTime.toLocaleTimeString()}
                  </p>
                )}
                {step.startTime && step.endTime && (
                  <p className="text-xs text-gray-500">
                    Duration: {Math.round((step.endTime.getTime() - step.startTime.getTime()) / 1000)}s
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Status */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <Loader className="w-5 h-5 text-blue-600 animate-spin mr-3" />
          <div>
            <p className="font-medium text-blue-900">Provisioning in Progress</p>
            <p className="text-sm text-blue-700">
              {completedSteps < totalSteps 
                ? `Currently ${steps[currentStepIndex]?.name?.toLowerCase() || 'processing'}...`
                : 'Finalizing setup...'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Logs Section */}
      <div className="mt-8">
        <h3 className="font-medium text-gray-900 mb-3">Provisioning Logs</h3>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-48 overflow-y-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="mb-2">
              <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
              <span className="ml-2">
                {step.status === 'completed' && '✓ '}
                {step.status === 'running' && '⚡ '}
                {step.status === 'pending' && '⏳ '}
                {step.name}
              </span>
              {step.details && (
                <div className="text-gray-400 ml-12 text-xs">{step.details}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};