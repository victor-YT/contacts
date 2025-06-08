import ContactCard from './ContactCard';

export default function ContactSection({ letter, contacts }) {
    return (
        <div id={`section-${letter}`} className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 mb-2">{letter}</h2>
            <div className="flex flex-col gap-2">
                {contacts && contacts.length > 0 ? (
                    contacts.map(contact => (
                        contact && <ContactCard key={contact.id} contact={contact} />
                    ))
                ) : (
                    <p className="text-gray-500">No contacts in this section.</p>
                )}
            </div>
        </div>
    );
}
