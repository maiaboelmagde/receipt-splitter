import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-6xl font-bold text-indigo-500">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-gray-600">The page you are looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-indigo-500 px-5 py-2 text-white hover:bg-indigo-600"
      >
        Back to home
      </Link>
    </div>
  );
}
