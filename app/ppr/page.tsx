import { Suspense } from "react";
import { setTimeout } from "timers/promises";

// Static - prerendered at build time
function StaticComponent() {
    return (
        <div className="border-2 border-blue-500 p-4">
            <p className="text-2xl font-bold">Static (Prerendered)</p>
            <p>This is part of the shell</p>
        </div>
    );
}

async function DynamicComponent() {
    await setTimeout(2000);
    const todosResponse = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const todos = await todosResponse.json();

    return (
        <div className="border-2 border-green-500 p-4">
            <p className="text-2xl font-bold">Dynamic (Streamed)</p>
            {todos.map((todo: { id: number; title: string }) => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
}

export default function PPR() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 dark:bg-black">
            <p className="text-2xl font-bold">PPR Demo</p>
            <StaticComponent />
            <Suspense fallback={<div className="border-2 border-green-500 p-4">Loading...</div>}>
                <DynamicComponent />
            </Suspense>
        </div>
    );
}