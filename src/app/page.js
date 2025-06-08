'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContactCard from '@/components/ContactCard';
import Spinner from '@/components/Spinner';
import AZSidebar from '@/components/AZSidebar';
import { ContactStore } from '@/store/ContactStore';

export default function HomePage() {
    const contacts = ContactStore((state) => state.contacts);
    const setContacts = ContactStore((state) => state.setContacts);
    const [loading, setLoading] = useState(contacts.length === 0); // ✅ 关键优化 → 避免 flicker
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (contacts.length > 0) {
            setLoading(false); // ✅ 有缓存 → 不显示 loading
            return;
        }

        setLoading(true);
        const fetchData = async () => {
            const start = Date.now();
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();

            // 存到 store
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

    // 搜索过滤联系人
    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 分组
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
        <main className="relative p-4 space-y-4 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-[#FAFAFA] min-h-screen pb-20">
            {/* AZ Sidebar */}
            <AZSidebar letters={fullLetters} />

            {/* Header */}
            <h1 className="text-2xl font-bold text-[#AD2F4F] mb-4">Contacts</h1>

            {/* 搜索框 */}
            <input
                type="text"
                placeholder="Search contacts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-[#AD2F4F]"
            />

            {fullLetters.map((letter) => {
                const sectionContacts = groupedContacts[letter] || [];

                // 没有联系人 → 不渲染 Section
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
                                <Link href={`/contacts/${contact.id}`} className="block">
                                    <ContactCard contact={contact} />
                                </Link>
                            </div>
                        ))}
                    </div>
                );
            })}
        </main>
    );
}
