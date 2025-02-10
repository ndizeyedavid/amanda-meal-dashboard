
export default function Menu() {
    const menuItems = [
        {
            id: 1,
            name: 'Double Cheeseburger',
            price: '8,000 RWF',
            category: 'Burgers',
            image: '🍔',
            available: true,
        },
        {
            id: 2,
            name: 'Chicken Wings',
            price: '1,000 RWF9',
            category: 'Appetizers',
            image: '🍗',
            available: true,
        },
        {
            id: 3,
            name: 'Pizza Margherita',
            price: '1,000 RWF9',
            category: 'Pizza',
            image: '🍕',
            available: true,
        },
        {
            id: 4,
            name: 'Caesar Salad',
            price: '6,000 RWF',
            category: 'Salads',
            image: '🥗',
            available: true,
        },
        {
            id: 5,
            name: 'French Fries',
            price: '3,000 RWF',
            category: 'Sides',
            image: '🍟',
            available: true,
        },
        {
            id: 6,
            name: 'Milkshake',
            price: '4,000 RWF',
            category: 'Drinks',
            image: '🥤',
            available: true,
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Menu Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{item.image}</span>
                            <span className="text-lg font-bold text-orange-500">{item.price}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{item.category}</span>
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                            >
                                {item.available ? 'Available' : 'Sold Out'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
