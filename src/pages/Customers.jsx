import { useEffect, useState } from 'react';
import Links from '../components/Links';
import Navbar from '../components/Navbar';
import pb from '../utils/pocketbase';


export default function Customers() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const result = await pb.collection("users").getFullList();
            setCustomers(result);
        }

        fetchUsers();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <Links />

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Customers</h2>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Profile
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            First Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Province
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            District
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={customer.avatar}
                                                    alt={customer.fname + "'s Avatar"}
                                                    width={60}
                                                    height={60}
                                                    className="w-[60px] h-[60px] object-cover rounded-full bg-black"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.fname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.lname}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.address}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.province}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.district}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {customer.phone}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm ${customer.verified
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-gray-800'
                                                        }`}
                                                >
                                                    {customer.verified ? "Verified" : "Not Verified"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
