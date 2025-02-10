import { X, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function Alert({ setError, message }) {

    return (
        <>

            <div className="relative mt-6 mb-6 flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md scale-100 transition-all ease-linear">
                <div className="flex items-center justify-center w-12 bg-red-500"><XCircle color='white' /></div>
                <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                        <span className="font-semibold text-red-500 dark:text-red-400">Access Denied</span>
                        <p className="text-sm text-black">invalid email or password</p>
                    </div>
                </div>
                <X className='absolute right-2 top-1 cursor-pointer text-gray-600' onClick={() => setError(false)} />
            </div>
        </>
    )
}
