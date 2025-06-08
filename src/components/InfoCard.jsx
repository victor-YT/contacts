export default function InfoCard({ title, children }) {
    return (
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-3 text-[#AD2F4F]">{title}</h3>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );
}
