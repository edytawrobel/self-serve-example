import React from 'react';
import { Check, ChevronRight } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                ${index < currentStep 
                  ? 'bg-green-500 text-white' 
                  : index === currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="ml-3">
              <div
                className={`
                  font-medium transition-colors duration-300
                  ${index <= currentStep ? 'text-gray-900' : 'text-gray-500'}
                `}
              >
                {step}
              </div>
            </div>
          </div>
          {index < totalSteps - 1 && (
            <ChevronRight 
              className={`
                w-5 h-5 mx-4 transition-colors duration-300
                ${index < currentStep ? 'text-green-500' : 'text-gray-400'}
              `} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};