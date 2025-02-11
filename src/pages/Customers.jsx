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

            <div className="px-4 py-8 mx-auto max-w-7xl">
                <Links />

                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <h2 className="mb-6 text-2xl font-bold">Customers</h2>
                    <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Profile
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            First Name
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Last Name
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Province
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            District
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Phone
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <img
                                                    src={pb.files.getURL(customer, customer.avatar)}
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
