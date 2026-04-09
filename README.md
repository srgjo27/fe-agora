# Agora 🏛️

Agora is a modern, high-performance community platform designed for meaningful conversations. Built with the latest web technologies, it provides a seamless and engaging experience for users to connect, share ideas, and build communities.

## ✨ Key Features

- **Dynamic Forum**: Create threads, engage in discussions, and interact with community members in real-time.
- **User Dashboard**: Personalized experience for managing posts, profiles, and activities.
- **Secure Authentication**: Robust login and registration system using Redux for state persistence.
- **Premium Design**: A sophisticated light theme (Slate/White/Blue) with smooth animations and responsive layouts.
- **Real-time Interactions**: Fast and reactive UI built on React 19 and Next.js 16.

## 🚀 Tech Stack

- **Core**: [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Utilities**: `date-fns`, `clsx`, `tailwind-merge`

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd fe-agora
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update the values in .env as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and feature-specific modules.
- `src/store`: Redux state management configuration and slices.
- `src/services`: API service layers and external integrations.
- `src/hooks`: Custom React hooks for shared logic.
- `src/types`: TypeScript definitions and interfaces.
- `src/utils`: Helper functions and utility constants.
