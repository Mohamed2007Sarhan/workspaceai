// API Configuration and Helper Functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

// API Error handling
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  role: 'user' | 'admin' | 'super_admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  last_login?: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  created_at: string;
  members?: TeamMember[];
}

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  company: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface Permission {
  id: number;
  permission_name: string;
  description: string;
}

export interface TeamInvitation {
  id: number;
  team_id: number;
  email: string;
  role: 'admin' | 'member';
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  expires_at: string;
  created_at: string;
}

// API Helper Functions
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      let data: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        throw new APIError(
          data.error || data.message || 'Request failed',
          response.status,
          data.code
        );
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      
      if (error instanceof APIError) {
        throw error;
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    company: string;
  }) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User management endpoints
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);

    const query = queryParams.toString();
    return this.request(`/users${query ? `?${query}` : ''}`);
  }

  async updateUser(userId: number, userData: Partial<User>) {
    return this.request(`/users/update?id=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId: number) {
    return this.request(`/users/delete?id=${userId}`, {
      method: 'DELETE',
    });
  }

  // Team management endpoints
  async createTeam(teamData: {
    name: string;
    description: string;
  }) {
    return this.request('/teams/create', {
      method: 'POST',
      body: JSON.stringify(teamData),
    });
  }

  async addTeamMember(teamId: number, userId: number, role: 'admin' | 'member' = 'member') {
    return this.request('/teams/add-member', {
      method: 'POST',
      body: JSON.stringify({ team_id: teamId, user_id: userId, role }),
    });
  }

  async removeTeamMember(teamId: number, userId: number) {
    return this.request(`/teams/remove-member?team_id=${teamId}&user_id=${userId}`, {
      method: 'DELETE',
    });
  }

  async inviteToTeam(teamId: number, email: string, role: 'admin' | 'member' = 'member') {
    return this.request('/teams/invite', {
      method: 'POST',
      body: JSON.stringify({ team_id: teamId, email, role }),
    });
  }

  async acceptInvitation(invitationToken: string, userData: {
    name: string;
    password: string;
    company?: string;
  }) {
    return this.request('/teams/accept-invitation', {
      method: 'POST',
      body: JSON.stringify({ invitation_token: invitationToken, ...userData }),
    });
  }

  // Permission management endpoints
  async getPermissions() {
    return this.request('/permissions/list');
  }

  async createPermission(name: string, description: string) {
    return this.request('/permissions/create', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    });
  }

  async addUserPermission(userId: number, permissionId: number) {
    return this.request('/permissions/add-user-permission', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, permission_id: permissionId }),
    });
  }

  async removeUserPermission(userId: number, permissionId: number) {
    return this.request(`/permissions/remove-user-permission?user_id=${userId}&permission_id=${permissionId}`, {
      method: 'DELETE',
    });
  }

  async getUserPermissions(userId: number) {
    return this.request(`/permissions/user-permissions?user_id=${userId}`);
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL);

// Auth helper functions
export const auth = {
  async login(email: string, password: string) {
    const response = await api.login(email, password);
    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    company: string;
  }) {
    const response = await api.register(userData);
    if (response.success && response.data?.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  async logout() {
    const response = await api.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return response;
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  },

  hasPermission(permission: string): boolean {
    // This would need to be implemented with server-side permission checking
    const user = this.getCurrentUser();
    return user?.role === 'admin' || user?.role === 'super_admin';
  }
};
