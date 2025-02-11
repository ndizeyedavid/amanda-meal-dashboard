
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Links() {
    const [selectedLink, setSelectedLink] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const currentPath = url.split('/')[3];
        // console.log(currentPath);
        setSelectedLink(currentPath);
    }, []);

    return (
        <div className="flex mb-8 space-x-4">
            {['dashboard', 'menu', 'orders', 'customers', 'promos'].map((data, tab) => (
                // active: bg-orange-500 text-white shadow-lg transform scale-105
                <Link
                    to={'/' + data}
                    key={tab}
                    onClick={() => setSelectedLink(data)}
                    className={`capitalize px-6 py-2 rounded-full text-sm font-medium transition-all ${data != selectedLink ? 'bg-white text-gray-600 hover:bg-orange-100' : 'bg-orange-500 text-white shadow-lg transform scale-105'} `}
                >
                    {data}
                </Link>
            ))}
        </div>
    );
}
