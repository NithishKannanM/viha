import React, { createContext, useContext, useState } from 'react';

export type ThemeVariant = 'maroon' | 'green' | 'logo-green-maroon';

interface ThemeContextValue {
  theme: ThemeVariant;
  setTheme: (t: ThemeVariant) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'maroon',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>('maroon');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
