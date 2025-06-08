'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContactCard from '@/components/ContactCard';
import Spinner from '@/components/Spinner';
import AZSidebar from '@/components/AZSidebar';
import { ContactStore } from '@/store/contactStore';
import ContactDetailPanel from '@/components/ContactDetailPanel';

export default function HomePage() {
    const contacts = ContactStore((state) => state.contacts);
    const setContacts = ContactStore((state) => state.setContacts);
    const setSelectedContactId = ContactStore((state) => state.setSelectedContactId);

    const [loading, setLoading] = useState(contacts.length === 0);
    const [searchQuery, setSearchQuery] = useState('');

    // get data
    useEffect(() => {
        if (contacts.length > 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const fetchData = async () => {
            const start = Date.now();
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            setContacts(data);

            const elapsed = Date.now() - start;
            const delay = Math.max(300 - elapsed, 0);
            setTimeout(() => {
                setLoading(false);
            }, delay);
        };

        fetchData();
    }, [contacts, setContacts]);

    if (loading) return <Spinner />;

    // filter
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedContacts = {};
    filteredContacts.forEach((contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        const letter = /[A-Z]/.test(firstLetter) ? firstLetter : '#';
        if (!groupedContacts[letter]) {
            groupedContacts[letter] = [];
        }
        groupedContacts[letter].push(contact);
    });

    const fullLetters = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), '#'];

    return (
        <main className="flex flex-col md:flex-row h-screen">
            {/* left view */}
            <div className="relative md:w-1/3 p-4 overflow-y-auto bg-[#FAFAFA]">
                <AZSidebar letters={fullLetters} />

                <h1 className="text-2xl font-bold text-[#AD2F4F] mb-4"> Contacts</h1>

                <input
                    type="text"
                    placeholder="Search contacts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#AD2F4F]"
                />

                {fullLetters.map((letter) => {
                    const sectionContacts = groupedContacts[letter] || [];
                    if (sectionContacts.length === 0) return null;

                    return (
                        <div key={letter} className="mb-6">
                            <h2
                                id={`section-${letter}`}
                                className="text-xs font-bold text-[#AD2F4F] uppercase px-2 py-1 bg-transparent mb-2 tracking-wide"
                            >
                                {letter}
                            </h2>

                            {sectionContacts.map((contact) => (
                                <div key={contact.id} className="mb-2 pr-4">
                                    {/* Link jump on phone */}
                                    <Link href={`/contacts/${contact.id}`} className="block md:hidden">
                                        <ContactCard contact={contact} />
                                    </Link>

                                    {/* show on the right hand side if it's tablet or laptop */}
                                    <div
                                        className="hidden md:block"
                                        onClick={() => setSelectedContactId(contact.id)}
                                    >
                                        <ContactCard contact={contact} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* right view */}
            <div className="hidden md:block md:w-2/3 border-l">
                <ContactDetailPanel />
            </div>
        </main>
    );
}
