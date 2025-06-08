import { FaUserCircle } from 'react-icons/fa';

export default function ContactCard({ contact }) {
    return (
        <div className="p-3 flex items-center space-x-3 bg-white rounded-lg shadow hover:bg-[#FDECF0] transition cursor-pointer">
            <FaUserCircle size={32} className="text-gray-300" />
            <div className="text-base font-medium text-gray-900">{contact.name}</div>
        </div>
    );
}
