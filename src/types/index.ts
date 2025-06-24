export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  team: string;
}

export interface ProjectConfig {
  name: string;
  displayName: string;
  description: string;
  projectType: 'web-app' | 'api-service' | 'mobile-app' | 'data-pipeline' | 'ml-model';
  environment: 'development' | 'staging' | 'production';
  language: 'typescript' | 'python' | 'java' | 'go' | 'rust';
  framework?: string;
  dataStore: 'none' | 'postgres' | 'mongodb' | 'redis' | 'dynamodb';
  owner: string;
  team: string;
  tags: Record<string, string>;
  budget?: number;
  compliance: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'infrastructure' | 'repository';
  category: string;
  technologies: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: string;
  resources: string[];
  preview?: string;
}

export interface ValidationResult {
  field: string;
  message: string;
  type: 'error' | 'warning';
}

export interface ProvisioningStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message?: string;
  details?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface OnboardingState {
  currentStep: number;
  user: User | null;
  projectConfig: Partial<ProjectConfig>;
  selectedTemplates: Template[];
  validationResults: ValidationResult[];
  provisioning: ProvisioningStep[];
  isComplete: boolean;
  completionData?: {
    repositoryUrl: string;
    infrastructureUrls: string[];
    accessDetails: string[];
    nextSteps: string[];
  };
}