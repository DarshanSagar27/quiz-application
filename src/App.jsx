import React from 'react';
import { useAuth } from './contexts/AuthContext';
import AuthScreen from './components/auth/AuthScreen';
import Header from './components/layouts/Header';
import Quiz from './components/Quiz';

const App = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <>
          <Header />
          <main className="p-6">
            <Quiz />
          </main>
        </>
      ) : (
        <AuthScreen />
      )}
    </div>
  );
};

export default App;
