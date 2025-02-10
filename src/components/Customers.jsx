
export default function Customers() {
    const customers = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            orders: 15,
            spent: '$234.50',
            lastOrder: '2023-10-15',
            status: 'Active',
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            orders: 8,
            spent: '$156.75',
            lastOrder: '2023-10-14',
            status: 'Active',
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            orders: 3,
            spent: '$45.25',
            lastOrder: '2023-10-10',
            status: 'Inactive',
        },
        {
            id: 4,
            name: 'Alice Brown',
            email: 'alice@example.com',
            orders: 12,
            spent: '$198.30',
            lastOrder: '2023-10-13',
            status: 'Active',
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Customers</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Orders
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Spent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Last Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.orders}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.spent}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {customer.lastOrder}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${customer.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {customer.status}
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
