import React, { useState, useEffect } from 'react';
import { Template } from '../types';
import { Package, Clock, Star, ChevronRight, Filter } from 'lucide-react';

interface TemplateSelectionStepProps {
  selectedTemplates: Template[];
  onUpdate: (templates: Template[]) => void;
  projectType: string;
  language: string;
}

export const TemplateSelectionStep: React.FC<TemplateSelectionStepProps> = ({
  selectedTemplates,
  onUpdate,
  projectType,
  language
}) => {
  const [filter, setFilter] = useState<'all' | 'infrastructure' | 'repository'>('all');
  const [availableTemplates, setAvailableTemplates] = useState<Template[]>([]);

  useEffect(() => {
    // Mock template data based on project configuration
    const mockTemplates: Template[] = [
      {
        id: 'infra-basic-vpc',
        name: 'Basic VPC Infrastructure',
        description: 'Standard VPC setup with public/private subnets, NAT gateway, and security groups',
        type: 'infrastructure',
        category: 'Networking',
        technologies: ['AWS VPC', 'CloudFormation', 'NAT Gateway'],
        complexity: 'simple',
        estimatedTime: '15 minutes',
        resources: ['VPC', 'Subnets', 'Internet Gateway', 'NAT Gateway', 'Route Tables', 'Security Groups'],
        preview: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        id: 'infra-serverless',
        name: 'Serverless Application Stack',
        description: 'Complete serverless infrastructure with Lambda, API Gateway, and DynamoDB',
        type: 'infrastructure',
        category: 'Serverless',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'CloudWatch'],
        complexity: 'intermediate',
        estimatedTime: '25 minutes',
        resources: ['Lambda Functions', 'API Gateway', 'DynamoDB Table', 'IAM Roles', 'CloudWatch Logs'],
        preview: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        id: 'repo-react-starter',
        name: 'React TypeScript Starter',
        description: 'Modern React application with TypeScript, Tailwind CSS, and testing setup',
        type: 'repository',
        category: 'Frontend',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Jest'],
        complexity: 'simple',
        estimatedTime: '5 minutes',
        resources: ['Component Library', 'CI/CD Pipeline', 'Testing Framework', 'Documentation'],
        preview: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        id: 'repo-api-fastapi',
        name: 'FastAPI REST API',
        description: 'Production-ready FastAPI application with authentication, database, and documentation',
        type: 'repository',
        category: 'Backend',
        technologies: ['FastAPI', 'Python', 'PostgreSQL', 'Docker', 'Pytest'],
        complexity: 'intermediate',
        estimatedTime: '10 minutes',
        resources: ['API Endpoints', 'Authentication', 'Database Models', 'Docker Setup', 'API Documentation'],
        preview: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        id: 'infra-monitoring',
        name: 'Observability Stack',
        description: 'Comprehensive monitoring with CloudWatch, X-Ray, and alerting',
        type: 'infrastructure',
        category: 'Monitoring',
        technologies: ['CloudWatch', 'X-Ray', 'SNS', 'CloudTrail'],
        complexity: 'advanced',
        estimatedTime: '30 minutes',
        resources: ['CloudWatch Dashboards', 'Alarms', 'X-Ray Tracing', 'Log Groups', 'SNS Topics'],
        preview: 'https://images.pexels.com/photos/1181376/pexels-photo-1181376.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      },
      {
        id: 'repo-cicd-pipeline',
        name: 'CI/CD Pipeline Template',
        description: 'GitHub Actions workflow with automated testing, building, and deployment',
        type: 'repository',
        category: 'DevOps',
        technologies: ['GitHub Actions', 'Docker', 'AWS CodeDeploy', 'Terraform'],
        complexity: 'advanced',
        estimatedTime: '20 minutes',
        resources: ['GitHub Workflows', 'Build Scripts', 'Deployment Configs', 'Quality Gates'],
        preview: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200'
      }
    ];

    // Filter templates based on project configuration
    const filteredTemplates = mockTemplates.filter(template => {
      if (filter !== 'all' && template.type !== filter) return false;
      
      // Show relevant templates based on project type and language
      if (projectType === 'web-app' && template.id === 'repo-react-starter') return true;
      if (language === 'python' && template.id === 'repo-api-fastapi') return true;
      if (template.type === 'infrastructure') return true;
      
      return true;
    });

    setAvailableTemplates(filteredTemplates);
  }, [projectType, language, filter]);

  const toggleTemplate = (template: Template) => {
    const isSelected = selectedTemplates.some(t => t.id === template.id);
    if (isSelected) {
      onUpdate(selectedTemplates.filter(t => t.id !== template.id));
    } else {
      onUpdate([...selectedTemplates, template]);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Template Selection</h2>
        <p className="text-gray-600 mt-2">
          Choose from our curated templates to accelerate your project setup
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2">
            {['all', 'infrastructure', 'repository'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType as typeof filter)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${filter === filterType 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {selectedTemplates.length} template{selectedTemplates.length !== 1 ? 's' : ''} selected
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableTemplates.map((template) => {
          const isSelected = selectedTemplates.some(t => t.id === template.id);
          
          return (
            <div
              key={template.id}
              onClick={() => toggleTemplate(template)}
              className={`
                relative border rounded-lg p-6 cursor-pointer transition-all duration-200 hover:scale-105
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-300 hover:border-gray-400 shadow-sm'
                }
              `}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <ChevronRight className="w-4 h-4 text-white rotate-90" />
                </div>
              )}

              {/* Template Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
              </div>

              {/* Template Metadata */}
              <div className="flex items-center space-x-4 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                  {template.complexity}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {template.estimatedTime}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 mr-1" />
                  {template.category}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {template.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
                <div className="text-sm text-gray-600">
                  {template.resources.slice(0, 3).join(', ')}
                  {template.resources.length > 3 && ` +${template.resources.length - 3} more`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedTemplates.length > 0 && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">Selected Templates</h4>
          <div className="space-y-2">
            {selectedTemplates.map((template) => (
              <div key={template.id} className="flex items-center justify-between text-sm">
                <span className="text-green-800">{template.name}</span>
                <span className="text-green-600">{template.estimatedTime}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-sm text-green-800">
              Total estimated setup time: {
                selectedTemplates.reduce((total, template) => {
                  const minutes = parseInt(template.estimatedTime);
                  return total + minutes;
                }, 0)
              } minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};