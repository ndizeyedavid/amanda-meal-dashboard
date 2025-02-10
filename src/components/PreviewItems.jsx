import { motion } from "framer-motion"
export default function PreviewItems({ close, menuItems }) {
    const handleClose = (e) => {
        if (e.target.id == "modal") {
            close();
        }
    }

    return (
        <div id="modal" onClick={(e) => handleClose(e)} className="flex items-center justify-center absolute top-0 w-full h-full bg-black/70">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-md rounded-md p-2 w-[300px] h-[400px] overflow-auto">
                <h3 className="text-center font-semibold text-xl pt-3">Menu Items</h3>

                <ul className="list-inside list-disc mt-5">
                    {menuItems.map((data, index) => (
                        <li key={index}>{data.product_name}</li>
                    ))}
                </ul>
            </motion.div>
        </div>
    )
}
