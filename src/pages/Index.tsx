import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LoginModal } from "@/components/auth/LoginModal";
import { RegisterModal } from "@/components/auth/RegisterModal";
import { ProfileQuiz } from "@/components/quiz/ProfileQuiz";
import { PathRecommendation } from "@/components/quiz/PathRecommendation";
import { UserPath } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userPath, setUserPath] = useState<UserPath | null>(null);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [pathSelected, setPathSelected] = useState(false);

  // Redirect logged in users to their dashboard
  useEffect(() => {
    if (user) {
      if (user.userPath) {
        // User has a path selected, go to dashboard
        navigateToDashboard(user.userPath.type);
      } else if (user.isFirstLogin) {
        // First login - show quiz
        setShowQuiz(true);
      } else {
        // Not first login - skip quiz, show manual selection or go to beginner dashboard
        if (user.profileCompleted) {
          setShowManualSelection(true);
        } else {
          // Default to beginner dashboard if no path selected and not first login
          navigateToDashboard('explorer-beginner');
        }
      }
    }
  }, [user]);

  const handleGetStarted = () => {
    if (user) {
      // User is logged in
      if (user.isFirstLogin) {
        // First login - show quiz
        setShowQuiz(true);
      } else if (user.userPath) {
        // Has path - go to dashboard
        navigateToDashboard(user.userPath.type);
      } else {
        // Not first login and no path - show manual selection
        setShowManualSelection(true);
      }
    } else {
      // User not logged in, show register modal
      setShowRegisterModal(true);
    }
  };

  const navigateToDashboard = (pathType?: string) => {
    if (!pathType && userPath) {
      pathType = userPath.type;
    }

    switch (pathType) {
      case 'gamer':
        navigate('/gamer-dashboard');
        break;
      case 'explorer-advanced':
        navigate('/explorer-advanced-dashboard');
        break;
      case 'explorer-beginner':
        navigate('/explorer-beginner-dashboard');
        break;
      case 'senior-friendly':
        navigate('/senior-dashboard');
        break;
      default:
        // Default to beginner if no path specified
        navigate('/explorer-beginner-dashboard');
    }
  };

  const handleQuizComplete = (userPath: UserPath) => {
    setShowQuiz(false);
    setQuizCompleted(true);
    setUserPath(userPath);
    
    // Don't mark first login as complete yet - do it when user makes a choice
  };

  const handleAcceptRecommendation = () => {
    if (userPath && user) {
      // Update user with selected path and mark first login complete
      const updatedUser = { ...user, userPath, profileCompleted: true, isFirstLogin: false };
      updateUser(updatedUser);
    }
    
    setPathSelected(true);
    setQuizCompleted(false);
    navigateToDashboard();
  };

  const handleTryAllPaths = () => {
    if (user) {
      // Mark profile as completed and first login complete
      const updatedUser = { ...user, profileCompleted: true, isFirstLogin: false };
      updateUser(updatedUser);
    }
    
    setQuizCompleted(false);
    setShowManualSelection(true);
  };

  const handleChooseManually = () => {
    if (user) {
      // Mark profile as completed and first login complete
      const updatedUser = { ...user, profileCompleted: true, isFirstLogin: false };
      updateUser(updatedUser);
    }
    
    setQuizCompleted(false);
    setShowManualSelection(true);
  };

  // Show quiz
  if (showQuiz && !quizCompleted) {
    return <ProfileQuiz onComplete={handleQuizComplete} />;
  }

  // Show recommendation
  if (quizCompleted && userPath && !pathSelected && !showManualSelection) {
    return (
      <PathRecommendation
        userPath={userPath}
        onAccept={handleAcceptRecommendation}
        onTryAll={handleTryAllPaths}
        onChooseManually={handleChooseManually}
      />
    );
  }

  // Show manual selection
  if (showManualSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Alege Calea Ta de Utilizare 🎯
            </h1>
            <p className="text-xl text-gray-600">
              Selectează tipul de experiență care ți se potrivește cel mai bine
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => navigateToDashboard('gamer')}
              className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white font-semibold text-lg flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🎮</span>
              Gamer Path
            </button>
            <button
              onClick={() => navigateToDashboard('explorer-advanced')}
              className="h-32 bg-gradient-to-r from-green-600 to-teal-600 hover:opacity-90 text-white font-semibold text-lg flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🧭</span>
              Explorer Advanced
            </button>
            <button
              onClick={() => navigateToDashboard('explorer-beginner')}
              className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white font-semibold text-lg flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-4xl mb-2">🌟</span>
              Explorer Beginner
            </button>
            <button
              onClick={() => navigateToDashboard('senior-friendly')}
              className="h-32 bg-gradient-to-r from-orange-600 to-red-600 hover:opacity-90 text-white font-semibold text-lg flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-4xl mb-2">👴</span>
              Senior Friendly
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show simplified landing page (only for non-logged users)
  return (
    <div className="min-h-screen bg-white">
      <Header 
        onLoginClick={() => setShowLoginModal(true)} 
        onRegisterClick={() => setShowRegisterModal(true)} 
      />
      
      <HeroSection onGetStarted={handleGetStarted} />
      
      <FeaturesSection />
      
      <AboutSection onGetStarted={handleGetStarted} />
      
      <TestimonialsSection onGetStarted={handleGetStarted} />
      
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-blue-400">🌍 Trajecta</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Descoperă lumea cu aplicația de călătorii personalizată care se adaptează stilului tău de viață.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  📸
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legături Utile</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">Despre</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Caracteristici</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Prețuri</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>📧 contact@trajecta.ro</li>
                <li>📞 +40 123 456 789</li>
                <li>📍 București, România</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Trajecta. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>

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