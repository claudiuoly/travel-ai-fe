# Trajecta - AI Travel Planning Platform

<div align="center">
  <img src="public/favicon.svg" alt="Trajecta Logo" width="80" height="80">
  
  **An intelligent AI-powered travel planning platform designed for travel agencies and individual travelers**
  
  [![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-teal.svg)](https://tailwindcss.com/)
</div>

## 🌟 Features

### 🤖 AI-Powered Chat Assistant
- **Intelligent Conversations**: Chat with Trajecta AI for personalized travel recommendations
- **Real-time Responses**: Get instant travel advice and planning assistance
- **Context-Aware**: AI remembers your preferences throughout the conversation

### 🎤 Voice Integration
- **Voice Calls**: Start voice conversations with the AI assistant
- **Real-time Speech**: Speak naturally and get voice responses
- **Visual Feedback**: Live audio visualization and call status indicators
- **Microphone Controls**: Mute/unmute functionality with visual feedback

### 📱 Trip Management
- **Trip Library**: Browse and manage your travel plans
- **Status Tracking**: Organize trips by status (Completed, Planned, Wishlist)
- **Quick Access**: Click any trip to get AI assistance for that destination
- **Trip Statistics**: Track your travel history and savings

### 🔐 Authentication System
- **Secure Login**: User authentication with session management
- **User Profiles**: Personalized experience with user data
- **Protected Routes**: Secure access to dashboard features

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Beautiful Interface**: Modern gradient design with smooth animations
- **Dark/Light Themes**: Adaptive interface design
- **Accessibility**: Built with accessibility best practices

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd travel-ai-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Lucide React** - Beautiful, customizable icons
- **CSS Animations** - Smooth transitions and micro-interactions

### AI & Voice Integration
- **Vapi AI** - Voice AI integration for natural conversations
- **Custom Chat API** - AI-powered text conversations
- **Real-time Audio** - Live voice processing and feedback

### State Management & Routing
- **React Router** - Client-side routing with protected routes
- **React Hooks** - Modern state management with useState, useEffect
- **Context API** - Global state for authentication

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **TypeScript Config** - Strict type checking configuration

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── VoiceCall.tsx   # Voice integration component
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Main dashboard with chat
│   ├── Login.tsx       # Authentication page
│   └── Index.tsx       # Landing page
├── lib/                # Utility libraries
│   ├── auth.ts         # Authentication logic
│   ├── vapi.ts         # Voice AI integration
│   └── utils.ts        # Helper functions
├── hooks/              # Custom React hooks
└── main.tsx           # Application entry point
```

## 🎯 Key Features Explained

### Voice AI Integration
The platform integrates with Vapi AI to provide natural voice conversations:
- Real-time speech recognition
- AI voice responses
- Visual call interface with audio feedback
- Automatic call management

### Trip Planning Intelligence
AI assistant helps with:
- Destination recommendations
- Budget planning
- Itinerary creation
- Local insights and tips
- Cultural information

### User Experience
- **Intuitive Interface**: Clean, modern design that's easy to navigate
- **Responsive Layout**: Optimized for all screen sizes
- **Fast Performance**: Optimized with Vite for quick loading
- **Accessibility**: WCAG compliant design

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_endpoint
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
```

### Voice AI Setup
The application uses Vapi AI for voice integration. Make sure to:
1. Configure your Vapi assistant ID
2. Set up proper voice models
3. Configure microphone permissions

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy to Lovable
1. Open [Lovable Project](https://lovable.dev/projects/e4dcec85-dd2c-4343-99a9-993a00d07ff5)
2. Click on **Share → Publish**
3. Your app will be deployed automatically

### Custom Domain
To connect a custom domain:
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow the setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
