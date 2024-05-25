
import { useContext, createContext } from 'react';

export const NoteContext = createContext(Object);
export const ThemeContext = createContext(Object);
export const useTheme = () => useContext(ThemeContext);
export const useNotes = () => useContext(NoteContext);