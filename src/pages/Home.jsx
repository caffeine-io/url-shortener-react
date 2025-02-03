// src/pages/Home.jsx
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HomePage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const [copied, setCopied] = useState(false);
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${host}/${actionData.shortUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>

          <Form method="post" className="space-y-4">
            <div>
              <input
                type="url"
                name="url"
                placeholder="Enter your URL here"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={navigation.state === "submitting"}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {navigation.state === "submitting"
                ? "Shortening..."
                : "Shorten URL"}
            </button>
          </Form>

          {actionData?.error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {actionData.error}
            </div>
          )}

          {actionData?.shortUrl && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">Shortened URL:</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-blue-500 break-all">
                  {host}/{actionData.shortUrl}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
