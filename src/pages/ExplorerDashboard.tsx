import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User, Compass, Map, Settings, Home } from 'lucide-react';
import { ChatBot } from '@/components/chat/ChatBot';
import { ExplorerProfile } from '@/components/profile/ExplorerProfile';
import { Header } from '@/components/layout/Header';

interface ExplorerDashboardProps {
  type: 'advanced' | 'beginner';
}

export const ExplorerDashboard = ({ type }: ExplorerDashboardProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
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
    switch (activeTab) {
      case 'profile':
        return <ExplorerProfile type={type} />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isAdvanced ? '🧭 Advanced Explorer Dashboard' : '🌟 Explorer Dashboard'}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {isAdvanced 
                  ? 'Discover hidden gems and plan advanced adventures'
                  : 'Start your journey with guided exploration and popular destinations'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className={isAdvanced ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {isAdvanced ? '🗺️ Advanced Planning Tools' : '📍 Popular Destinations'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    {isAdvanced 
                      ? 'Access powerful tools for complex trip planning'
                      : 'Explore safe and popular travel destinations'
                    }
                  </p>
                  <Button size="lg" className={`w-full text-lg py-4 ${isAdvanced ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}>
                    {isAdvanced ? '🧭 Advanced Tools' : '🌟 Explore Now'}
                  </Button>
                </CardContent>
              </Card>

              <Card className={isAdvanced ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'}>
                <CardHeader>
                  <CardTitle className="text-2xl">💬 Travel Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">Get personalized travel recommendations</p>
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-4 bg-purple-600 hover:bg-purple-700"
                    onClick={() => setShowChatBot(true)}
                  >
                    💬 Chat Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isAdvanced ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : 'bg-gradient-to-br from-green-50 to-emerald-50'}`}>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className={`bg-white rounded-lg shadow-sm mb-8 p-4 border-2 ${isAdvanced ? 'border-blue-200' : 'border-green-200'}`}>
          <div className="flex flex-wrap gap-4">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
              size="lg"
              className={`text-lg px-6 ${isAdvanced ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              🏠 Dashboard
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              size="lg"
              className={`text-lg px-6 ${isAdvanced ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              👤 My Profile
            </Button>
          </div>
        </div>

        {/* Content */}
        {renderContent()}

        {/* ChatBot Modal */}
        {showChatBot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">Travel Assistant</h2>
                <Button variant="outline" onClick={() => setShowChatBot(false)}>
                  ✕ Close
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