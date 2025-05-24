import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, User, Gamepad2, Trophy, Settings, Home } from 'lucide-react';
import { ChatBot } from '@/components/chat/ChatBot';
import { GamerProfile } from '@/components/profile/GamerProfile';
import { Header } from '@/components/layout/Header';

export const GamerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showChatBot, setShowChatBot] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <GamerProfile />;
      default:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-purple-100 mb-4">
                🎮 Welcome to the Gamer Zone! 🚀
              </h1>
              <p className="text-xl text-purple-200 mb-8">
                Level up your travel experience with achievements and challenges
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-purple-800 border-purple-600">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-100">🏆 Travel Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-purple-200 mb-4">Unlock badges and level up your travel status</p>
                  <Button size="lg" className="w-full text-lg py-4 bg-purple-600 hover:bg-purple-700">
                    🏆 View Achievements
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-purple-800 border-purple-600">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-100">💬 AI Travel Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-purple-200 mb-4">Chat with our AI-powered travel companion</p>
                  <Button 
                    size="lg" 
                    className="w-full text-lg py-4 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowChatBot(true)}
                  >
                    💬 Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="bg-purple-800 rounded-lg shadow-lg mb-8 p-4 border border-purple-600">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveTab('dashboard')}
              size="lg"
              className="text-lg px-6 bg-purple-600 hover:bg-purple-700 border-purple-500"
            >
              🏠 Dashboard
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              onClick={() => setActiveTab('profile')}
              size="lg"
              className="text-lg px-6 bg-purple-600 hover:bg-purple-700 border-purple-500"
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
            <div className="bg-gray-900 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col border border-purple-600">
              <div className="flex justify-between items-center p-4 border-b border-purple-600">
                <h2 className="text-xl font-semibold text-purple-100">AI Travel Assistant</h2>
                <Button variant="outline" onClick={() => setShowChatBot(false)} className="border-purple-600 text-purple-100">
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