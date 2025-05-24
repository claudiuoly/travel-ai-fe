import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => void;
    updateUser: (user: User) => void;
    isLoading: boolean;
}

interface RegisterData {
    fullName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
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
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulare API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockUser: User = {
                id: '1',
                fullName: 'John Doe',
                email,
                phone: '+40123456789',
                username: 'johndoe',
                age: 28,
                profileCompleted: false,
                createdAt: new Date()
            };

            setUser(mockUser);
            localStorage.setItem('travel_user', JSON.stringify(mockUser));
            return true;
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData): Promise<boolean> => {
        setIsLoading(true);
        try {
            // Simulare API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: Date.now().toString(),
                fullName: userData.fullName,
                email: userData.email,
                phone: userData.phone,
                username: userData.username,
                age: userData.age,
                profileCompleted: false,
                createdAt: new Date()
            };

            setUser(newUser);
            localStorage.setItem('travel_user', JSON.stringify(newUser));
            return true;
        } catch (error) {
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('travel_user');
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('travel_user', JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            updateUser,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};