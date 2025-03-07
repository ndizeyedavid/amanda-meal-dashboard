import { ArrowRight, Upload } from "lucide-react"
import Links from "../components/Links"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import PromoModal from "../components/PromoModal";
import pb from "../utils/pocketbase";
import { Link } from "react-router-dom";

function Promos() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dummy, setDummy] = useState(0)
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        async function fetch_promos() {
            const result = await pb.collection("promos").getFullList();

            setPromos(result[0]);
        }
        fetch_promos()
    }, [dummy])

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
            <Navbar />

            <div className="px-4 py-8 mx-auto max-w-7xl">
                <Links />

                <div className="p-6 bg-white shadow-lg rounded-2xl">
                    <div onClick={() => setIsModalOpen(true)} className="flex items-center justify-between">
                        <h2 className="mb-4 text-xl font-bold">Current Promotion</h2>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white capitalize transition-all transform bg-orange-500 border rounded-full shadow-lg hover:bg-orange-600">
                            <Upload /> Update Promo
                        </button>

                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-10">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">Promo Image</h3>
                            <img src={pb.files.getURL(promos, promos.promo_image)} className="w-full h-[90%] object-cover rounded-md shadow-md" width={100} height={100} alt="Promo" />
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">Full Preview</h3>

                            {/* Preview */}
                            <div className="flex items-center justify-center w-full mx-auto">
                                <div className="w-[100%] h-[189px] rounded-xl flex flex-col items-start px-5 gap-3 justify-center" style={{ backgroundImage: `url('${pb.files.getURL(promos, promos.promo_image)}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>

                                    <h3 className="text-3xl font-bold leading-snug text-white">{promos.title}</h3>

                                    <div className="flex flex-col gap-[4px]">
                                        <span className="font-normal leading-none text-white w-[200px]">{promos.description}</span>
                                        {/* <span className="font-normal leading-none text-white">All Flavours</span> */}
                                    </div>

                                    <Link to={promos.promo_link} target="_blank" className="inline-flex items-center justify-center h-8 gap-1 p-2 mt-[5px] text-white border border-white rounded-md transition-all hover:bg-white hover:text-black">
                                        {promos.promo_button} <ArrowRight size={20} />
                                    </Link>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <PromoModal setDummy={setDummy} setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}

export default Promos
