import { Suspense } from "react";
import { setTimeout } from "timers/promises";

/* 
  Static - prerendered at build time 
  'use cache' - tells Next.js to prerender "dynamic" component at build time

  If this data doesn't depend on runtime data, you can use the 'use cache' directive 
  to include it in the static HTML shell. 
  Use cacheLife to define how long to use the cached data.
*/
const CachedComponentStatic = async () => {
  'use cache';
  const tasks = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  await setTimeout(2000);
  const tasksData = await tasks.json();

  return <div className='border-2 border-blue-500 p-4'>
    <p className="text-2xl font-bold">Static Component</p>
    {tasksData.map((task: any) => (
      <div key={task.id}>{task.title}</div>
    ))}
  </div>
};

/* 
  Dynamic - relies on request-specific data, 
  rendered at request time, not part of the static HTML shell
*/
const CachedComponentDynamic = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { limit } = await searchParams;
  await setTimeout(4000);
  return <TodoList limit={Number(limit) || 5} />
};

/* 
  Dynamic - but cached and not rely on request-specific data, 
  part of inner shell
*/
const TodoList = async ({ limit }: { limit: number }) => {
  'use cache';
  const tasks = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit || 5}`);
  await setTimeout(2000);
  const tasksData = await tasks.json();

  return <div className='border-2 border-green-500 p-4 w-120 h-40 overflow-y-auto'>
    <p className="text-2xl font-bold">Dynamic Component</p>
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
        <p className="text-2xl font-bold">Request-specific(Not prerendered) Dynamic Component</p>
        <CachedComponentDynamic searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<div className='border-2 border-green-500 p-4 w-120 h-40'>Loading cached...</div>}>
        {/* This is a dynamic component, but cached and not rely on request-specific data, part of inner shell */}
        <p className="text-2xl font-bold">Cached Dynamic Component</p>
      </Suspense>
    </div>
  );
}
