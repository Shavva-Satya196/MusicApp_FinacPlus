
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' as const },
  { id: '2', username: 'user', password: 'user123', role: 'user' as const },
];

// Simple JWT mock
const generateMockJWT = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
  };
  return btoa(JSON.stringify(payload));
};

const decodeMockJWT = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    return {
      id: payload.id,
      username: payload.username,
      role: payload.role,
    };
  } catch {
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('auth_token');
    if (token) {
      const decoded = decodeMockJWT(token);
      if (decoded) {
        setUser(decoded);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (mockUser) {
      const user: User = {
        id: mockUser.id,
        username: mockUser.username,
        role: mockUser.role,
      };
      
      const token = generateMockJWT(user);
      localStorage.setItem('auth_token', token);
      setUser(user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAdmin,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
