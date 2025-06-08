export default function InfoItem({ icon: Icon, label, subLabel }) {
    return (
        <div className="flex items-start space-x-3">
            <Icon size={20} className="mt-1 text-gray-600" />
            <div>
                <div className="text-base text-gray-900">{label}</div>
                {subLabel && <div className="text-sm text-gray-500">{subLabel}</div>}
            </div>
        </div>
    );
}
