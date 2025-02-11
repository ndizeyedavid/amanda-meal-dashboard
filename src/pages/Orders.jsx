import { useEffect, useState } from 'react';
import Links from '../components/Links';
import Navbar from '../components/Navbar';
import pb from '../utils/pocketbase';
import { CheckCircle, MenuSquareIcon, PenBox, Truck, XCircle } from 'lucide-react';
import PreviewItems from '../components/PreviewItems';
import Swal from 'sweetalert2';


export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [preview, setPreview] = useState(false);
    const [dummy, setDummy] = useState(0);
    const [menuItems, setMenuItems] = useState([]);
    const [refreshNotifications, setRefreshNotifications] = useState(0);


    useEffect(() => {
        async function fetchOrders() {
            const result = await pb.collection("checkout").getFullList({
                expand: "order_id,order_id.user_id,order_id.product_id"
            });
            setOrders(result);
        }
        fetchOrders()
    }, [dummy]);

    function showMenuList(prods) {
        setPreview(true);
        setMenuItems(prods)
    }

    async function changeStatus(id, value) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are going to change the Status of this order to '" + value + "'",
            icon: "warning",
            confirmButtonColor: "#ea580c",
            showCancelButton: true,
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const update = await pb.collection("checkout").update(id, { status: value });

                    Swal.fire({
                        title: "Order Status changed",
                        text: `The status of this order has been changed to ${value}`,
                        confirmButtonColor: "#ea580c",
                        icon: "success"
                    })
                } catch (err) {
                    Swal.fire({
                        title: "Failed to change order status",
                        text: err,
                        confirmButtonColor: "#ea580c",
                        icon: "error"
                    })
                } finally {
                    setDummy(Math.random());
                    setRefreshNotifications(Math.random())
                }
            }

        });
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navbar refreshNotifications={refreshNotifications} />

            <div className="px-4 py-8 mx-auto max-w-7xl">
                <Links />

                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <h2 className="mb-6 text-2xl font-bold">All Orders</h2>
                    <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Items
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                #{order.expand.order_id.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(order.created).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.expand.order_id.expand.user_id.fname + " " + order.expand.order_id.expand.user_id.lname}
                                            </td>
                                            <td className="px-6 py-4">{<MenuSquareIcon className='cursor-pointer hover:bg-gray-300 p-1.5 rounded-full overflow-visible' onClick={() => showMenuList(order.expand.order_id.expand.product_id)} size={40} />}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {order.expand.order_id.price.toLocaleString()} RWF
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end">
                                                {order.expand.order_id.quantity}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className='flex items-center gap-2'>
                                                    <span
                                                        className={` capitalize px-3 py-1 rounded-full text-sm ${order.status === 'completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : order.status === 'processing'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : order.status === "pending"
                                                                    ? 'bg-yellow-100 text-yellow-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </span>
                                            </td>
                                            <td className='flex items-center gap-2 py-4'>
                                                <CheckCircle onClick={() => changeStatus(order.id, "completed")} className='text-green-500 cursor-pointer hover:bg-gray-300 p-1.5 rounded-full overflow-visible' size={35} />
                                                <Truck onClick={() => changeStatus(order.id, "processing")} className='text-blue-500 cursor-pointer hover:bg-gray-300 p-1.5 rounded-full overflow-visible' size={35} />
                                                <XCircle onClick={() => changeStatus(order.id, "canceled")} className='text-red-500 cursor-pointer hover:bg-gray-300 p-1.5 rounded-full overflow-visible' size={35} />
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {preview && <PreviewItems menuItems={menuItems} close={() => setPreview(false)} />}

        </div>
    );
}
