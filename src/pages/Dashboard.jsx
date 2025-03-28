import { useEffect, useState } from 'react';
import Links from '../components/Links';
import Navbar from '../components/Navbar';
import SingleStat from '../components/SingleStat';
import pb from '../utils/pocketbase';
import { MenuSquareIcon } from 'lucide-react';
import PreviewItems from '../components/PreviewItems';

export default function Dashboard() {

    const [dailySales, setDailySales] = useState(0);
    const [activeOrders, setActiveOrders] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [preview, setPreview] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        let total = 0;

        function calcTotal(singleOrder) {
            setDailySales(total += singleOrder.expand.order_id.price)
        }

        async function fetchAnalytics() {
            const fetched_activeOrders = await pb.collection("checkout").getFullList();
            const fetched_customers = await pb.collection("users").getFullList();
            const fetched_daily_sales = await pb.collection("checkout").getFullList({ expand: "order_id" })

            fetched_daily_sales.forEach(calcTotal)


            setActiveOrders(fetched_activeOrders.length);
            setCustomers(fetched_customers.length);

        }

        async function fetchRecentOrder() {
            const fetched_recent_order = await pb.collection("checkout").getList(1, 5, {
                expand: "order_id,order_id.user_id,order_id.product_id"
            });
            setRecentOrders(fetched_recent_order.items)
        }

        fetchRecentOrder();
        fetchAnalytics();
    }, []);

    const stats = [
        { label: 'Total Sales', value: dailySales },
        { label: 'Active Orders', value: `${activeOrders} Orders` },
        { label: 'Total Customers', value: `${customers} Users` },
        { label: 'Popular Item', value: 'Big Burger' },
    ];

    function showMenuList(prods) {
        setPreview(true);
        setMenuItems(prods)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navbar />

            <div className="px-4 py-8 mx-auto max-w-7xl">
                <Links />

                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <SingleStat
                            key={index}
                            label={stat.label}
                            value={stat.value}
                        />
                    ))}
                </div>

                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <h2 className="mb-4 text-xl font-bold">Recent Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="pb-4">Order ID</th>
                                    <th className="pb-4">Customer</th>
                                    {/* <th className="pb-4">Items</th> */}
                                    <th className="pb-4">Quantity</th>
                                    <th className="pb-4">Total</th>
                                    <th className="pb-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-t">
                                        <td className="py-4">#{order.id}</td>
                                        <td className="py-4">{order.expand.order_id.expand.user_id.fname + " " + order.expand.order_id.expand.user_id.lname}</td>
                                        {/* <td className="py-4 h-[60px]">{}</td> */}
                                        {/*<td className="py-4 h-[60px]"><MenuSquareIcon className='cursor-pointer hover:bg-gray-300 p-1.5 rounded-full overflow-visible' onClick={() => showMenuList(order.expand.order_id.expand.product_id)} size={40} /></td> */}
                                        <td className="py-4">{order.expand.order_id.quantity}</td>
                                        <td className="py-4">{order.expand.order_id.price.toLocaleString()} RWF</td>
                                        <td className="py-4">
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
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {preview && <PreviewItems menuItems={menuItems} close={() => setPreview(false)} />}
        </div>
    );
}
