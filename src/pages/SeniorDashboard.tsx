import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User, Globe, Phone, Settings, Home } from 'lucide-react';
import { ChatBot } from '@/components/chat/ChatBot';
import { SeniorProfile } from '@/components/profile/SeniorProfile';
import { Header } from '@/components/layout/Header';

export const SeniorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChatBot, setShowChatBot] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <SeniorProfile />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🌟 Bun venit la Trajecta Senior-Friendly! 👴👵
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Interfața simplă și accesibilă pentru călătorii liniștite
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">📞 Suport Telefonic 24/7</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Aveți nevoie de ajutor? Sunați-ne oricând!</p>
                  <Button size="lg" className="w-full text-lg py-4">
                    📞 Apelează Acum
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">💬 Asistent Virtual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Vorbiți cu asistentul nostru virtual</p>
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-4"
                    onClick={() => setShowChatBot(true)}
                  >
                    💬 Deschide Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-8 p-4">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
              size="lg"
              className="text-lg px-6"
            >
              🏠 Acasă
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              size="lg"
              className="text-lg px-6"
            >
              👤 Profilul Meu
            </Button>
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* ChatBot Modal */}
        {showChatBot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b border-orange-600">
                <h2 className="text-xl font-semibold text-orange-100">Asistent Virtual Trajecta</h2>
                <Button variant="outline" onClick={() => setShowChatBot(false)}>
                  ✕ Închide
                </Button>
              </div>
              <div className="flex-1">
                <ChatBot />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};