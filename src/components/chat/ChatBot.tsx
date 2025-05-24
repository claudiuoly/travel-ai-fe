import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Mic, MicOff, Globe } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
    language: string;
}

const LANGUAGES = [
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Bună ziua! Sunt asistentul dumneavoastră virtual. Cu ce vă pot ajuta astăzi?',
            isUser: false,
            timestamp: new Date(),
            language: 'ro'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('ro');
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const getResponseForLanguage = (userMessage: string, language: string) => {
        const responses = {
            ro: {
                greeting: 'Bună! Cu ce vă pot ajuta?',
                travel: 'Pentru călătorii, vă pot ajuta să găsiți destinații frumoase și sigure.',
                help: 'Sunt aici să vă ajut cu orice întrebări despre călătorii.',
                default: 'Înțeleg. Vă pot ajuta cu planificarea călătoriilor sau răspund la întrebări despre destinații.'
            },
            en: {
                greeting: 'Hello! How can I help you?',
                travel: 'For travel, I can help you find beautiful and safe destinations.',
                help: 'I\'m here to help with any travel questions you have.',
                default: 'I understand. I can help with trip planning or answer questions about destinations.'
            },
            de: {
                greeting: 'Hallo! Wie kann ich Ihnen helfen?',
                travel: 'Für Reisen kann ich Ihnen helfen, schöne und sichere Ziele zu finden.',
                help: 'Ich bin hier, um bei allen Reisefragen zu helfen.',
                default: 'Ich verstehe. Ich kann bei der Reiseplanung helfen oder Fragen zu Zielen beantworten.'
            },
            fr: {
                greeting: 'Bonjour! Comment puis-je vous aider?',
                travel: 'Pour les voyages, je peux vous aider à trouver de belles destinations sûres.',
                help: 'Je suis là pour vous aider avec toutes vos questions de voyage.',
                default: 'Je comprends. Je peux vous aider avec la planification de voyage ou répondre aux questions sur les destinations.'
            },
            es: {
                greeting: '¡Hola! ¿Cómo puedo ayudarle?',
                travel: 'Para viajes, puedo ayudarle a encontrar destinos hermosos y seguros.',
                help: 'Estoy aquí para ayudar con cualquier pregunta sobre viajes.',
                default: 'Entiendo. Puedo ayudar con la planificación de viajes o responder preguntas sobre destinos.'
            },
            it: {
                greeting: 'Ciao! Come posso aiutarla?',
                travel: 'Per i viaggi, posso aiutarla a trovare destinazioni belle e sicure.',
                help: 'Sono qui per aiutare con qualsiasi domanda sui viaggi.',
                default: 'Capisco. Posso aiutare con la pianificazione del viaggio o rispondere a domande sulle destinazioni.'
            }
        };

        const langResponses = responses[language as keyof typeof responses] || responses.ro;

        if (userMessage.toLowerCase().includes('salut') || userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hola')) {
            return langResponses.greeting;
        }
        if (userMessage.toLowerCase().includes('calatorie') || userMessage.toLowerCase().includes('travel') || userMessage.toLowerCase().includes('viaje')) {
            return langResponses.travel;
        }
        if (userMessage.toLowerCase().includes('ajutor') || userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('ayuda')) {
            return langResponses.help;
        }

        return langResponses.default;
    };

    const sendMessage = () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date(),
            language: selectedLanguage
        };

        setMessages(prev => [...prev, userMessage]);

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getResponseForLanguage(inputText, selectedLanguage),
                isUser: false,
                timestamp: new Date(),
                language: selectedLanguage
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);

        setInputText('');
    };

    const startListening = () => {
        setIsListening(true);
        // Simulate voice input
        setTimeout(() => {
            setIsListening(false);
            setInputText('Vreau să călătoresc în Italia');
        }, 2000);
    };

    const changeLanguage = (langCode: string) => {
        setSelectedLanguage(langCode);
        setShowLanguageSelector(false);

        const welcomeMessages = {
            ro: 'Limba a fost schimbată în română. Cu ce vă pot ajuta?',
            en: 'Language changed to English. How can I help you?',
            de: 'Sprache auf Deutsch geändert. Wie kann ich Ihnen helfen?',
            fr: 'Langue changée en français. Comment puis-je vous aider?',
            es: 'Idioma cambiado a español. ¿Cómo puedo ayudarle?',
            it: 'Lingua cambiata in italiano. Come posso aiutarla?'
        };

        const botMessage: Message = {
            id: Date.now().toString(),
            text: welcomeMessages[langCode as keyof typeof welcomeMessages] || welcomeMessages.ro,
            isUser: false,
            timestamp: new Date(),
            language: langCode
        };

        setMessages(prev => [...prev, botMessage]);
    };

    const currentLanguage = LANGUAGES.find(lang => lang.code === selectedLanguage);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        🤖
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Asistent Virtual</h3>
                        <p className="text-sm text-gray-600">Online</p>
                    </div>
                </div>

                <div className="relative">
                    <Button
                        variant="outline"
                        onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                        className="flex items-center space-x-2"
                    >
                        <Globe className="w-4 h-4" />
                        <span>{currentLanguage?.flag}</span>
                        <span>{currentLanguage?.name}</span>
                    </Button>

                    {showLanguageSelector && (
                        <div className="absolute right-0 top-12 bg-white border rounded-lg shadow-lg z-10 min-w-[200px]">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg"
                                >
                                    <span className="text-xl">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <Card className={`max-w-[80%] ${message.isUser ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                            <CardContent className="p-4">
                                <p className="text-lg leading-relaxed">{message.text}</p>
                                <p className={`text-xs mt-2 opacity-70 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {message.timestamp.toLocaleTimeString()}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t p-4">
                <div className="flex space-x-3">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Scrieți mesajul dumneavoastră..."
                            className="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <Button
                        onClick={startListening}
                        variant={isListening ? "destructive" : "outline"}
                        size="lg"
                        className="px-6"
                    >
                        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>

                    <Button onClick={sendMessage} size="lg" className="px-6">
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};