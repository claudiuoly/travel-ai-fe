import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Globe, Menu, X, User, LogOut, Settings, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
    onLoginClick?: () => void;
    onRegisterClick?: () => void;
}

export const Header = ({ onLoginClick, onRegisterClick }: HeaderProps) => {
    const [language, setLanguage] = useState('RO');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const languages = [
        { code: 'RO', name: 'Română', flag: '🇷🇴' },
        { code: 'EN', name: 'English', flag: '🇺🇸' },
        { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'FR', name: 'Français', flag: '🇫🇷' },
        { code: 'ES', name: 'Español', flag: '🇪🇸' }
    ];

    const handleLogout = () => {
        logout();
        // Optionally redirect to home page
        window.location.href = '/';
    };

    return (
        <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">🌍</div>
                                <div className="absolute -top-1 -right-1 text-sm group-hover:animate-bounce">✨</div>
                            </div>
                            <div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block">
                                    Trajecta
                                </span>
                                <div className="text-xs text-gray-500 font-medium">Călătorii Personalizate</div>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Navigation - Only show when not logged in */}
                    {!user && (
                        <nav className="hidden md:flex items-center space-x-8">
                            <a href="#about" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group">
                                Despre
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#features" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group">
                                Caracteristici
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <a href="#testimonials" className="relative text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group">
                                Testimoniale
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </nav>
                    )}

                    {/* Right side */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Language Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-lg">{languages.find(lang => lang.code === language)?.flag}</span>
                                    <span className="font-medium">{language}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border-gray-200">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        className={`flex items-center gap-3 ${language === lang.code ? 'bg-blue-50 text-blue-700' : ''} hover:bg-blue-50 transition-colors duration-200`}
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Auth Section */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            {user.fullName.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-700">{user.fullName}</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-gray-200">
                                    <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-200">
                                        <User className="w-4 h-4 mr-2" />
                                        Profil
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-blue-50 transition-colors duration-200">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Setări
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 transition-colors duration-200">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Deconectare
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button 
                                    variant="outline" 
                                    onClick={onLoginClick} 
                                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 font-medium"
                                >
                                    Conectare
                                </Button>
                                <Button 
                                    onClick={onRegisterClick} 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Înregistrare
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="hover:bg-gray-100 transition-colors duration-200"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-gray-100 bg-white/95 backdrop-blur-md">
                        <nav className="flex flex-col space-y-4">
                            {!user && (
                                <>
                                    <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                                        Despre
                                    </a>
                                    <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                                        Caracteristici
                                    </a>
                                    <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2">
                                        Testimoniale
                                    </a>
                                </>
                            )}

                            {user ? (
                                <div className="pt-4 space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                                            {user.fullName.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                Bună ziua, {user.fullName}! 👋
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full justify-start hover:bg-blue-50 transition-colors duration-200">
                                        <User className="w-4 h-4 mr-2" />
                                        Profil
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start hover:bg-blue-50 transition-colors duration-200">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Setări
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={handleLogout} className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Deconectare
                                    </Button>
                                </div>
                            ) : (
                                <div className="pt-4 space-y-3">
                                    <Button variant="outline" onClick={onLoginClick} className="w-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300">
                                        Conectare
                                    </Button>
                                    <Button onClick={onRegisterClick} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Înregistrare
                                    </Button>
                                </div>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};