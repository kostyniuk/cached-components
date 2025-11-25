import { Suspense } from "react";
import { setTimeout } from "timers/promises";

const CachedComponentStatic = async () => {
  'use cache';
  const tasks = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  await setTimeout(5000);
  const tasksData = await tasks.json();

  return <div className='border-2 border-blue-500 p-4'>
    {tasksData.map((task: any) => (
      <div key={task.id}>{task.title}</div>
    ))}
  </div>
};

const CachedComponentDynamic = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { limit } = await searchParams;
  console.log(limit);
  const tasks = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit || 5}`);
  await setTimeout(3000);
  const tasksData = await tasks.json();

  return <div className='border-2 border-green-500 p-4 w-120 h-40 overflow-y-auto'>
    {tasksData.map((task: any) => (
      <div key={task.id}>{task.title}</div>
    ))}
  </div>
};

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-2xl font-bold">Hey, I'm root</p>
      <CachedComponentStatic />
      <Suspense fallback={<div className='border-2 border-green-500 p-4 w-120 h-40'>Loading...</div>}>
        <CachedComponentDynamic searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
