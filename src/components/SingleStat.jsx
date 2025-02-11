export default function SingleStat({ label, value }) {
    return (
        <div className="p-6 transition-shadow bg-white shadow-lg rounded-2xl hover:shadow-xl">
            <h3 className="text-sm text-gray-500">{label}</h3>
            <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold">{isNaN(value) ? value : `${value.toLocaleString()} RWF`}</span>
            </div>
        </div>
    );
}
