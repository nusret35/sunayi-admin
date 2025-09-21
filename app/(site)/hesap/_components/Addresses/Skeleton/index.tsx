const Skeleton = () => {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto">
      {[1, 2, 3].map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border border-gray-200 p-4"
        >
          <div className="grid animate-pulse grid-cols-2 gap-2 text-sm">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="col-span-2 h-4 w-full rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
