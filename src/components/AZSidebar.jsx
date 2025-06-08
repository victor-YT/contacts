export default function AZSidebar({ letters }) {
    const handleScroll = letter => {
        const section = document.getElementById(`section-${letter}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed md:absolute top-[55%] -translate-y-1/2 right-2 md:right-0 md:pr-2 flex flex-col items-center space-y-1.5 z-10">
            {letters.map(letter => (
                <button
                    key={letter}
                    onClick={() => handleScroll(letter)}
                    className="text-gray-400 hover:text-[#AD2F4F] text-xs font-semibold"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
}
