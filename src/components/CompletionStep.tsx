import React from 'react';
import { CheckCircle, ExternalLink, Copy, ArrowRight, Book, Rocket } from 'lucide-react';

interface CompletionStepProps {
  completionData: {
    repositoryUrl: string;
    infrastructureUrls: string[];
    accessDetails: string[];
    nextSteps: string[];
  };
}

export const CompletionStep: React.FC<CompletionStepProps> = ({ completionData }) => {
  const [copiedUrl, setCopiedUrl] = React.useState<string>('');

  const copyToClipboard = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedUrl(identifier);
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Successfully Created!</h2>
        <p className="text-lg text-gray-600">
          Your project has been provisioned and is ready for development
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Repository Access */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Book className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Repository</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Your project repository has been created with starter code and CI/CD pipeline.
          </p>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-mono text-gray-800 truncate">
              {completionData.repositoryUrl}
            </span>
            <div className="flex space-x-2 ml-3">
              <button
                onClick={() => copyToClipboard(completionData.repositoryUrl, 'repo')}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                title="Copy URL"
              >
                <Copy className="w-4 h-4" />
              </button>
              <a
                href={completionData.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                title="Open Repository"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          {copiedUrl === 'repo' && (
            <p className="text-sm text-green-600 mt-2">✓ Repository URL copied to clipboard</p>
          )}
        </div>

        {/* Infrastructure */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Rocket className="w-6 h-6 text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Infrastructure</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Your infrastructure has been provisioned and is ready to use.
          </p>
          <div className="space-y-2">
            {completionData.infrastructureUrls.map((url, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-mono text-gray-800 truncate">
                  {url.split('/').pop() || url}
                </span>
                <div className="flex space-x-2 ml-3">
                  <button
                    onClick={() => copyToClipboard(url, `infra-${index}`)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-purple-600 hover:text-purple-800 transition-colors"
                    title="Open Console"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Access Details */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Access Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completionData.accessDetails.map((detail, index) => (
            <div key={index} className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-blue-800">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
        <div className="space-y-3">
          {completionData.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="w-6 h-6 bg-green-100 text-green-800 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <a
          href={completionData.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Book className="w-5 h-5 mr-2" />
          View Repository
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Create Another Project
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Success Message */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Project onboarding completed successfully!</span>
        </div>
      </div>
    </div>
  );
};