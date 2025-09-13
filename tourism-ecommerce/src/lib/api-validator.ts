/**
 * API Integrity Validation Script
 * Tests all CRUD operations against the backend API
 */

const API_BASE = '/api';

interface ValidationResult {
  endpoint: string;
  method: string;
  success: boolean;
  error?: string;
  responseTime?: number;
}

interface EntityTestResult {
  entity: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: ValidationResult[];
  integrity: number; // percentage
}

interface TestData {
  name: string;
  description: string;
  [key: string]: string | number;
}

class APIValidator {
  private results: EntityTestResult[] = [];

  async validateEntity(entity: string): Promise<EntityTestResult> {
    console.log(`🧪 Testing ${entity} API...`);
    
    const results: ValidationResult[] = [];
    let testData: TestData = { name: '', description: '' };

    // Test data for each entity
    const testDataMap: Record<string, TestData> = {
      services: {
        name: 'Test Service',
        description: 'A test service for validation',
        category_id: 1,
        location_id: 1,
        provider_id: 1,
        price: 99.99,
        duration: 120
      },
      categories: {
        name: 'Test Category',
        description: 'A test category for validation'
      },
      locations: {
        name: 'Test Location',
        description: 'A test location for validation',
        address: '123 Test Street',
        city: 'Test City',
        country: 'Test Country',
        latitude: 40.7128,
        longitude: -74.0060
      },
      providers: {
        name: 'Test Provider',
        description: 'A test provider for validation',
        email: 'test@provider.com',
        phone: '+1234567890',
        address: '456 Provider Ave'
      },
      media: {
        name: 'Test Media',
        description: 'A test media for validation',
        filename: 'test-image.jpg',
        media_type: 'image',
        media_url: 'https://example.com/test.jpg',
        entity_type: 'service',
        entity_id: 1
      }
    };

    testData = testDataMap[entity] || { name: 'Default Test', description: 'Default description' };

    // 1. Test GET all
    results.push(await this.testRequest(`${API_BASE}/${entity}`, 'GET'));

    // 2. Test POST (create)
    const createResult = await this.testRequest(`${API_BASE}/${entity}`, 'POST', testData);
    results.push(createResult);
    
    let createdId: number | null = null;
    if (createResult.success && createResult.error) {
      try {
        const responseData = JSON.parse(createResult.error);
        createdId = responseData.id || responseData.data?.id;
      } catch {
        // Could not parse response - continue without ID
      }
    }

    if (createdId) {
      // 3. Test GET by ID
      results.push(await this.testRequest(`${API_BASE}/${entity}/${createdId}`, 'GET'));

      // 4. Test PUT (update)
      const updateData = { ...testData, name: `Updated ${testData.name}` };
      results.push(await this.testRequest(`${API_BASE}/${entity}/${createdId}`, 'PUT', updateData));

      // 5. Test DELETE
      results.push(await this.testRequest(`${API_BASE}/${entity}/${createdId}`, 'DELETE'));
    } else {
      // Add failed tests for missing ID
      results.push({
        endpoint: `${API_BASE}/${entity}/:id`,
        method: 'GET',
        success: false,
        error: 'Could not extract ID from create response'
      });
      results.push({
        endpoint: `${API_BASE}/${entity}/:id`,
        method: 'PUT',
        success: false,
        error: 'Could not extract ID from create response'
      });
      results.push({
        endpoint: `${API_BASE}/${entity}/:id`,
        method: 'DELETE',
        success: false,
        error: 'Could not extract ID from create response'
      });
    }

    const passedTests = results.filter(r => r.success).length;
    const totalTests = results.length;
    const integrity = Math.round((passedTests / totalTests) * 100);

    const entityResult: EntityTestResult = {
      entity,
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      results,
      integrity
    };

    this.results.push(entityResult);
    return entityResult;
  }

  private async testRequest(url: string, method: string, body?: Record<string, unknown>): Promise<ValidationResult> {
    const startTime = Date.now();
    
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const responseTime = Date.now() - startTime;
      
      if (!response.ok) {
        return {
          endpoint: url,
          method,
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          responseTime
        };
      }

      const responseData = await response.text();
      
      return {
        endpoint: url,
        method,
        success: true,
        error: responseData, // Store response for potential ID extraction
        responseTime
      };

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      return {
        endpoint: url,
        method,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        responseTime
      };
    }
  }

  async validateAllAPIs(): Promise<{
    overall: { total: number; passed: number; failed: number; integrity: number };
    entities: EntityTestResult[];
    summary: string;
  }> {
    console.log('🚀 Starting API Integrity Validation...\n');

    const entities = ['services', 'categories', 'locations', 'providers', 'media'];
    
    for (const entity of entities) {
      await this.validateEntity(entity);
      console.log(`✅ Completed ${entity} validation\n`);
    }

    // Calculate overall statistics
    const totalTests = this.results.reduce((sum, r) => sum + r.totalTests, 0);
    const totalPassed = this.results.reduce((sum, r) => sum + r.passedTests, 0);
    const totalFailed = totalTests - totalPassed;
    const overallIntegrity = Math.round((totalPassed / totalTests) * 100);

    const summary = this.generateSummary(overallIntegrity, this.results);

    return {
      overall: {
        total: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        integrity: overallIntegrity
      },
      entities: this.results,
      summary
    };
  }

  private generateSummary(overallIntegrity: number, entityResults: EntityTestResult[]): string {
    let summary = `🔍 **API Integrity Report**\n\n`;
    summary += `**Overall Integrity: ${overallIntegrity}%**\n\n`;

    summary += `## Entity Breakdown:\n`;
    entityResults.forEach(entity => {
      const status = entity.integrity >= 80 ? '✅' : entity.integrity >= 60 ? '⚠️' : '❌';
      summary += `- ${status} **${entity.entity}**: ${entity.integrity}% (${entity.passedTests}/${entity.totalTests} tests passed)\n`;
    });

    summary += `\n## Detailed Results:\n`;
    entityResults.forEach(entity => {
      summary += `\n### ${entity.entity.toUpperCase()}\n`;
      entity.results.forEach(result => {
        const icon = result.success ? '✅' : '❌';
        summary += `${icon} ${result.method} ${result.endpoint}`;
        if (result.responseTime) {
          summary += ` (${result.responseTime}ms)`;
        }
        if (!result.success && result.error) {
          summary += ` - Error: ${result.error}`;
        }
        summary += `\n`;
      });
    });

    summary += `\n## Recommendations:\n`;
    if (overallIntegrity >= 90) {
      summary += `🎉 Excellent! Your API is highly reliable and production-ready.\n`;
    } else if (overallIntegrity >= 75) {
      summary += `👍 Good! Your API is mostly functional with minor issues to address.\n`;
    } else if (overallIntegrity >= 50) {
      summary += `⚠️ Fair. Several issues need attention before production deployment.\n`;
    } else {
      summary += `🚨 Critical. Significant API issues require immediate attention.\n`;
    }

    // Specific recommendations based on failed tests
    const failedEntities = entityResults.filter(e => e.integrity < 80);
    if (failedEntities.length > 0) {
      summary += `\n**Action Items:**\n`;
      failedEntities.forEach(entity => {
        summary += `- Review ${entity.entity} API implementation\n`;
      });
    }

    return summary;
  }
}

// Export for use in validation
export default APIValidator;
