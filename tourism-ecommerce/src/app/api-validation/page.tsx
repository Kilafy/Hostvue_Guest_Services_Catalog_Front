'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TestTube, CheckCircle, XCircle, AlertCircle, Play } from 'lucide-react';
import APIValidator from '@/lib/api-validator';

interface ValidationReport {
  overall: { total: number; passed: number; failed: number; integrity: number };
  entities: Array<{
    entity: string;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    integrity: number;
    results: Array<{
      endpoint: string;
      method: string;
      success: boolean;
      error?: string;
      responseTime?: number;
    }>;
  }>;
  summary: string;
}

export default function APIValidationPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [report, setReport] = useState<ValidationReport | null>(null);

  const runValidation = async () => {
    setIsRunning(true);
    try {
      const validator = new APIValidator();
      const validationReport = await validator.validateAllAPIs();
      setReport(validationReport);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getIntegrityColor = (integrity: number) => {
    if (integrity >= 90) return 'text-status-success-600 bg-status-success-50';
    if (integrity >= 75) return 'text-secondary-amber-600 bg-secondary-amber-50';
    if (integrity >= 50) return 'text-status-warning-600 bg-status-warning-50';
    return 'text-status-error-600 bg-status-error-50';
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="h-4 w-4 text-status-success-500" />
    ) : (
      <XCircle className="h-4 w-4 text-status-error-500" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <TestTube className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">API Integrity Validation</h1>
                <p className="text-sm text-neutral-600 mt-1">Test all CRUD operations and measure API reliability</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Run Validation Button */}
        <Card className="p-6 mb-8 border-0 shadow-lg bg-white rounded-xl">
          <div className="text-center">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">API Validation Test Suite</h2>
            <p className="text-neutral-600 mb-6">
              This test validates all CRUD operations (Create, Read, Update, Delete) for each entity in the tourism platform.
              The test will measure response times, success rates, and overall API integrity.
            </p>
            <Button 
              onClick={runValidation} 
              disabled={isRunning}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-medium shadow-md transition-all duration-200"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run API Validation
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Validation Results */}
        {report && (
          <div className="space-y-6">
            {/* Overall Results */}
            <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">Overall Results</h2>
                <div className={`px-4 py-2 rounded-lg font-bold text-lg ${getIntegrityColor(report.overall.integrity)}`}>
                  {report.overall.integrity}% Integrity
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="text-2xl font-bold text-neutral-900">{report.overall.total}</div>
                  <div className="text-sm text-neutral-600">Total Tests</div>
                </div>
                <div className="text-center p-4 bg-status-success-50 rounded-lg">
                  <div className="text-2xl font-bold text-status-success-600">{report.overall.passed}</div>
                  <div className="text-sm text-status-success-600">Passed</div>
                </div>
                <div className="text-center p-4 bg-status-error-50 rounded-lg">
                  <div className="text-2xl font-bold text-status-error-600">{report.overall.failed}</div>
                  <div className="text-sm text-status-error-600">Failed</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-status-success-500 to-primary-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${report.overall.integrity}%` }}
                ></div>
              </div>
            </Card>

            {/* Entity Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {report.entities.map((entity) => (
                <Card key={entity.entity} className="p-6 border-0 shadow-lg bg-white rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-neutral-900 capitalize">{entity.entity}</h3>
                    <div className={`px-3 py-1 rounded-lg font-medium ${getIntegrityColor(entity.integrity)}`}>
                      {entity.integrity}%
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {entity.results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(result.success)}
                          <span className="text-sm font-medium text-neutral-700">
                            {result.method}
                          </span>
                          <span className="text-xs text-neutral-500">
                            {result.endpoint.split('/').pop()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.responseTime && (
                            <span className="text-xs text-neutral-500">
                              {result.responseTime}ms
                            </span>
                          )}
                          {!result.success && result.error && (
                            <div className="group relative">
                              <AlertCircle className="h-4 w-4 text-status-error-500" />
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                                {result.error}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-neutral-600">
                    {entity.passedTests}/{entity.totalTests} tests passed
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="p-6 border-0 shadow-lg bg-white rounded-xl">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Summary & Recommendations</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-neutral-700 bg-neutral-50 p-4 rounded-lg">
                  {report.summary}
                </pre>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
