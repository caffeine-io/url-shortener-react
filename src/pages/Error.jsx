import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  const is404 = error.status === 404;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          {is404 ? "Not Found" : "Oops!"}
        </h1>
        <p className="text-gray-600 mb-4">
          {is404
            ? "The shortened URL you're looking for doesn't exist."
            : "Sorry, something went wrong. Please try again later."}
        </p>
      </div>
    </div>
  );
}
