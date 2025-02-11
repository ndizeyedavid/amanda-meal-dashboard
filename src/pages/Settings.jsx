import { useState } from 'react';
import Links from '../components/Links';
import Navbar from '../components/Navbar';
import pb from '../utils/pocketbase';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    async function updateProfile(data) {

        setLoading(true);
        try {
            const result = await pb.collection("_superusers").update(pb.authStore.record.id, data)

            Swal.fire({
                title: "Profile Updated",
                text: "Changes have been applied successfully, You must now login to complete the setup",
                icon: "success"
            }).then(result => {
                pb.authStore.clear();
                navigate("/")
            })
        } catch (err) {
            Swal.fire({
                title: "Failed to update profile",
                text: err,
                icon: "error"
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navbar />

            <div className="px-4 py-8 mx-auto max-w-7xl">
                <Links />

                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <h2 className="mb-6 text-2xl font-bold">Settings</h2>

                    <div className="flex flex-col gap-6 md:flex-row">
                        {/* Settings Tabs */}
                        <div className="md:w-1/4">
                            <div className="space-y-1">
                                {['profile', 'restaurant', 'notifications', 'security'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`w-full text-left px-4 py-2 rounded-lg capitalize ${activeTab === tab
                                            ? 'bg-orange-100 text-orange-600 font-medium'
                                            : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Settings Content */}
                        <div className="md:w-3/4">
                            {activeTab === 'profile' && (
                                <form onSubmit={handleSubmit(updateProfile)} className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-20 h-20 text-3xl bg-orange-100 rounded-full">
                                            👤
                                        </div>
                                        <button type='button' disabled={loading} className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                                            Change Avatar
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input disabled={loading} type="text" defaultValue={pb.authStore.record.uname} className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" {...register("uname")} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input disabled={loading} type="email" defaultValue={pb.authStore.record.email} className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" {...register("email")} />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6">
                                        <button disabled={loading} type='submit' className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                                            {loading ? (
                                                <span className="flex items-center gap-2"><Loader size={30} id="spin" /> Loading</span>
                                            )
                                                : "Save Changes"}
                                        </button>
                                    </div>
                                </form>

                            )}

                            {activeTab === 'restaurant' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Restaurant Owner</label>
                                            <input type="text" defaultValue="Amanda" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Location</label>
                                            <input type="text" defaultValue="Kigali, Rwanda" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Currency</label>
                                            <select disabled className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500">
                                                <option>RWF</option>
                                                <option>USD</option>
                                                <option>EUR</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                                            <select className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500">
                                                <option>Africa/Kigali (GMT+2)</option>
                                                <option>UTC</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    {['New orders', 'Low stock alerts', 'Daily reports', 'Customer reviews'].map((item) => (
                                        <div key={item} className="flex items-center justify-between py-3 border-b">
                                            <div>
                                                <h3 className="font-medium">{item}</h3>
                                                <p className="text-sm text-gray-500">Receive notifications for {item.toLowerCase()}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-4 font-medium">Change Password</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                                <input disabled={loading} type="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                                <input disabled={loading} type="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                                <input disabled={loading} type="password" className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="flex justify-end mt-6">
                                        <button disabled={loading} type='submit' className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                                            {loading ? (
                                                <span className="flex items-center gap-2"><Loader size={30} id="spin" /> Loading</span>
                                            )
                                                : "Save Changes"}
                                        </button>
                                    </div> */}
                                </div>
                            )}

                            {/* Save Button */}
                            {/* <div className="flex justify-end mt-6">
                                <button  className="px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                                    Save Changes
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
