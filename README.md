# 🌍 Trajecta - Călătorii Personalizate

<div align="center">

![Trajecta Logo](https://img.shields.io/badge/🌍-Trajecta-blue?style=for-the-badge&logoColor=white)

**O aplicație de călătorii personalizată care se adaptează perfect stilului tău de viață**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)


</div>

---

## 🚀 Despre Trajecta

Trajecta este prima aplicație de călătorii care își adaptează complet interfața și funcționalitățile în funcție de personalitatea și experiența utilizatorului. Nu mai există o soluție universală - fiecare călător primește o experiență unică, personalizată perfect pentru nevoile sale.

### 🎯 Misiunea Noastră

Să transformăm modul în care oamenii planifică și trăiesc călătoriile, oferind fiecărui utilizator exact ceea ce are nevoie pentru aventura perfectă.

---

## ✨ Caracteristici Principale

### 🧠 **Inteligență Artificială Avansată**
- Algoritm de analiză a personalității
- Recomandări personalizate bazate pe preferințe
- Învățare continuă din comportamentul utilizatorului

### 🎮 **4 Căi Personalizate de Utilizare**

| 🎮 **Gamer Path** | 🧭 **Explorer Advanced** | 🌟 **Explorer Beginner** | 👴 **Senior-Friendly** |
|-------------------|---------------------------|---------------------------|-------------------------|
| Dark theme cu elemente neon | Instrumente avansate de planificare | Interfață curată și simplă | Design cu fonturi mari |
| Sistem XP și achievements | Filtre multiple și căutare complexă | Ghidare pas cu pas | Butoane mari și intuitive |
| Leaderboards și competiții | Hidden gems și destinații rare | Destinații populare și sigure | Suport telefonic 24/7 |
| Gamificare completă | Community forums | Tutorial interactiv | Accesibilitate optimizată |

### 🌍 **Funcționalități Avansate**
- **Profil Personalizat**: Creează-ți profilul cu amintiri de călătorie
- **Upload Fotografii**: Păstrează toate amintirile într-un loc sigur
- **Chatbot Multilingv**: Asistent virtual în 6 limbi
- **Planificare Inteligentă**: Itinerarii generate automat
- **Verificare Siguranță**: Toate destinațiile și partenerii verificați

---

## 🛠️ Tehnologii Folosite

### Frontend
- **React 18** cu TypeScript pentru performanță maximă
- **Vite** pentru development rapid și build optimizat
- **Tailwind CSS** pentru styling modern și responsive
- **Shadcn/ui** pentru componente UI elegante
- **Lucide React** pentru iconuri consistente

### State Management & API
- **React Query** pentru cache-ul datelor și request-uri
- **React Hook Form** pentru gestionarea formularelor
- **React Router** pentru navigare
- **Zod** pentru validarea datelor

### Development Tools
- **ESLint** pentru calitatea codului
- **TypeScript** pentru type safety
- **PostCSS** pentru procesarea CSS-ului
- **Autoprefixer** pentru compatibilitate cross-browser

---

## 🚀 Instalare și Rulare

### Cerințe de Sistem
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 sau **yarn** >= 1.22.0
- **Git** pentru clonarea repository-ului

### Pași de Instalare

1. **Clonează repository-ul**
```bash
git clone https://github.com/claudiuoly/travel-ai-fe.git
cd trajecta
```

2. **Instalează dependințele**
```bash
npm install
```

3. **Pornește serverul de development**
```bash
npm run dev
```

4. **Deschide aplicația**
```
http://localhost:8080
```

### 📦 Scripts Disponibile

```bash
npm run dev          # Pornește serverul de development
npm run build        # Creează build-ul pentru producție
npm run build:dev    # Creează build-ul pentru development
npm run preview      # Preview build-ul local
npm run lint         # Rulează ESLint pentru verificarea codului
```

---

## 📁 Structura Proiectului

