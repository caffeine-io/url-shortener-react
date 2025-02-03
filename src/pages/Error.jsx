import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-600 mb-4">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-gray-500 italic">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  );
}
