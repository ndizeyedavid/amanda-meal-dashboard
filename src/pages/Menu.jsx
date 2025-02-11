import { Plus, Trash2, X } from 'lucide-react';
import Links from '../components/Links';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import pb from '../utils/pocketbase';
import NewProduct from '../components/NewProduct';
import Swal from 'sweetalert2';

export default function Menu() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        async function getAllMenu() {
            const menuItems = await pb.collection("products").getFullList();

            setMenuItems(menuItems);
        }

        getAllMenu();
    }, [dummy])

    async function handleUpdate(id, name, value) {
        Swal.fire({
            title: "Are you sure?",
            text: `You are going to change the availability of ${name} to "${!value ? "Available" : "Out of Stock"}"`,
            icon: "warning",
            confirmButtonColor: "#ea580c",
            showCancelButton: true,
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const upd_product = await pb.collection("products").update(id, { available: !value })
                    Swal.fire({
                        title: "Product availability changed",
                        text: `You changed ${name} to ${!value ? "Available" : "Out of Stock"}`,
                        confirmButtonColor: "#ea580c",
                        icon: "success"
                    })
                } catch (err) {
                    Swal.fire({
                        title: "Failed to change Product availability",
                        text: err,
                        confirmButtonColor: "#ea580c",
                        icon: "error"
                    })
                } finally {
                    setDummy(Math.random());
                }
            }
        })
    }

    async function deleteProduct(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are going to delete this product",
            icon: "warning",
            confirmButtonColor: "#ea580c",
            showCancelButton: true,
        }).then(async result => {
            if (result.isConfirmed) {
                try {
                    const delete_product = await pb.collection("products").delete(id)
                    Swal.fire({
                        title: "Product deleted changed",
                        text: "You deleted a product from the menu",
                        confirmButtonColor: "#ea580c",
                        icon: "success"
                    })
                } catch (err) {
                    Swal.fire({
                        title: "Failed to delete Product",
                        text: err,
                        confirmButtonColor: "#ea580c",
                        icon: "error"
                    })
                } finally {
                    setDummy(Math.random());
                }
            }
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navbar />

            <div className="px-4 py-8 mx-auto max-w-7xl">
                <Links />

                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <div className="flex items-center justify-between">
                        <h2 className="mb-6 text-2xl font-bold">Menu Items</h2>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white capitalize transition-all transform bg-orange-500 border rounded-full shadow-lg hover:bg-orange-600"
                        >
                            <Plus /> New Product
                        </button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    {/* <span className="text-4xl">{item.product_image ? '🍔' : null}</span> */}
                                    {/* <span className="text-4xl">🍔</span> */}
                                    <img src={pb.files.getURL(item, item.product_image)} alt={item.product_name} className='w-[110px] h-[110px] object-cover rounded-md shadow-md' width={110} height={110} />

                                    <div className='relative flex flex-col items-end'>
                                        <span className="text-lg font-bold text-orange-500">
                                            {item.product_price.toLocaleString()} RWF
                                        </span>
                                        <Trash2 onClick={() => deleteProduct(item.id)} className='absolute top-[50px] text-red-500 cursor-pointer hover:bg-red-100 p-1.5 rounded-full overflow-visible' size={35} />

                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold capitalize">{item.product_name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500 capitalize">{item.product_category}</span>
                                    <span
                                        title='Click to change'
                                        className={` cursor-pointer px-2 py-1 rounded-full text-xs ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        onClick={() => handleUpdate(item.id, item.product_name, item.available)}
                                    >
                                        {item.available ? 'Available' : 'Sold Out'}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && <NewProduct setDummy={setDummy} setIsModalOpen={setIsModalOpen} />}
        </div>
    );
}
