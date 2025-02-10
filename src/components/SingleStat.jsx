export default function SingleStat({ label, value }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-gray-500 text-sm">{label}</h3>
            <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold">{value}</span>
            </div>
        </div>
    );
}
