export default function AZSidebar({ letters }) {
    const handleScroll = letter => {
        const section = document.getElementById(`section-${letter}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* small screen */}
            <div className="fixed top-[58%] -translate-y-1/2 right-2 flex flex-col items-center space-y-1 z-10 md:hidden">
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

            {/* large screen */}
            <div className="fixed top-[55%] -translate-y-1/2 left-[calc(33.333%-25px)] flex-col items-center space-y-1 z-10 hidden md:flex">
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
        </div>
    );
}
