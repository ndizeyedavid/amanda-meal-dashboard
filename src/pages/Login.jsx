import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import pb from '../utils/pocketbase';
import Alert from '../components/Alert';

export default function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    async function login(data) {
        setLoading(true);
        setError(false);

        try {
            const authData = await pb.collection('_superusers').authWithPassword(
                data.email,
                data.password
            );

            if (authData.token) {
                // Store auth data in localStorage
                localStorage.setItem('user', JSON.stringify(authData.record));
                localStorage.setItem('token', authData.token);

                // Redirect to dashboard
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Authentication error:', err);
            setError(true);
        } finally {
            setLoading(false);
            reset();
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">🍔 Amanda Meal</h1>
                    <p className="text-gray-500">Admin Dashboard</p>
                </div>

                {error && (
                    <Alert
                        setError={setError}
                    />
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}

                        <p className="text-end mt-3">
                            <Link
                                to="/forget-password"
                                className="text-gray-700 text-sm hover:text-gray-900"
                            >
                                Forget Password
                            </Link>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                Loading...
                            </span>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
