'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContactStore } from '@/store/ContactStore';
import Spinner from '@/components/Spinner';
import ContactActionButton from '@/components/ContactActionButton';
import InfoCard from '@/components/InfoCard';
import InfoItem from '@/components/InfoItem';
import Link from 'next/link';

import { FaArrowLeft, FaSms, FaUserCircle, FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaBuilding, FaUser } from 'react-icons/fa';

export default function ContactDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const contacts = ContactStore((state) => state.contacts);

    // ✅ 优先用 store 里的 contact
    const initialContact = contacts.find((c) => c.id === Number(id));

    // ✅ local state 存 contact
    const [contact, setContact] = useState(initialContact);

    // ✅ fallback fetch → 兼容直接访问 URL
    useEffect(() => {
        if (contact) return; // 有 contact → 不用 fetch

        const fetchSingleContact = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await res.json();
            setContact(data);
        };

        fetchSingleContact();
    }, [contact, id]);

    // ✅ loading fallback
    if (!contact) return <Spinner />;

    return (
        <div className="p-6 space-y-6">
            {/* 返回按钮 */}
            <Link href="/" className="inline-flex items-center text-black hover:text-gray-950 mb-4">
                <FaArrowLeft size={24} className="mr-2" />
            </Link>

            {/* 默认头像 */}
            <div className="flex justify-center mt-4">
                <FaUserCircle size={150} className="text-gray-300" />
            </div>

            {/* 联系人名字 */}
            <h1 className="text-3xl font-bold text-center mt-2 mb-4">{contact.name}</h1>

            {/* 联系按钮 */}
            <div className="flex gap-4 mt-4">
                <ContactActionButton icon={FaSms} />
                <ContactActionButton icon={FaPhoneAlt} />
                <ContactActionButton icon={FaEnvelope} />
            </div>

            {/* Contact Info */}
            <InfoCard title="Contact Info">
                <InfoItem icon={FaPhoneAlt} label={contact.phone} subLabel="Mobile" />
                <InfoItem icon={FaEnvelope} label={contact.email} subLabel="Personal" />
                <InfoItem
                    icon={FaGlobe}
                    label={contact.website}
                />
            </InfoCard>

            {/* Address */}
            <InfoCard title="Address">
                <InfoItem
                    icon={FaMapMarkerAlt}
                    label={`${contact.address.street}, ${contact.address.suite}, ${contact.address.city}, ${contact.address.zipcode}`}
                    subLabel={`Geo: ${contact.address.geo.lat}, ${contact.address.geo.lng}`}
                />
            </InfoCard>

            {/* Company */}
            <InfoCard title="Company">
                <InfoItem icon={FaBuilding} label={contact.company.name} />
                <InfoItem icon={FaUser} label={`"${contact.company.catchPhrase}"`} subLabel={contact.company.bs} />
            </InfoCard>
        </div>
    );
}
