
import { useContext, createContext } from 'react';

export const NoteContext = createContext(Object);
export const ThemeContext = createContext(Object);
export const UserContext = createContext(Object);
export const APISContext = createContext(Object);
export const useTheme = () => useContext(ThemeContext);
export const abuseUser = () => useContext(UserContext);
export const useNotes = () => useContext(NoteContext);
export const useAPIS = () => useContext(APISContext);