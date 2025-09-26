// API Test Functions

import { api } from './api';

export class APITester {
  private baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
  }

  // Test API health
  async testHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // Test authentication
  async testAuth(): Promise<{ success: boolean; message: string }> {
    try {
      // Test register
      const registerData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        company: 'Test Company'
      };

      const registerResponse = await api.register(registerData);
      
      if (registerResponse.success) {
        return { success: true, message: 'Authentication test passed' };
      } else {
        return { success: false, message: 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: `Auth test failed: ${error}` };
    }
  }

  // Test user management
  async testUserManagement(): Promise<{ success: boolean; message: string }> {
    try {
      // First login to get token
      const loginResponse = await api.login('test@example.com', 'password123');
      
      if (!loginResponse.success) {
        return { success: false, message: 'Login failed' };
      }

      // Test get users
      const usersResponse = await api.getUsers();
      
      if (usersResponse.success) {
        return { success: true, message: 'User management test passed' };
      } else {
        return { success: false, message: 'Get users failed' };
      }
    } catch (error) {
      return { success: false, message: `User management test failed: ${error}` };
    }
  }

  // Test team management
  async testTeamManagement(): Promise<{ success: boolean; message: string }> {
    try {
      // Test create team
      const teamData = {
        name: 'Test Team',
        description: 'Test team description'
      };

      const teamResponse = await api.createTeam(teamData);
      
      if (teamResponse.success) {
        return { success: true, message: 'Team management test passed' };
      } else {
        return { success: false, message: 'Create team failed' };
      }
    } catch (error) {
      return { success: false, message: `Team management test failed: ${error}` };
    }
  }

  // Test permissions
  async testPermissions(): Promise<{ success: boolean; message: string }> {
    try {
      // Test get permissions
      const permissionsResponse = await api.getPermissions();
      
      if (permissionsResponse.success) {
        return { success: true, message: 'Permissions test passed' };
      } else {
        return { success: false, message: 'Get permissions failed' };
      }
    } catch (error) {
      return { success: false, message: `Permissions test failed: ${error}` };
    }
  }

  // Run all tests
  async runAllTests(): Promise<{
    health: boolean;
    auth: { success: boolean; message: string };
    users: { success: boolean; message: string };
    teams: { success: boolean; message: string };
    permissions: { success: boolean; message: string };
  }> {
    const results = {
      health: await this.testHealth(),
      auth: await this.testAuth(),
      users: await this.testUserManagement(),
      teams: await this.testTeamManagement(),
      permissions: await this.testPermissions()
    };

    console.log('API Test Results:', results);
    return results;
  }
}

// Export test function
export const testAPI = async () => {
  const tester = new APITester();
  return await tester.runAllTests();
};
