import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User, Globe, Phone, Settings, Home } from 'lucide-react';
import { ChatBot } from '@/components/chat/ChatBot';
import { SeniorProfile } from '@/components/profile/SeniorProfile';

export const SeniorDashboard = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'chat' | 'profile' | 'settings'>('home');
  const [showChatBot, setShowChatBot] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Acasă', icon: Home },
    { id: 'chat', label: 'Asistent Virtual', icon: MessageCircle },
    { id: 'profile', label: 'Profilul Meu', icon: User },
    { id: 'settings', label: 'Setări', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'chat':
        return <ChatBot />;
      case 'profile':
        return <SeniorProfile />;
      case 'settings':
        return <div className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Setări</h2>
          <p className="text-xl text-gray-600">Funcționalitate în dezvoltare</p>
        </div>;
      default:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Bine ați venit la TravelQuest! 👋
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Aplicația dumneavoastră de călătorii, simplă și ușor de folosit
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                  <CardTitle className="text-2xl">Asistent Virtual</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg text-gray-600 mb-6">
                    Vorbiți cu asistentul nostru virtual în limba dumneavoastră
                  </p>
                  <Button 
                    onClick={() => setActiveSection('chat')} 
                    size="lg" 
                    className="text-lg px-8 py-4"
                  >
                    Începeți Conversația
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <User className="w-16 h-16 mx-auto text-green-600 mb-4" />
                  <CardTitle className="text-2xl">Profilul Meu</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-lg text-gray-600 mb-6">
                    Adăugați fotografii și locurile pe care le-ați vizitat
                  </p>
                  <Button 
                    onClick={() => setActiveSection('profile')} 
                    variant="outline" 
                    size="lg" 
                    className="text-lg px-8 py-4"
                  >
                    Vezi Profilul
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Acțiuni Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 text-lg flex flex-col items-center justify-center"
                    onClick={() => setShowChatBot(true)}
                  >
                    <Globe className="w-8 h-8 mb-2" />
                    Ajutor
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 text-lg flex flex-col items-center justify-center"
                  >
                    <Phone className="w-8 h-8 mb-2" />
                    Contact
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 text-lg flex flex-col items-center justify-center"
                    onClick={() => setActiveSection('profile')}
                  >
                    <User className="w-8 h-8 mb-2" />
                    Profil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 text-lg flex flex-col items-center justify-center"
                    onClick={() => setActiveSection('settings')}
                  >
                    <Settings className="w-8 h-8 mb-2" />
                    Setări
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b-4 border-blue-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">🌍 TravelQuest</h1>
            </div>
            <div className="flex space-x-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "outline"}
                  onClick={() => setActiveSection(item.id as any)}
                  className="text-lg px-6 py-3"
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
          className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
        >
          💬
        </button>
      )}

      {/* Chat Bot Overlay */}
      {showChatBot && activeSection !== 'chat' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] m-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold">Asistent Virtual</h3>
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