
import { useContext, createContext } from 'react';

export const NoteContext = createContext(Object);
export const useNotes = () => useContext(NoteContext);