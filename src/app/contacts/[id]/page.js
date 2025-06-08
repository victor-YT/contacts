'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import ContactActionButton from '@/components/ContactActionButton';
import InfoCard from '@/components/InfoCard';
import InfoItem from '@/components/InfoItem';
import { FaArrowLeft } from 'react-icons/fa';
import { FaSms, FaUserCircle, FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaBuilding, FaUser } from 'react-icons/fa';

export default function ContactDetailPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const fetchData = async () => {
            const start = Date.now();
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await res.json();

            const elapsed = Date.now() - start;
            const delay = Math.max(300 - elapsed, 0);
            setTimeout(() => {
                setContact(data);
                setLoading(false);
            }, delay);
        };

        fetchData();
    }, [id]);

    if (loading) return <Spinner />;
    if (!contact) return <p className="p-6">Contact not found.</p>;

    return (
        <div className="p-6 space-y-6 max-w-md mx-auto">
            {/* 返回按钮 */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-[#AD2F4F] hover:text-[#922742] mb-4"
            >
                <FaArrowLeft size={24} className="mr-2" />
            </button>

            {/* 默认头像 */}
            <div className="flex justify-center mt-4">
                <FaUserCircle size={150} className="text-gray-300" />
            </div>

            {/* 联系人名字 - 居中 */}
            <h1 className="text-3xl font-bold text-center mt-2 mb-4">{contact.name}</h1>

            {/* 联系按钮 - 铺满 */}
            <div className="flex gap-4 mt-4">
                <ContactActionButton icon={FaSms} />
                <ContactActionButton icon={FaPhoneAlt} />
                <ContactActionButton icon={FaEnvelope} />
            </div>

            {/* Contact Info */}
            <InfoCard title="Contact Info">
                <InfoItem icon={FaPhoneAlt} label={contact.phone} subLabel="Mobile" />
                <InfoItem icon={FaEnvelope} label={contact.email} subLabel="Personal" />
                <InfoItem icon={FaGlobe} label={contact.website} />
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
