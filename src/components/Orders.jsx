'use client';


export default function Orders() {
    const orders = [
        {
            id: 1,
            customer: 'John Doe',
            items: 'Double Cheeseburger, Fries',
            total: '$15.99',
            status: 'Completed',
            date: '2023-10-15',
        },
        {
            id: 2,
            customer: 'Jane Smith',
            items: 'Chicken Wings, Soda',
            total: '$12.99',
            status: 'Processing',
            date: '2023-10-15',
        },
        {
            id: 3,
            customer: 'Bob Johnson',
            items: 'Pizza, Salad',
            total: '$18.99',
            status: 'Pending',
            date: '2023-10-15',
        },
        {
            id: 4,
            customer: 'Alice Brown',
            items: 'Milkshake, Burger',
            total: '$11.99',
            status: 'Completed',
            date: '2023-10-15',
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">All Orders</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">#{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {order.customer}
                                    </td>
                                    <td className="px-6 py-4">{order.items}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${order.status === 'Completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : order.status === 'Processing'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
