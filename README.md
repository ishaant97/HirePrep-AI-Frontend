# HirePrep AI - AI-Powered Career Assistance Platform

An intelligent career assistance platform built with React and Vite that helps users prepare for job interviews, optimize resumes, and advance their careers using AI technology.

## 🚀 Features

- **AI Chat Assistant** - Get personalized career advice and interview preparation help
- **Resume Upload & Analysis** - Upload your resume for AI-powered feedback and optimization
- **User Authentication** - Secure login and signup functionality
- **Interactive Dashboard** - Centralized hub for all career preparation tools
- **User Profiles** - Manage your career information and preferences

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+ with JSX
- **Build Tool:** Vite
- **Routing:** React Router (protected routes implementation)
- **HTTP Client:** Axios
- **Styling:** CSS
- **Animations:** Lottie animations
- **Linting:** ESLint

## 📁 Project Structure

```
src/
├── api/
│   └── axios.js          # Axios instance configuration
├── assets/
│   └── animations/       # Lottie animation files
├── components/
│   ├── 404/              # Error page component
│   ├── Auth/             # Authentication (Login, Signup)
│   ├── Dashboard/        # Main dashboard with AI Chat, Navbar, Sidebar
│   ├── Profile/          # User profile management
│   └── ResumeUpload/     # Resume upload functionality
├── context/
│   └── AuthContext.jsx   # Authentication state management
├── routes/
│   ├── AppRouter.jsx     # Main application router
│   └── ProtectedRoutes.jsx # Route protection for authenticated users
├── App.jsx               # Root application component
└── main.jsx              # Application entry point
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ishaant97/HirePrep-AI-Frontend
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint for code quality |

## 🔐 Authentication

The application uses a context-based authentication system via [`AuthContext`](src/context/AuthContext.jsx). Protected routes are handled by [`ProtectedRoutes`](src/routes/ProtectedRoutes.jsx) to ensure only authenticated users can access certain features.

## 🎨 UI Components

- **Dashboard:** Central hub with [`Navbar`](src/components/Dashboard/Navbar.jsx), [`Sidebar`](src/components/Dashboard/Sidebar.jsx), and [`AIChat`](src/components/Dashboard/AIChat.jsx)
- **Authentication:** [`Login`](src/components/Auth/Login.jsx) and [`Signup`](src/components/Auth/Signup.jsx) components
- **Error Handling:** Custom [`ErrorPage`](src/components/404/ErrorPage.jsx) with Lottie animations

## 🔧 Configuration

- **Vite Config:** [vite.config.js](vite.config.js)
- **ESLint Config:** [eslint.config.js](eslint.config.js)
- **API Configuration:** [src/api/axios.js](src/api/axios.js)

## 📄 License

This project is part of a Semester 8 engineering project.

---

Made with ❤️ for career advancement