import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function Redirect() {
  const originalUrl = useLoaderData();
  useEffect(() => {
    if (originalUrl) {
      window.location.replace(originalUrl);
    }
  }, [originalUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to original URL...</p>
      </div>
    </div>
  );
}
