import { useState, useEffect } from 'react';

export type UserRole = 'student' | 'mentor' | 'parent';

export interface User {
  name: string;
  role: UserRole;
  loginDate: string;
}

const STORAGE_KEY = 'edumentor_user';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, role: UserRole) => {
    const newUser: User = {
      name: name.trim(),
      role,
      loginDate: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return { user, login, logout, isLoading };
};
