
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Send, Mic, MicOff, MapPin, Calendar, Clock, LogOut, Menu } from 'lucide-react';

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
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiResponses = [
    "Bună! Sunt Sofia, asistentul tău AI pentru planificarea călătoriilor. Să începem cu ceva simplu - unde ai vrea să călătorești?",
    "Excelentă alegere! {destination} este o destinație minunată. Ce tip de vacanță îți dorești - aventură, relaxare, cultură sau poate o combinație?",
    "Perfect! Pentru o vacanță de {type}, am câteva sugestii grozave. Care este bugetul tău aproximativ pentru această călătorie?",
    "Înțeleg, buget de {budget}. Acum să vorbim despre durata - câte zile plănuiești să petreci în {destination}?",
    "Minunat! {days} zile sunt suficiente pentru o experiență memorabilă. Îmi permiti să îți creez un itinerar personalizat?",
  ];

  const predefinedItinerary = {
    destination: "Barcelona",
    days: 5,
    budget: "€1500",
    type: "cultură și relaxare",
    schedule: [
      {
        day: 1,
        date: "Luni, 15 Ianuarie",
        activities: [
          { time: "09:00", activity: "Check-in Hotel Casa Fuster", location: "Gràcia", type: "hotel" },
          { time: "11:00", activity: "Plimbare prin Park Güell", location: "Gràcia", type: "attraction" },
          { time: "14:00", activity: "Prânz la Can Vallés", location: "Gràcia", type: "restaurant" },
          { time: "16:00", activity: "Explorare Sagrada Família", location: "Eixample", type: "attraction" },
          { time: "19:00", activity: "Cină la Disfrutar", location: "Eixample", type: "restaurant" }
        ]
      },
      {
        day: 2,
        date: "Marți, 16 Ianuarie",
        activities: [
          { time: "10:00", activity: "Vizită Muzeu Picasso", location: "El Born", type: "museum" },
          { time: "13:00", activity: "Prânz la El Xampanyet", location: "El Born", type: "restaurant" },
          { time: "15:00", activity: "Plimbare prin Barrio Gótico", location: "Ciutat Vella", type: "walking" },
          { time: "17:00", activity: "Catedralei Barcelona", location: "Ciutat Vella", type: "attraction" },
          { time: "20:00", activity: "Cină la Can Culleretes", location: "Ciutat Vella", type: "restaurant" }
        ]
      }
    ]
  };

  useEffect(() => {
    const userData = localStorage.getItem('trajecta_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Add initial AI message
    setTimeout(() => {
      addMessage(aiResponses[0], false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    const userMessage = inputMessage;
    addMessage(userMessage, true);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      setIsTyping(false);
      handleAIResponse(userMessage);
    }, 1500);
  };

  const handleAIResponse = (userMessage: string) => {
    const nextStep = currentStep + 1;
    
    if (nextStep < aiResponses.length) {
      let response = aiResponses[nextStep];
      
      // Replace placeholders with user data
      response = response.replace('{destination}', extractDestination(userMessage) || 'Barcelona');
      response = response.replace('{type}', extractType(userMessage) || 'cultură');
      response = response.replace('{budget}', extractBudget(userMessage) || '€1500');
      response = response.replace('{days}', extractDays(userMessage) || '5');
      
      addMessage(response, false);
      setCurrentStep(nextStep);
    } else {
      // Generate final itinerary
      addMessage("Perfect! Am creat itinerariul tău personalizat pentru Barcelona. Iată programul detaliat:", false);
      
      setTimeout(() => {
        addMessage("", false, predefinedItinerary);
      }, 1000);
    }
  };

  const extractDestination = (message: string): string | null => {
    const destinations = ['barcelona', 'paris', 'roma', 'amsterdam', 'praga', 'viena', 'londra'];
    const found = destinations.find(dest => message.toLowerCase().includes(dest));
    return found ? found.charAt(0).toUpperCase() + found.slice(1) : null;
  };

  const extractType = (message: string): string | null => {
    if (message.toLowerCase().includes('aventur')) return 'aventură';
    if (message.toLowerCase().includes('relaxar') || message.toLowerCase().includes('odihn')) return 'relaxare';
    if (message.toLowerCase().includes('cultur')) return 'cultură';
    return null;
  };

  const extractBudget = (message: string): string | null => {
    const budgetMatch = message.match(/(\d+)/);
    return budgetMatch ? `€${budgetMatch[1]}` : null;
  };

  const extractDays = (message: string): string | null => {
    const daysMatch = message.match(/(\d+)/);
    return daysMatch ? daysMatch[1] : null;
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Chat Active",
        description: "Poți vorbi acum cu Sofia!"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('trajecta_user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trajecta
              </h1>
              <div className="ml-4 text-sm text-gray-600">
                Bună, {user.full_name}!
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/map')}
                className="text-blue-600"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Vezi Harta
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sofia - AI Travel Assistant</h3>
                    <p className="text-sm text-gray-600">Online acum</p>
                  </div>
                </div>
              </div>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {message.text && <p>{message.text}</p>}
                        
                        {/* Render itinerary if present */}
                        {message.data && (
                          <div className="mt-3 p-3 bg-white rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2">
                              Itinerariul tău pentru {message.data.destination}
                            </h4>
                            <div className="text-sm text-gray-600 mb-3">
                              {message.data.days} zile • {message.data.budget} • {message.data.type}
                            </div>
                            
                            {message.data.schedule.map((day: any) => (
                              <div key={day.day} className="mb-4 border-l-2 border-blue-200 pl-3">
                                <h5 className="font-semibold text-gray-800">
                                  Ziua {day.day} - {day.date}
                                </h5>
                                <div className="space-y-2 mt-2">
                                  {day.activities.map((activity: any, idx: number) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm">
                                      <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                                      <div>
                                        <span className="font-medium">{activity.time}</span> - 
                                        <span className="ml-1">{activity.activity}</span>
                                        <div className="text-gray-500">{activity.location}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            
                            <Button 
                              className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500"
                              onClick={() => navigate('/map')}
                            >
                              Vezi pe hartă
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString('ro-RO', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Scrie mesajul tău aici..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={toggleVoice}
                    variant={isListening ? "default" : "outline"}
                    size="icon"
                    className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Călătoriile tale</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Ultima călătorie: Niciuna</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Destinații vizitate: 0</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Istoricul călătoriilor
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Sugestii rapide</h3>
                <div className="space-y-2">
                  {['Barcelona', 'Paris', 'Roma', 'Amsterdam'].map((city) => (
                    <Button
                      key={city}
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => {
                        setInputMessage(`Vreau să merg în ${city}`);
                      }}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {city}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">💡 Sfat AI</h3>
                <p className="text-sm text-gray-700">
                  Fii cât mai specific cu preferințele tale pentru cele mai bune recomandări!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
