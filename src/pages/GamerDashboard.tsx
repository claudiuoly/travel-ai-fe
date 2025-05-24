import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User, Gamepad2, Trophy, Settings, Home, Menu, X } from 'lucide-react';
import { ChatBot } from '@/components/chat/ChatBot';
import { GamerProfile } from '@/components/profile/GamerProfile';

export const GamerDashboard = () => {
    const [activeSection, setActiveSection] = useState<'home' | 'chat' | 'profile' | 'settings'>('home');
    const [showChatBot, setShowChatBot] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { id: 'home', label: 'Hub Principal', icon: Home },
        { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
        { id: 'profile', label: 'Profilul Meu', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'chat':
                return <ChatBot />;
            case 'profile':
                return <GamerProfile />;
            case 'settings':
                return <div className="text-center py-12">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Settings</h2>
                    <p className="text-lg md:text-xl text-gray-600">Feature în dezvoltare</p>
                </div>;
            default:
                return (
                    <div className="space-y-6 md:space-y-8 px-4 md:px-0">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-4">
                                Welcome to TravelQuest Gaming Hub! 🎮
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-2">
                                Your gaming-style travel companion
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                                <CardHeader className="text-center">
                                    <MessageCircle className="w-12 h-12 md:w-16 md:h-16 mx-auto text-purple-600 mb-4" />
                                    <CardTitle className="text-xl md:text-2xl">AI Travel Assistant</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 px-2">
                                        Chat cu AI-ul nostru pentru recomandări personalizate
                                    </p>
                                    <Button
                                        onClick={() => setActiveSection('chat')}
                                        className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto"
                                    >
                                        Start Chat
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                                <CardHeader className="text-center">
                                    <User className="w-12 h-12 md:w-16 md:h-16 mx-auto text-pink-600 mb-4" />
                                    <CardTitle className="text-xl md:text-2xl">Gaming Profile</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 px-2">
                                        Customizează-ți profilul și adaugă aventurile tale
                                    </p>
                                    <Button
                                        onClick={() => setActiveSection('profile')}
                                        variant="outline"
                                        className="border-pink-300 text-pink-600 hover:bg-pink-50 w-full md:w-auto"
                                    >
                                        View Profile
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
                            <CardHeader>
                                <CardTitle className="text-xl md:text-2xl text-center">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                    <Button
                                        variant="outline"
                                        className="h-16 md:h-20 flex flex-col items-center justify-center bg-white hover:bg-purple-50 text-sm md:text-base"
                                        onClick={() => setShowChatBot(true)}
                                    >
                                        <Gamepad2 className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-purple-600" />
                                        Quest Log
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-16 md:h-20 flex flex-col items-center justify-center bg-white hover:bg-purple-50 text-sm md:text-base"
                                    >
                                        <Trophy className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-yellow-600" />
                                        Achievements
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-16 md:h-20 flex flex-col items-center justify-center bg-white hover:bg-purple-50 text-sm md:text-base"
                                        onClick={() => setActiveSection('profile')}
                                    >
                                        <User className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-pink-600" />
                                        Profile
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-16 md:h-20 flex flex-col items-center justify-center bg-white hover:bg-purple-50 text-sm md:text-base"
                                        onClick={() => setActiveSection('settings')}
                                    >
                                        <Settings className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2 text-gray-600" />
                                        Settings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b-4 border-purple-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl md:text-2xl font-bold text-purple-600">🎮 TravelQuest Gaming</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-2">
                            {menuItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={activeSection === item.id ? "default" : "outline"}
                                    onClick={() => setActiveSection(item.id as any)}
                                    className={activeSection === item.id ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
                                >
                                    <item.icon className="w-5 h-5 mr-2" />
                                    {item.label}
                                </Button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden pb-4 border-t pt-4">
                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={activeSection === item.id ? "default" : "outline"}
                                        onClick={() => {
                                            setActiveSection(item.id as any);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full justify-start ${activeSection === item.id ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}`}
                                    >
                                        <item.icon className="w-5 h-5 mr-2" />
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto py-6 md:py-8">
                {renderContent()}
            </main>

            {/* Floating Chat Button */}
            {!showChatBot && activeSection !== 'chat' && (
                <button
                    onClick={() => setShowChatBot(true)}
                    className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center text-xl md:text-2xl transition-all duration-300 hover:scale-110 z-40"
                >
                    🎮
                </button>
            )}

            {/* Chat Bot Overlay */}
            {showChatBot && activeSection !== 'chat' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl h-[85vh] md:h-[600px] flex flex-col">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg md:text-xl font-bold">AI Travel Assistant</h3>
                            <Button variant="outline" onClick={() => setShowChatBot(false)} className="p-2">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <ChatBot />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};