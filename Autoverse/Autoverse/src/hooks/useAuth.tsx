import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface LocalUser {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
}

interface AuthContextType {
  user: LocalUser | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'nexusbot_users';
const SESSION_STORAGE_KEY = 'nexusbot_session';

interface StoredUser extends LocalUser {
  passwordHash: string;
}

const hashPassword = (password: string): string => {
  // Simple hash for demo - in production use bcrypt via backend
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

const getStoredUsers = (): StoredUser[] => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: StoredUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getSession = (): LocalUser | null => {
  const stored = localStorage.getItem(SESSION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

const saveSession = (user: LocalUser | null) => {
  if (user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const existingSession = getSession();
    if (existingSession) {
      setUser(existingSession);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName?: string): Promise<{ error: Error | null }> => {
    const users = getStoredUsers();
    
    // Check if user already exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: new Error('User already registered with this email') };
    }

    const newUser: StoredUser = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      fullName: fullName || '',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    const sessionUser: LocalUser = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      createdAt: newUser.createdAt,
    };

    saveSession(sessionUser);
    setUser(sessionUser);

    return { error: null };
  };

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { error: new Error('Invalid login credentials') };
    }

    if (user.passwordHash !== hashPassword(password)) {
      return { error: new Error('Invalid login credentials') };
    }

    const sessionUser: LocalUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };

    saveSession(sessionUser);
    setUser(sessionUser);

    return { error: null };
  };

  const signOut = async () => {
    saveSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
