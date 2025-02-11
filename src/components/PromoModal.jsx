import { Loader, X } from "lucide-react";
import { useForm } from "react-hook-form";
import pb from "../utils/pocketbase";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion"

export default function PromoModal({ setIsModalOpen, setDummy }) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);

    const handleClose = (e) => {
        if (e.target.id == "modal") {
            setIsModalOpen(false);
        }
    }

    async function updatePromo(data) {
        Swal.fire({
            title: "Are you sure?",
            text: "You are going to update the existing promo banner",
            icon: "warning",
            confirmButtonColor: "#ea580c",
            showCancelButton: true,
        }).then(async result => {
            if (result.isConfirmed) {
                try {

                    const update_details = {
                        promo_image: data.promo_image[0],
                        title: data.title,
                        description: data.description,
                        promo_link: data.promo_link,
                        promo_button: data.promo_button
                    }

                    await pb.collection("promos").update("j1f83xdhpd3r9bj", update_details);
                    Swal.fire({
                        title: "Promo banner changed",
                        text: "You Successfully changed the promo banner",
                        icon: "success",
                        confirmButtonColor: "#ea580c",
                    })
                } catch (err) {
                    Swal.fire({
                        title: "Promo banner update failed",
                        text: "Unfortunately there was an error while updating the promo banner, please try again",
                        icon: "error",
                        confirmButtonColor: "#ea580c",
                    })
                } finally {
                    setDummy(Math.random());
                    setIsModalOpen(false);

                }
            }
        })
    }

    return (
        <div id="modal" onClick={(e) => handleClose(e)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Update Promo</h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X />
                    </button>
                </div>
                <form onSubmit={handleSubmit(updatePromo)} method="POST" encType="multipart/form-data" className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Promo Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            disabled={loading}
                            placeholder="One of the best deals"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500"
                            {...register("title")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Promo Description</label>
                        <input
                            type="text"
                            name="description"
                            required
                            disabled={loading}
                            placeholder="There is alot you will benefit from this promotion"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500"
                            {...register("description")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Promo Link</label>
                        <input
                            type="text"
                            name="promo_link"
                            required
                            disabled={loading}
                            placeholder="https://amandameal.com/promo"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500"
                            {...register("promo_link")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Promo Button Text</label>
                        <input
                            type="text"
                            name="promo_button"
                            required
                            disabled={loading}
                            placeholder="Order Now"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500"
                            {...register("promo_button")}
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">Promo Image</label>
                        <input
                            type="file"
                            name="image"
                            required
                            disabled={loading}

                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm outline-none focus:border-orange-500 focus:ring-orange-500"
                            {...register("promo_image")}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white transition-colors bg-orange-500 rounded-md hover:bg-orange-600"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2"><Loader size={30} id="spin" /> Loading</span>
                        )
                            : "Change"}
                    </button>
                </form>
            </motion.div>
        </div>
    )
}
