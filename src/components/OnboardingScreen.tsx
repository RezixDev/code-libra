import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Code, Book, Award, Zap } from 'lucide-react';

const OnboardingScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const onboardingSteps = [
    {
      title: "Learn programming with our interactive lessons",
      description: "Master the fundamentals of coding with step-by-step interactive lessons designed for beginners and experienced developers alike.",
      icon: <Book size={48} className="text-indigo-600" />,
      illustration: "/api/placeholder/300/200",
      bgClass: "bg-indigo-50"
    },
    {
      title: "Practice with real-world coding challenges",
      description: "Apply what you've learned with our coding challenges that simulate real-world problems and test your skills.",
      icon: <Code size={48} className="text-purple-600" />,
      illustration: "/api/placeholder/300/200",
      bgClass: "bg-purple-50"
    },
    {
      title: "Track your progress and earn certificates",
      description: "Follow your learning journey, earn achievements, and get certified as you master new programming skills.",
      icon: <Award size={48} className="text-yellow-600" />,
      illustration: "/api/placeholder/300/200",
      bgClass: "bg-yellow-50"
    },
    {
      title: "Learn anywhere, anytime, even offline",
      description: "Take your learning on the go with our mobile app. Download lessons to continue learning even without internet access.",
      icon: <Zap size={48} className="text-green-600" />,
      illustration: "/api/placeholder/300/200",
      bgClass: "bg-green-50"
    }
  ];
  
  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden h-[600px] flex flex-col">
        {/* Skip Button */}
        <div className="p-4 flex justify-end">
          <button className="text-gray-500 text-sm">
            Skip
          </button>
        </div>
        
        {/* Content Area */}
        <div className={`flex-1 flex flex-col items-center justify-center p-6 ${currentStepData.bgClass}`}>
          <div className="mb-6">
            {currentStepData.icon}
          </div>
          <img
            src={currentStepData.illustration}
            alt={`Illustration for ${currentStepData.title}`}
            className="w-64 h-40 object-cover rounded-xl mb-6"
          />
          <h1 className="text-xl font-bold text-center mb-3">
            {currentStepData.title}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {currentStepData.description}
          </p>
          
          {/* Progress Dots */}
          <div className="flex space-x-2 mb-6">
            {onboardingSteps.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button 
              onClick={handlePrevious}
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentStep === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-700'
              }`}
              disabled={currentStep === 0}
            >
              <ArrowLeft size={20} className="mr-1" />
              Back
            </button>
            {isLastStep ? (
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium">
                Get Started
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center font-medium"
              >
                Next
                <ArrowRight size={20} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;