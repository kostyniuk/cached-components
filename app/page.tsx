const CachedComponent = async () => {
  const tasks = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  const tasksData = await tasks.json();

  console.log(tasksData);

  return <div className='border-2 border-blue-500 p-4'>
    {tasksData.map((task: any) => (
      <div key={task.id}>{task.title}</div>
    ))}
  </div>
};

export default function Home() {
  return (
    <div className="flex flex-col gap-4 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p className="text-2xl font-bold">Hey, I'm root</p>
      <CachedComponent />
    </div>
  );
}
