import React, { useState } from 'react';
import { ArrowLeft, Play, Code, Info, MessageSquare, Award, CheckCircle, XCircle } from 'lucide-react';

const CodePracticeScreen = () => {
  const [code, setCode] = useState("// Write your JavaScript code here\n\nfunction sumArray(arr) {\n  // Implement this function\n  // It should return the sum of all numbers in the array\n  \n}");
  
  const [outputState, setOutputState] = useState({
    isRunning: false,
    isSuccess: false,
    output: ""
  });
  
  const challenge = {
    title: "Sum Array Elements",
    difficulty: "Easy",
    description: "Create a function that takes an array of numbers and returns the sum of all numbers in the array.",
    examples: [
      { input: "[1, 2, 3, 4]", output: "10" },
      { input: "[-1, -2, -3]", output: "-6" }
    ],
    testCases: [
      { input: [1, 2, 3, 4], expectedOutput: 10 },
      { input: [-1, -2, -3], expectedOutput: -6 },
      { input: [0, 0, 0], expectedOutput: 0 },
      { input: [5], expectedOutput: 5 }
    ]
  };
  
  const runCode = () => {
    setOutputState({
      isRunning: true,
      isSuccess: false,
      output: "Running tests..."
    });
    
    // Simulate running code
    setTimeout(() => {
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.5;
      
      if (success) {
        setOutputState({
          isRunning: false,
          isSuccess: true,
          output: "All tests passed!\n\nTest 1: passed\nInput: [1, 2, 3, 4]\nExpected: 10\nOutput: 10\n\nTest 2: passed\nInput: [-1, -2, -3]\nExpected: -6\nOutput: -6\n\nTest 3: passed\nInput: [0, 0, 0]\nExpected: 0\nOutput: 0\n\nTest 4: passed\nInput: [5]\nExpected: 5\nOutput: 5"
        });
      } else {
        setOutputState({
          isRunning: false,
          isSuccess: false,
          output: "Some tests failed!\n\nTest 1: passed\nInput: [1, 2, 3, 4]\nExpected: 10\nOutput: 10\n\nTest 2: failed\nInput: [-1, -2, -3]\nExpected: -6\nOutput: -5\n\nTest 3: passed\nInput: [0, 0, 0]\nExpected: 0\nOutput: 0\n\nTest 4: passed\nInput: [5]\nExpected: 5\nOutput: 5"
        });
      }
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <div className="relative w-full max-w-md bg-gray-900 rounded-2xl shadow-lg overflow-hidden h-[600px] flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-3 text-gray-400 hover:text-white">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-sm font-bold">{challenge.title}</h1>
              <div className="flex items-center">
                <span className="text-xs bg-indigo-600 rounded-full px-2 py-0.5 mr-2">{challenge.difficulty}</span>
                <span className="text-xs text-gray-400">JavaScript</span>
              </div>
            </div>
          </div>
          <div className="flex">
            <button className="text-gray-400 hover:text-white mx-1">
              <Info size={18} />
            </button>
            <button className="text-gray-400 hover:text-white mx-1">
              <MessageSquare size={18} />
            </button>
          </div>
        </header>
        
        {/* Tabs */}
        <div className="bg-gray-800 text-gray-400 flex">
          <button className="flex-1 py-2 text-center text-xs font-medium border-b-2 border-indigo-500 text-white">
            Code
          </button>
          <button className="flex-1 py-2 text-center text-xs font-medium">
            Description
          </button>
          <button className="flex-1 py-2 text-center text-xs font-medium">
            Solutions
          </button>
        </div>
        
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 border-b border-gray-700 overflow-hidden">
            <textarea
              className="w-full h-full bg-gray-900 text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          
          {/* Output */}
          <div className="h-40 overflow-auto p-4 bg-gray-800 text-gray-300 text-xs font-mono">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">Console Output:</span>
              {outputState.isRunning ? (
                <span className="text-yellow-400">Running...</span>
              ) : outputState.isSuccess ? (
                <span className="text-green-400 flex items-center">
                  <CheckCircle size={14} className="mr-1" /> All Tests Passed
                </span>
              ) : outputState.output ? (
                <span className="text-red-400 flex items-center">
                  <XCircle size={14} className="mr-1" /> Tests Failed
                </span>
              ) : null}
            </div>
            <pre className="whitespace-pre-wrap">
              {outputState.output || "// Click Run to execute your code"}
            </pre>
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="bg-gray-800 p-4 border-t border-gray-700 flex">
          <button 
            className="flex-1 bg-gray-700 text-gray-300 py-2 rounded-l-lg text-sm font-medium flex items-center justify-center"
          >
            Reset
          </button>
          <button 
            onClick={runCode}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-r-lg text-sm font-medium flex items-center justify-center"
          >
            <Play size={18} className="mr-2" />
            Run
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodePracticeScreen;