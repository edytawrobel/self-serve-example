import { useState, useCallback } from 'react';
import { OnboardingState, ProjectConfig, Template, ValidationResult, ProvisioningStep } from '../types';

const TOTAL_STEPS = 7;

export const useOnboarding = () => {
  const [state, setState] = useState<OnboardingState>({
    currentStep: 0,
    user: null,
    projectConfig: {},
    selectedTemplates: [],
    validationResults: [],
    provisioning: [],
    isComplete: false,
  });

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, TOTAL_STEPS - 1)
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const updateProjectConfig = useCallback((config: Partial<ProjectConfig>) => {
    setState(prev => ({
      ...prev,
      projectConfig: { ...prev.projectConfig, ...config }
    }));
  }, []);

  const updateSelectedTemplates = useCallback((templates: Template[]) => {
    setState(prev => ({
      ...prev,
      selectedTemplates: templates
    }));
  }, []);

  const updateValidationResults = useCallback((results: ValidationResult[]) => {
    setState(prev => ({
      ...prev,
      validationResults: results
    }));
  }, []);

  const updateProvisioningSteps = useCallback((steps: ProvisioningStep[]) => {
    setState(prev => ({
      ...prev,
      provisioning: steps
    }));
  }, []);

  const setUser = useCallback((user: any) => {
    setState(prev => ({
      ...prev,
      user,
      projectConfig: {
        ...prev.projectConfig,
        owner: user?.email,
        team: user?.team
      }
    }));
  }, []);

  const completeOnboarding = useCallback((completionData: any) => {
    setState(prev => ({
      ...prev,
      isComplete: true,
      completionData
    }));
  }, []);

  const canProceed = useCallback(() => {
    const { currentStep, user, projectConfig, selectedTemplates, validationResults } = state;
    
    switch (currentStep) {
      case 0: return !!user;
      case 1: return !!(projectConfig.name && projectConfig.projectType && projectConfig.language);
      case 2: return selectedTemplates.length > 0;
      case 3: return !!(projectConfig.environment && projectConfig.dataStore);
      case 4: return validationResults.filter(r => r.type === 'error').length === 0;
      case 5: return true;
      case 6: return state.isComplete;
      default: return false;
    }
  }, [state]);

  return {
    state,
    actions: {
      nextStep,
      prevStep,
      updateProjectConfig,
      updateSelectedTemplates,
      updateValidationResults,
      updateProvisioningSteps,
      setUser,
      completeOnboarding,
    },
    canProceed: canProceed(),
    totalSteps: TOTAL_STEPS,
  };
};