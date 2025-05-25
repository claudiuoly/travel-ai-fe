import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Send, Mic, MicOff, LogOut, MapPin, Calendar, DollarSign, Users, Plane } from 'lucide-react';
import { getUser, logout, isAuthenticated } from '@/lib/auth';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  data?: any;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bună! Sunt asistentul tău AI pentru planificarea călătoriilor. Cum te pot ajuta astăzi?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = getUser();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    scrollToBottom();
  }, [messages, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isUser: boolean, data?: any) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser,
      timestamp: new Date(),
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    addMessage(inputMessage, true);
    
    // Simulate AI response
    setTimeout(() => {
      handleAIResponse(inputMessage);
    }, 1000);

    setInputMessage('');
  };

  const handleAIResponse = (userMessage: string) => {
    const destination = extractDestination(userMessage);
    const type = extractType(userMessage);
    const budget = extractBudget(userMessage);
    const days = extractDays(userMessage);

    if (destination || type || budget || days) {
      const response = `Excelent! Am înțeles că vrei să vizitezi ${destination || 'o destinație'} pentru ${type || 'o călătorie'}${budget ? ` cu un buget de ${budget}` : ''}${days ? ` pentru ${days} zile` : ''}. Îți voi pregăti câteva sugestii personalizate!`;
      
      addMessage(response, false, {
        destination,
        type,
        budget,
        days,
        suggestions: [
          { name: "Hotel Central Plaza", type: "Cazare", rating: 4.5, price: "150€/noapte" },
          { name: "Tur ghidat în centrul istoric", type: "Activitate", rating: 4.8, price: "25€/persoană" },
          { name: "Restaurant La Piazza", type: "Restaurant", rating: 4.6, price: "30€/persoană" }
        ]
      });
    } else {
      const responses = [
        "Îmi poți spune unde ai vrea să călătorești?",
        "Ce tip de călătorie preferi? Relaxare, aventură, cultură?",
        "Care este bugetul tău aproximativ pentru această călătorie?",
        "Pentru câte zile plănuiești să călătorești?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, false);
    }
  };

  const extractDestination = (message: string): string | null => {
    const destinations = ['Paris', 'Roma', 'Barcelona', 'Amsterdam', 'Praga', 'Viena', 'Budapesta'];
    return destinations.find(dest => message.toLowerCase().includes(dest.toLowerCase())) || null;
  };

  const extractType = (message: string): string | null => {
    if (message.toLowerCase().includes('relaxare')) return 'relaxare';
    if (message.toLowerCase().includes('aventură')) return 'aventură';
    if (message.toLowerCase().includes('cultură')) return 'cultură';
    return null;
  };

  const extractBudget = (message: string): string | null => {
    const budgetMatch = message.match(/(\d+)\s*(euro|eur|€)/i);
    return budgetMatch ? `${budgetMatch[1]}€` : null;
  };

  const extractDays = (message: string): string | null => {
    const daysMatch = message.match(/(\d+)\s*(zile|zi)/i);
    return daysMatch ? daysMatch[1] : null;
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      toast({
        title: "Funcție în dezvoltare",
        description: "Recunoașterea vocală va fi disponibilă în curând!"
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Deconectare reușită",
      description: "La revedere!"
    });
    navigate('/');
  };

  if (!user) {
    return null; // This shouldn't happen due to the useEffect check, but just in case
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trajecta
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                AI Assistant
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {user.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Călătoriile tale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Paris, Franța</p>
                    <p className="text-xs text-gray-500">15-20 Mai 2024</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Roma, Italia</p>
                    <p className="text-xs text-gray-500">Planificat</p>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Plane className="w-4 h-4 mr-2" />
                  Planifică călătorie nouă
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Statistici</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Destinații vizitate</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Economii totale</span>
                  </div>
                  <span className="font-semibold">€2,450</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Călătorii în grup</span>
                  </div>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Asistent AI pentru Călătorii</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Online
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        {message.data?.suggestions && (
                          <div className="mt-3 space-y-2">
                            {message.data.suggestions.map((suggestion: any, index: number) => (
                              <div key={index} className="bg-white/20 p-2 rounded text-xs">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">{suggestion.name}</span>
                                  <span className="text-yellow-300">★ {suggestion.rating}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span>{suggestion.type}</span>
                                  <span className="font-medium">{suggestion.price}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('ro-RO', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Întreabă-mă orice despre călătoria ta..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={toggleVoice}
                    variant={isVoiceActive ? "default" : "outline"}
                    size="icon"
                  >
                    {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
