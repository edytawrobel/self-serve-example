import React from 'react';
import { useOnboarding } from './hooks/useOnboarding';
import { StepIndicator } from './components/StepIndicator';
import { AuthStep } from './components/AuthStep';
import { ProjectDetailsStep } from './components/ProjectDetailsStep';
import { TemplateSelectionStep } from './components/TemplateSelectionStep';
import { ConfigurationStep } from './components/ConfigurationStep';
import { ReviewStep } from './components/ReviewStep';
import { ProvisioningStep } from './components/ProvisioningStep';
import { CompletionStep } from './components/CompletionStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const STEPS = [
  'Authentication',
  'Project Details',
  'Template Selection',
  'Configuration',
  'Review',
  'Provisioning',
  'Complete'
];

function App() {
  const { state, actions, canProceed, totalSteps } = useOnboarding();

  // Auto-advance from authentication step when user is authenticated
  React.useEffect(() => {
    if (state.currentStep === 0 && state.user && canProceed) {
      const timer = setTimeout(() => {
        actions.nextStep();
      }, 2000); // Wait 2 seconds to show success message
      return () => clearTimeout(timer);
    }
  }, [state.currentStep, state.user, canProceed, actions]);

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 0:
        return <AuthStep onAuthenticate={actions.setUser} />;
      case 1:
        return (
          <ProjectDetailsStep
            config={state.projectConfig}
            onUpdate={actions.updateProjectConfig}
          />
        );
      case 2:
        return (
          <TemplateSelectionStep
            selectedTemplates={state.selectedTemplates}
            onUpdate={actions.updateSelectedTemplates}
            projectType={state.projectConfig.projectType || ''}
            language={state.projectConfig.language || ''}
          />
        );
      case 3:
        return (
          <ConfigurationStep
            config={state.projectConfig}
            onUpdate={actions.updateProjectConfig}
          />
        );
      case 4:
        return (
          <ReviewStep
            state={state}
            onValidate={actions.updateValidationResults}
          />
        );
      case 5:
        return (
          <ProvisioningStep
            steps={state.provisioning}
            onUpdate={actions.updateProvisioningSteps}
            onComplete={actions.completeOnboarding}
          />
        );
      case 6:
        return state.completionData ? (
          <CompletionStep completionData={state.completionData} />
        ) : (
          <div>Loading...</div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  const showNavigation = state.currentStep > 0 && state.currentStep < 5;
  const showNextButton = state.currentStep < 5 && canProceed && state.currentStep > 0;
  const showPrevButton = state.currentStep > 0 && state.currentStep < 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Self-Service Onboarding Wizard
          </h1>
          <p className="text-xl text-gray-600">
            Streamlined project setup with automated provisioning and compliance
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={state.currentStep}
          totalSteps={totalSteps}
          steps={STEPS}
        />

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        {showNavigation && (
          <div className="flex justify-between items-center">
            <button
              onClick={actions.prevStep}
              disabled={!showPrevButton}
              className={`
                flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${showPrevButton
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  : 'opacity-50 cursor-not-allowed text-gray-400'
                }
              `}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              Step {state.currentStep + 1} of {totalSteps}
            </div>

            <button
              onClick={actions.nextStep}
              disabled={!showNextButton}
              className={`
                flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${showNextButton
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                  : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                }
              `}
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Secure • Compliant • Auditable</p>
          <p className="mt-1">All provisioning activities are logged and monitored</p>
        </div>
      </div>
    </div>
  );
}

export default App;