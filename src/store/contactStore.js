import { create } from 'zustand';

export const ContactStore = create((set) => ({
    contacts: [],
    setContacts: (contacts) => set({ contacts }),
    selectedContactId: null,
    setSelectedContactId: (id) => set({ selectedContactId: id }),
}));