```
trajecta/
├── public/                 # Fișiere statice
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/        # Componente React reutilizabile
│   │   ├── auth/         # Componente pentru autentificare
│   │   ├── chat/         # Chatbot și messaging
│   │   ├── layout/       # Layout și navigare
│   │   ├── profile/      # Gestionarea profilului
│   │   ├── quiz/         # Sistemul de quiz pentru personalizare
│   │   ├── sections/     # Secțiuni ale paginii principale
│   │   └── ui/           # Componente UI de bază (shadcn/ui)
│   ├── contexts/         # React Context pentru state management
│   ├── data/            # Date statice și configurări
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilitare și funcții helper
│   ├── pages/           # Pagini principale ale aplicației
│   ├── types/           # Definițiile TypeScript
│   └── index.css        # Stiluri globale și animații
├── package.json
├── tailwind.config.ts   # Configurația Tailwind CSS
├── tsconfig.json        # Configurația TypeScript
└── vite.config.ts       # Configurația Vite
```

---

## 🎨 Design System

### Culori Principale
- **Primary**: Blue (`#3B82F6`) → Purple (`#8B5CF6`) → Orange (`#F97316`)
- **Secondary**: Green (`#10B981`) → Teal (`#14B8A6`)
- **Accent**: Yellow (`#F59E0B`) → Red (`#EF4444`)

### Tipografie
- **Headings**: Inter, system-ui
- **Body**: Inter, -apple-system, sans-serif
- **Code**: Fira Code, monospace

### Animații
- **Fade In Up**: Pentru loading-ul secțiunilor
- **Slide In**: Pentru tranziții laterale
- **Glow Effects**: Pentru elementele interactive
- **Gradient Animations**: Pentru butoanele principale

---

## 🧪 Testing

```bash
# Rulează toate testele
npm run test

# Rulează testele în watch mode
npm run test:watch

# Generează coverage report
npm run test:coverage
```

---

## 🚀 Deployment

### Vercel (Recomandat)
1. Conectează repository-ul la Vercel
2. Configurează variabilele de mediu
3. Deploy automat la fiecare push

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Configurează redirects pentru SPA

### Manual Build
```bash
npm run build
# Fișierele vor fi generate în folder-ul 'dist/'
```

---

## 🤝 Contribuții

Contributions sunt binevenite! Te rugăm să urmezi acești pași:

1. **Fork** repository-ul
2. **Creează** o branch nouă (`git checkout -b feature/amazing-feature`)
3. **Commit** modificările (`git commit -m 'Add some amazing feature'`)
4. **Push** pe branch (`git push origin feature/amazing-feature`)
5. **Deschide** un Pull Request

### 📋 Guidelines pentru Contribuții
- Respectă structura de cod existentă
- Adaugă comentarii pentru logica complexă
- Testează toate modificările
- Actualizează documentația dacă e necesar

---

## 📋 Roadmap

### 🔄 În Dezvoltare (Q1 2024)
- [ ] **Aplicație mobilă** (React Native)
- [ ] **Integrare plăți** (Stripe, PayPal)
- [ ] **Sistem de rezervări** în timp real
- [ ] **Notificări push** personalizate

### 🎯 Planificat (Q2 2024)
- [ ] **Integrări sociale** (Facebook, Instagram)
- [ ] **Planificare colaborativă** (group trips)
- [ ] **Realitate augmentată** pentru explorare
- [ ] **Chatbot cu AI** avansat (GPT-4)

### 🚀 Viitor (Q3-Q4 2024)
- [ ] **Marketplace pentru experiențe** locale
- [ ] **Blockchain rewards** system
- [ ] **Voice navigation** completă
- [ ] **Offline mode** pentru călătorii

---

## 📄 Licență

Acest proiect este licențiat sub **MIT License** - vezi fișierul [LICENSE](LICENSE) pentru detalii.

---

## 📞 Contact & Suport

<div align="center">

### 💬 Ai întrebări? Suntem aici pentru tine!

📧 **Email**: [contact@trajecta.ro](mailto:contact@trajecta.ro)
📞 **Telefon**: +40752 619 969
🌐 **Website**: [www.trajecta.ro](https://trajecta.ro)
📍 **Adresa**: București, România

### 🌟 Urmărește-ne
</div>

---

<div align="center">

**Făcut cu ❤️ în România pentru călătorii din întreaga lume**

*Trajecta - Unde fiecare călătorie începe cu tine*

</div>
