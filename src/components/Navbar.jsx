import { useEffect, useState } from 'react';
import IsLoggedIn from '../utils/session.js'
import pb from '../utils/pocketbase.js';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Navbar() {

    const navigate = useNavigate();

    IsLoggedIn();

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const notifications = [
        { id: 1, text: 'New order received', time: '5 min ago' },
        { id: 2, text: 'Daily report ready', time: '1 hour ago' },
        { id: 3, text: 'Low stock alert', time: '2 hours ago' },
    ];

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
        <nav className="bg-white shadow-lg relative">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-orange-500 w-[202px] h-auto">
                            🍔 Amanda Meal
                        </span>
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
                                <span className="text-xl">🔔</span>
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4">
                                    3
                                </span>
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl py-2 z-50">
                                    <h3 className="px-4 py-2 text-sm font-semibold border-b">Notifications</h3>
                                    {notifications.map(notification => (
                                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                            <p className="text-sm">{notification.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                    <div className="border-t px-4 py-2">
                                        <button className="text-sm text-orange-500 hover:text-orange-600 w-full text-center">
                                            View all notifications
                                        </button>
                                    </div>
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
                                <span className="text-xl">👤</span>
                            </button>

                            {showProfile && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
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
                                        <button onClick={() => handleLogout()} className="block px-4 py-2 w-full text-left text-sm text-red-600 hover:bg-gray-50">
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
