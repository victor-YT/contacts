// src/components/ContactDetailPanel.jsx
'use client';

import { useEffect, useState } from 'react';
import { ContactStore } from '@/store/contactStore';
import Spinner from '@/components/Spinner';
import ContactActionButton from '@/components/ContactActionButton';
import InfoCard from '@/components/InfoCard';
import InfoItem from '@/components/InfoItem';
import { FaSms, FaUserCircle, FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaBuilding, FaUser } from 'react-icons/fa';

export default function ContactDetailPanel() {
    const selectedContactId = ContactStore((state) => state.selectedContactId);
    const contacts = ContactStore((state) => state.contacts);
    const initialContact = contacts.find((c) => c.id === Number(selectedContactId));
    const [contact, setContact] = useState(initialContact);

    useEffect(() => {
        if (!selectedContactId) {
            setContact(null);
            return;
        }

        if (contact && contact.id === Number(selectedContactId)) return;

        const fetchSingleContact = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedContactId}`);
            const data = await res.json();
            setContact(data);
        };

        if (!initialContact) {
            fetchSingleContact();
        } else {
            setContact(initialContact);
        }
    }, [selectedContactId, initialContact]);

    if (!selectedContactId) {
        return <div className="flex justify-center items-center h-full text-gray-400">Select a contact to view details</div>;
    }

    if (!contact) return <Spinner />;

    return (
        <div className="p-6 space-y-6 overflow-y-auto h-full">
            <div className="flex justify-center mt-4">
                <FaUserCircle size={150} className="text-gray-300" />
            </div>

            <h1 className="text-3xl font-bold text-center mt-2 mb-4">{contact.name}</h1>

            <div className="flex gap-4 mt-4">
                <ContactActionButton icon={FaSms} />
                <ContactActionButton icon={FaPhoneAlt} />
                <ContactActionButton icon={FaEnvelope} />
            </div>

            <InfoCard title="Contact Info">
                <InfoItem icon={FaPhoneAlt} label={contact.phone} subLabel="Mobile" />
                <InfoItem icon={FaEnvelope} label={contact.email} subLabel="Personal" />
                <InfoItem icon={FaGlobe} label={contact.website} />
            </InfoCard>

            <InfoCard title="Address">
                <InfoItem
                    icon={FaMapMarkerAlt}
                    label={`${contact.address.street}, ${contact.address.suite}, ${contact.address.city}, ${contact.address.zipcode}`}
                    subLabel={`Geo: ${contact.address.geo.lat}, ${contact.address.geo.lng}`}
                />
            </InfoCard>

            <InfoCard title="Company">
                <InfoItem icon={FaBuilding} label={contact.company.name} />
                <InfoItem icon={FaUser} label={`"${contact.company.catchPhrase}"`} subLabel={contact.company.bs} />
            </InfoCard>
        </div>
    );
}
