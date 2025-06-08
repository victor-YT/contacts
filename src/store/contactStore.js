import { create } from 'zustand';

export const ContactStore = create((set) => ({
    contacts: [],
    setContacts: (contacts) => set({ contacts }),
}));
