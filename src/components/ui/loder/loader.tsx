export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full" role="status">
      <div className="w-8 h-8 border-4 border-[#575db1] border-t-transparent rounded-full animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
