import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
    onLoginClick: () => void;
    onRegisterClick: () => void;
}

export const Header = ({ onLoginClick, onRegisterClick }: HeaderProps) => {
    const [language, setLanguage] = useState('RO');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const languages = [
        { code: 'RO', name: 'Română' },
        { code: 'EN', name: 'English' },
        { code: 'DE', name: 'Deutsch' },
        { code: 'FR', name: 'Français' },
        { code: 'ES', name: 'Español' }
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="text-2xl font-bold text-blue-600">
                            🌍 TravelQuest
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Despre
                        </a>
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Caracteristici
                        </a>
                        <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Testimoniale
                        </a>
                        <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Contact
                        </a>
                    </nav>

                    {/* Right side */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Language Selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    {language}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        onClick={() => setLanguage(lang.code)}
                                        className={language === lang.code ? 'bg-blue-50' : ''}
                                    >
                                        {lang.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Auth Buttons */}
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        {user.fullName}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Profil</DropdownMenuItem>
                                    <DropdownMenuItem>Setări</DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>Deconectare</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="outline" onClick={onLoginClick}>
                                    Conectare
                                </Button>
                                <Button onClick={onRegisterClick}>
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
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            <a href="#about" className="text-gray-700 hover:text-blue-600">
                                Despre
                            </a>
                            <a href="#features" className="text-gray-700 hover:text-blue-600">
                                Caracteristici
                            </a>
                            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">
                                Testimoniale
                            </a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600">
                                Contact
                            </a>

                            {user ? (
                                <div className="pt-4 space-y-2">
                                    <div className="text-sm font-medium">{user.fullName}</div>
                                    <Button variant="outline" size="sm" onClick={logout} className="w-full">
                                        Deconectare
                                    </Button>
                                </div>
                            ) : (
                                <div className="pt-4 space-y-2">
                                    <Button variant="outline" onClick={onLoginClick} className="w-full">
                                        Conectare
                                    </Button>
                                    <Button onClick={onRegisterClick} className="w-full">
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