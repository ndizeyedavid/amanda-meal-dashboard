export default function ForgetPassword() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🍔 Amanda Meal</h1>
                    <p className="text-gray-500">Password Reset</p>
                </div>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                        Send Recovery Code
                    </button>
                </form>
            </div>
        </div>
    );
}
