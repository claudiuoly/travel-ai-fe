import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';
import { authAPI } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  login: (identifier: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
  markFirstLoginComplete: () => void;
  isLoading: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  age: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('travel_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Ensure backward compatibility - if isFirstLogin is not set, default to false
      if (userData.isFirstLogin === undefined) {
        userData.isFirstLogin = false;
      }
      setUser(userData);
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(identifier, password);

      if (response.error || !response.data) {
        return false;
      }

      const { user: userData, token, is_first_login } = response.data;
      
      const user: User = {
        id: userData.id,
        fullName: userData.full_name,
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        age: userData.age,
        profileCompleted: userData.profile_completed || false,
        isFirstLogin: is_first_login === true,
        createdAt: new Date()
      };
      
      setUser(user);
      localStorage.setItem('travel_user', JSON.stringify(user));
      
      // Store token if provided
      if (token) {
        localStorage.setItem('auth_token', token);
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.register({
        full_name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        username: userData.username,
        age: userData.age,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      });

      if (response.error || !response.data) {
        return false;
      }

      // Don't auto-login after registration - user should login manually
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travel_user');
    localStorage.removeItem('auth_token');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('travel_user', JSON.stringify(updatedUser));
  };

  const markFirstLoginComplete = () => {
    if (user) {
      const updatedUser = { ...user, isFirstLogin: false };
      setUser(updatedUser);
      localStorage.setItem('travel_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      markFirstLoginComplete,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};