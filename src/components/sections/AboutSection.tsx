import { useState } from 'react';
import { Brain, Target, Globe, Zap, Shield, Award, X } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface AboutSectionProps {
    onGetStarted?: () => void;
}

export const AboutSection = ({ onGetStarted }: AboutSectionProps) => {
    const [showAppPopup, setShowAppPopup] = useState(false);
    const { t } = useTranslation();

    const features = [
        {
            icon: <Brain className="w-8 h-8 text-white" />,
            emoji: '🧠',
            title: t('about.features.ai.title'),
            description: t('about.features.ai.description'),
            gradient: 'from-blue-500 to-purple-600',
            delay: 'delay-100'
        },
        {
            icon: <Target className="w-8 h-8 text-white" />,
            emoji: '🎯',
            title: t('about.features.personalization.title'),
            description: t('about.features.personalization.description'),
            gradient: 'from-green-500 to-teal-600',
            delay: 'delay-200'
        },
        {
            icon: <Globe className="w-8 h-8 text-white" />,
            emoji: '🌍',
            title: t('about.features.destinations.title'),
            description: t('about.features.destinations.description'),
            gradient: 'from-orange-500 to-red-600',
            delay: 'delay-300'
        },
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            emoji: '⚡',
            title: t('about.features.planning.title'),
            description: t('about.features.planning.description'),
            gradient: 'from-yellow-500 to-orange-500',
            delay: 'delay-400'
        },
        {
            icon: <Shield className="w-8 h-8 text-white" />,
            emoji: '🛡️',
            title: t('about.features.safety.title'),
            description: t('about.features.safety.description'),
            gradient: 'from-emerald-500 to-green-600',
            delay: 'delay-500'
        },
        {
            icon: <Award className="w-8 h-8 text-white" />,
            emoji: '🏆',
            title: t('about.features.premium.title'),
            description: t('about.features.premium.description'),
            gradient: 'from-indigo-500 to-purple-600',
            delay: 'delay-600'
        }
    ];

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-teal-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        {t('about.badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        {t('about.title')}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600">
                            {t('about.titleHighlight')}
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        {t('about.subtitle')}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className={`group animate-fadeInUp ${feature.delay} h-full`}>
                            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 h-full flex flex-col">
                                {/* Icon container */}
                                <div className="relative mb-6">
                                    <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 text-3xl group-hover:scale-125 transition-transform duration-300">
                                        {feature.emoji}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 text-center leading-relaxed flex-grow">
                                    {feature.description}
                                </p>

                                {/* Hover effect line */}
                                <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 rounded-3xl p-12 text-white relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2225%22%20cy%3D%2225%22%20r%3D%222%22/%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                {t('about.cta.title')}
                            </h3>
                            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                                {t('about.cta.subtitle')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={onGetStarted}
                                    className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    {t('about.cta.startNow')}
                                </button>
                                <button 
                                    onClick={() => setShowAppPopup(true)}
                                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                                >
                                    {t('about.cta.downloadApp')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* App Download Popup */}
            {showAppPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform animate-slideInUp shadow-2xl">
                        <div className="text-center">
                            {/* Close button */}
                            <button
                                onClick={() => setShowAppPopup(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Icon */}
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">📱</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {t('about.appPopup.title')}
                            </h3>

                            {/* Message */}
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {t('about.appPopup.message')}
                                <br />
                                <span className="text-sm">{t('about.appPopup.submessage')}</span>
                            </p>

                            {/* Progress indicator */}
                            <div className="mb-6">
                                <div className="bg-gray-200 rounded-full h-2 mb-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-3/4 animate-pulse"></div>
                                </div>
                                <p className="text-sm text-gray-500">{t('about.appPopup.progress')}</p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowAppPopup(false)}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    {t('about.appPopup.waitButton')}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAppPopup(false);
                                        onGetStarted?.();
                                    }}
                                    className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-300"
                                >
                                    {t('about.appPopup.webButton')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};