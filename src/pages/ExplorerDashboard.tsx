import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User, Compass, Map, Settings, Home } from 'lucide-react';
import { ChatBot } from '@/components/chat/ChatBot';
import { ExplorerProfile } from '@/components/profile/ExplorerProfile';

interface ExplorerDashboardProps {
    type: 'advanced' | 'beginner';
}

export const ExplorerDashboard = ({ type }: ExplorerDashboardProps) => {
    const [activeSection, setActiveSection] = useState<'home' | 'chat' | 'profile' | 'settings'>('home');
    const [showChatBot, setShowChatBot] = useState(false);

    const isAdvanced = type === 'advanced';
    const theme = isAdvanced
        ? { primary: 'blue', secondary: 'cyan', emoji: '🧭', title: 'Explorer Advanced' }
        : { primary: 'green', secondary: 'emerald', emoji: '🌱', title: 'Explorer Beginner' };

    const menuItems = [
        { id: 'home', label: 'Baza de Explorare', icon: Home },
        { id: 'chat', label: 'Ghid AI', icon: MessageCircle },
        { id: 'profile', label: 'Jurnalul Meu', icon: User },
        { id: 'settings', label: 'Echipament', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'chat':
                return <ChatBot />;
            case 'profile':
                return <ExplorerProfile type={type} />;
            case 'settings':
                return <div className="text-center py-12">
                    <h2 className="text-3xl font-bold mb-4">Echipament & Setări</h2>
                    <p className="text-xl text-gray-600">Funcționalitate în dezvoltare</p>
                </div>;
            default:
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h1 className={`text-4xl font-bold text-${theme.primary}-800 mb-4`}>
                                Bine ai venit în TravelQuest {theme.title}! {theme.emoji}
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                {isAdvanced
                                    ? 'Instrumentele avansate pentru exploratorii experimentați'
                                    : 'Primul tău pas în lumea explorărilor'
                                }
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className={`hover:shadow-lg transition-shadow bg-gradient-to-br from-${theme.primary}-50 to-${theme.secondary}-50 border-${theme.primary}-200`}>
                                <CardHeader className="text-center">
                                    <MessageCircle className={`w-16 h-16 mx-auto text-${theme.primary}-600 mb-4`} />
                                    <CardTitle className="text-2xl">Ghid AI Personal</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-lg text-gray-600 mb-6">
                                        {isAdvanced
                                            ? 'Analize detaliate și recomandări expertă'
                                            : 'Sfaturi simple pentru începători'
                                        }
                                    </p>
                                    <Button
                                        onClick={() => setActiveSection('chat')}
                                        className={`bg-${theme.primary}-600 hover:bg-${theme.primary}-700`}
                                    >
                                        Începe Explorarea
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card className={`hover:shadow-lg transition-shadow bg-gradient-to-br from-${theme.primary}-50 to-${theme.secondary}-50 border-${theme.primary}-200`}>
                                <CardHeader className="text-center">
                                    <User className={`w-16 h-16 mx-auto text-${theme.secondary}-600 mb-4`} />
                                    <CardTitle className="text-2xl">Jurnalul Exploratorului</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-lg text-gray-600 mb-6">
                                        Documentează călătoriile și descoperirile tale
                                    </p>
                                    <Button
                                        onClick={() => setActiveSection('profile')}
                                        variant="outline"
                                        className={`border-${theme.secondary}-300 text-${theme.secondary}-600 hover:bg-${theme.secondary}-50`}
                                    >
                                        Deschide Jurnalul
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card className={`bg-gradient-to-r from-${theme.primary}-100 to-${theme.secondary}-100`}>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">Kit de Explorare</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button
                                        variant="outline"
                                        className="h-20 flex flex-col items-center justify-center bg-white hover:bg-blue-50"
                                        onClick={() => setShowChatBot(true)}
                                    >
                                        <Compass className={`w-8 h-8 mb-2 text-${theme.primary}-600`} />
                                        Busolă
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex flex-col items-center justify-center bg-white hover:bg-blue-50"
                                    >
                                        <Map className={`w-8 h-8 mb-2 text-${theme.secondary}-600`} />
                                        Hartă
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex flex-col items-center justify-center bg-white hover:bg-blue-50"
                                        onClick={() => setActiveSection('profile')}
                                    >
                                        <User className={`w-8 h-8 mb-2 text-${theme.primary}-600`} />
                                        Jurnal
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex flex-col items-center justify-center bg-white hover:bg-blue-50"
                                        onClick={() => setActiveSection('settings')}
                                    >
                                        <Settings className="w-8 h-8 mb-2 text-gray-600" />
                                        Echipament
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                );
        }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br from-${theme.primary}-50 to-${theme.secondary}-50`}>
            {/* Navigation */}
            <nav className={`bg-white shadow-sm border-b-4 border-${theme.primary}-200`}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className={`text-2xl font-bold text-${theme.primary}-600`}>
                                {theme.emoji} TravelQuest {theme.title}
                            </h1>
                        </div>
                        <div className="flex space-x-2">
                            {menuItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={activeSection === item.id ? "default" : "outline"}
                                    onClick={() => setActiveSection(item.id as any)}
                                    className={activeSection === item.id
                                        ? `bg-${theme.primary}-600 hover:bg-${theme.primary}-700`
                                        : `hover:bg-${theme.primary}-50`
                                    }
                                >
                                    <item.icon className="w-5 h-5 mr-2" />
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {renderContent()}
            </main>

            {/* Floating Chat Button */}
            {!showChatBot && activeSection !== 'chat' && (
                <button
                    onClick={() => setShowChatBot(true)}
                    className={`fixed bottom-6 right-6 w-16 h-16 bg-${theme.primary}-600 hover:bg-${theme.primary}-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110`}
                >
                    {theme.emoji}
                </button>
            )}

            {/* Chat Bot Overlay */}
            {showChatBot && activeSection !== 'chat' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] m-4">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-xl font-bold">Ghid AI Personal</h3>
                            <Button variant="outline" onClick={() => setShowChatBot(false)}>
                                ✕
                            </Button>
                        </div>
                        <div className="h-[520px]">
                            <ChatBot />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
