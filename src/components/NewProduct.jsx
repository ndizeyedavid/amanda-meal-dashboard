import { Loader, X } from "lucide-react";
import { useForm } from "react-hook-form";
import pb from "../utils/pocketbase";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion"

export default function NewProduct({ setIsModalOpen, setDummy }) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const handleClose = (e) => {
        if (e.target.id == "modal") {
            setIsModalOpen(false);
        }
    }

    async function addProudct({ product_name, product_price, product_catergory, product_image }) {
        // return console.log(product_image[0]);

        setLoading(true);
        try {


            const add = await pb.collection("products").create({
                product_name: product_name,
                product_price: product_price,
                product_catergory: product_catergory,
                product_image: product_image[0]
            });

            if (add) {
                Swal.fire({
                    title: "Product Added",
                    text: "A new Product is added to the menu",
                    icon: "success"
                })
            }
        } catch (err) {
            Swal.fire({
                title: "Failed to add product",
                text: err,
                icon: "error"
            })
        } finally {
            setLoading(false);
            reset();
            setIsModalOpen(false);
            setDummy(Math.random())
        }
    }

    return (
        <div id="modal" onClick={(e) => handleClose(e)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Add New Product</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X />
                    </button>
                </div>
                <form onSubmit={handleSubmit(addProudct)} method="POST" encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            disabled={loading}
                            className="mt-1 block w-full rounded-md border-gray-300 outline-none border shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
                            {...register("product_name")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (RWF)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            disabled={loading}

                            className="mt-1 block w-full rounded-md border-gray-300 outline-none border shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
                            {...register("product_price")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            required
                            disabled={loading}

                            className="mt-1 block w-full rounded-md border-gray-300 outline-none border shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
                            {...register("product_category")}

                        >
                            <option value="Burgers">Burgers</option>
                            <option value="Appetizers">Appetizers</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Salads">Salads</option>
                            <option value="Sides">Sides</option>
                            <option value="Drinks">Drinks</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            required
                            disabled={loading}

                            className="mt-1 block w-full rounded-md border-gray-300 outline-none border shadow-sm focus:border-orange-500 focus:ring-orange-500 p-2"
                            {...register("product_image")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2"><Loader size={30} id="spin" /> Loading</span>
                        )
                            : "Add Product"}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
