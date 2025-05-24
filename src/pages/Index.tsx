import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { LoginModal } from "@/components/auth/LoginModal";
import { RegisterModal } from "@/components/auth/RegisterModal";
import { ProfileQuiz } from "@/components/quiz/ProfileQuiz";
import { PathRecommendation } from "@/components/quiz/PathRecommendation";
import { UserPath } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
        navigateToDashboard(user.userPath.type);
      } else if (user.profileCompleted) {
        // User has completed profile but no path selected, show manual selection
        setShowManualSelection(true);
      } else {
        // User not completed profile, show quiz
        setShowQuiz(true);
      }
    }
  }, [user]);

  const handleGetStarted = () => {
    if (user) {
      // User is logged in, start quiz or go to dashboard
      if (!user.profileCompleted) {
        setShowQuiz(true);
      } else {
        navigateToDashboard(user.userPath?.type);
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
  };

  const handleAcceptRecommendation = () => {
    setPathSelected(true);
    setQuizCompleted(false);
    navigateToDashboard();
  };

  const handleTryAllPaths = () => {
    setQuizCompleted(false);
    setShowManualSelection(true);
  };

  const handleChooseManually = () => {
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