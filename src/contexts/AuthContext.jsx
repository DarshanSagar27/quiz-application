import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('quizUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('quizUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (registrationNumber, password) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = users.find(
        (u) => u.registrationNumber === registrationNumber && u.password === password
      );

      if (foundUser) {
        const userData = {
          id: foundUser.id,
          registrationNumber: foundUser.registrationNumber,
          name: foundUser.name,
          email: foundUser.email,
        };
        setUser(userData);
        localStorage.setItem('quizUser', JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      if (users.some((u) => u.registrationNumber === userData.registrationNumber)) {
        return false;
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
      };

      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      const userSession = {
        id: newUser.id,
        registrationNumber: newUser.registrationNumber,
        name: newUser.name,
        email: newUser.email,
      };

      setUser(userSession);
      localStorage.setItem('quizUser', JSON.stringify(userSession));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quizUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
