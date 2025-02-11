import { useEffect, useState } from 'react';
import IsLoggedIn from '../utils/session.js'
import pb from '../utils/pocketbase.js';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Bell, ReceiptText, ReceiptTextIcon, User2 } from 'lucide-react';

export default function Navbar({ refreshNotifications }) {

    const navigate = useNavigate();

    IsLoggedIn();


    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetch_notifications() {
            const results = await pb.collection("checkout").getFullList({
                filter: "status = 'pending'",
                expand: "order_id,order_id.user_id,order_id.product_id"
            });

            setNotifications(results);
        }

        fetch_notifications();
    }, [refreshNotifications]);

    function handleLogout() {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to be logged out of the system",
            icon: "warning",
            confirmButtonColor: "#ea580c",
            showCancelButton: true,
        }).then(result => {
            if (result.isConfirmed) {
                pb.authStore.clear();

                navigate("/");
            }
        });

    }

    return (
        <nav className="relative bg-white shadow-lg">
            <div className="px-4 py-3 mx-auto max-w-7xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="text-2xl font-bold text-orange-500 w-[202px] h-auto">
                            🍔 Amanda Meal
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <button
                                className="p-2 rounded-full hover:bg-orange-100"
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfile(false);
                                }}
                            >
                                <span className="text-xl"><Bell /></span>
                                {notifications != 0 &&
                                    <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                                        {notifications.length}
                                    </span>
                                }
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 z-50 py-2 mt-2 bg-white rounded-lg shadow-xl w-[320px]">
                                    <h3 className="px-4 py-2 text-sm font-semibold border-b">Notifications</h3>
                                    {notifications.map(notification => (
                                        <div key={notification.id} className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100">
                                            <ReceiptText className='p-1 bg-gray-100 rounded-full' size={35} />
                                            <div>
                                                <p className="text-sm">A <span className='px-1 bg-yellow-200 rounded-[30px]'>pending</span> from {notification.expand.order_id.expand.user_id.fname}(Order: {notification.expand.order_id.expand.product_id[0].product_name})</p>
                                                <p className="mt-1 text-xs text-gray-500">{new Date(notification.created).toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {/* <div className="px-4 py-2 border-t">
                                        <button className="w-full text-sm text-center text-orange-500 hover:text-orange-600">
                                            View all notifications
                                        </button>
                                    </div> */}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className="p-2 rounded-full hover:bg-orange-100"
                                onClick={() => {
                                    setShowProfile(!showProfile);
                                    setShowNotifications(false);
                                }}
                            >
                                <span className="text-xl"><User2 /></span>
                            </button>

                            {showProfile && (
                                <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
                                    <div className="px-4 py-3 border-b">
                                        <p className="text-sm font-semibold">{pb.authStore.record.uname}</p>
                                        <p className="text-xs text-gray-500">{pb.authStore.record.email}</p>
                                    </div>
                                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Settings
                                    </Link>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Status
                                    </a>
                                    <div className="border-t">
                                        <button onClick={() => handleLogout()} className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-50">
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
