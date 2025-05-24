import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';
import { ProfileQuiz } from '@/components/quiz/ProfileQuiz';
import { PathRecommendation } from '@/components/quiz/PathRecommendation';
import { UserPath } from '@/types/user';

const Index = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showRecommendation, setShowRecommendation] = useState(false);
    const [recommendedPath, setRecommendedPath] = useState<UserPath | null>(null);

    useEffect(() => {
        // If user is logged in but hasn't completed profile, show quiz
        if (user && !user.profileCompleted && !user.userPath) {
            setShowQuiz(true);
        }
    }, [user]);

    const handleGetStarted = () => {
        if (user) {
            if (!user.profileCompleted) {
                setShowQuiz(true);
            } else {
                // Navigate to dashboard based on user path
                navigateToDashboard(user.userPath?.type);
            }
        } else {
            setShowRegisterModal(true);
        }
    };

    const navigateToDashboard = (pathType?: string) => {
        switch (pathType) {
            case 'senior-friendly':
                navigate('/senior-dashboard');
                break;
            case 'gamer':
                navigate('/gamer-dashboard');
                break;
            case 'explorer-advanced':
                navigate('/explorer-advanced-dashboard');
                break;
            case 'explorer-beginner':
                navigate('/explorer-beginner-dashboard');
                break;
            default:
                navigate('/explorer-beginner-dashboard');
        }
    };

    const handleQuizComplete = (userPath: UserPath) => {
        setRecommendedPath(userPath);
        setShowQuiz(false);
        setShowRecommendation(true);
    };

    const handleAcceptRecommendation = () => {
        if (user && recommendedPath) {
            const updatedUser = {
                ...user,
                userPath: recommendedPath,
                profileCompleted: true
            };
            updateUser(updatedUser);
            setShowRecommendation(false);
            navigateToDashboard(recommendedPath.type);
        }
    };

    const handleTryAllPaths = () => {
        setShowRecommendation(false);
        console.log('Navigate to path selection page');
    };

    const handleChooseManually = () => {
        setShowRecommendation(false);
        console.log('Navigate to manual path selection');
    };

    // Show quiz if user is logged in but profile not completed
    if (user && showQuiz && !user.profileCompleted) {
        return <ProfileQuiz onComplete={handleQuizComplete} />;
    }

    // Show recommendation after quiz completion
    if (showRecommendation && recommendedPath) {
        return (
            <PathRecommendation
                userPath={recommendedPath}
                onAccept={handleAcceptRecommendation}
                onTryAll={handleTryAllPaths}
                onChooseManually={handleChooseManually}
            />
        );
    }

    // Show main landing page
    return (
        <div className="min-h-screen bg-white">
            <Header
                onLoginClick={() => setShowLoginModal(true)}
                onRegisterClick={() => setShowRegisterModal(true)}
            />

            <main>
                <HeroSection onGetStarted={handleGetStarted} />
                <AboutSection />
                <FeaturesSection />
                <TestimonialsSection />
            </main>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">🌍 TravelQuest</h3>
                            <p className="text-gray-400">
                                Aplicația de călătorii personalizată care se adaptează stilului tău de viață.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Link-uri Utile</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#about" className="hover:text-white">Despre</a></li>
                                <li><a href="#features" className="hover:text-white">Caracteristici</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                                <li><a href="#" className="hover:text-white">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Suport</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Centru de Ajutor</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Termeni și Condiții</a></li>
                                <li><a href="#" className="hover:text-white">Confidențialitate</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Social Media</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 TravelQuest. Toate drepturile rezervate.</p>
                    </div>
                </div>
            </footer>

            {/* Modals */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSwitchToRegister={() => {
                    setShowLoginModal(false);
                    setShowRegisterModal(true);
                }}
            />

            <RegisterModal
                isOpen={showRegisterModal}
                onClose={() => setShowRegisterModal(false)}
                onSwitchToLogin={() => {
                    setShowRegisterModal(false);
                    setShowLoginModal(true);
                }}
            />
        </div>
    );
};

export default Index;