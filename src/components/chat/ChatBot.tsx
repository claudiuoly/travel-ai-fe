import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Mic, MicOff, Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

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
    const { t, currentLanguage } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: t('chat.welcomeMessage'),
            isUser: false,
            timestamp: new Date(),
            language: currentLanguage
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
    const [showLanguageSelector, setShowLanguageSelector] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const getResponseForLanguage = (userMessage: string, language: string) => {
        if (userMessage.toLowerCase().includes('salut') || userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hola')) {
            return t('chat.responses.greeting');
        }
        if (userMessage.toLowerCase().includes('calatorie') || userMessage.toLowerCase().includes('travel') || userMessage.toLowerCase().includes('viaje')) {
            return t('chat.responses.travel');
        }
        if (userMessage.toLowerCase().includes('ajutor') || userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('ayuda')) {
            return t('chat.responses.help');
        }

        return t('chat.responses.default');
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

        const botMessage: Message = {
            id: Date.now().toString(),
            text: t(`chat.languageChanged.${langCode}`),
            isUser: false,
            timestamp: new Date(),
            language: langCode
        };

        setMessages(prev => [...prev, botMessage]);
    };

    const currentLang = LANGUAGES.find(lang => lang.code === selectedLanguage);

    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b p-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        🤖
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">{t('chat.title')}</h3>
                        <p className="text-sm text-gray-600">{t('chat.status')}</p>
                    </div>
                </div>

                <div className="relative">
                    <Button
                        variant="outline"
                        onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                        className="flex items-center space-x-2"
                    >
                        <Globe className="w-4 h-4" />
                        <span>{currentLang?.flag}</span>
                        <span>{currentLang?.name}</span>
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
                            placeholder={t('chat.placeholder')}
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