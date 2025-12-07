'use client';

import { useState } from "react";

export default function DonutClient() {
    //'use cache'; - Can't be used to cache the component, because it's a client component
    const [donutsQuantity, setDonutsQuantity] = useState<number>(0);

    return (
        <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-300 p-4 rounded-md w-1/2">
            <h1>Donut Client</h1>
            <p>Quantity: {donutsQuantity}</p>
            <div className="flex items-center justify-center gap-4">
                <button className="bg-green-500 text-white p-2 rounded-md w-10" onClick={() => setDonutsQuantity(prev => prev + 1)}>+</button>
                <button className="bg-red-500 text-white p-2 rounded-md w-10" onClick={() => setDonutsQuantity(prev => prev > 0 ? prev - 1 : 0)}>-</button>
            </div>
        </div>
    );
}