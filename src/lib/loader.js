import { isValidURL } from "../utils/urlValidator";

export const apiUrl = import.meta.env.VITE_BASE_URL;

export const createShortUrlAction = async ({ request }) => {
  const formData = await request.formData();
  const url = formData.get("url").trim();
  if (!url) {
    return { error: "Please enter a URL" };
  }
  if (!isValidURL(url)) {
    return { error: "Please enter a valid URL (e.g., https://example.com)" };
  }
  try {
    const response = await fetch(`${apiUrl}/api/urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });
    const data = await response.json();
    if (!response.ok) {
      const zodError = data.errors?.[0]?.message || "Please enter a valid URL";
      return { error: zodError };
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const redirectLoader = async ({ params }) => {
  try {
    const response = await fetch(`${apiUrl}/api/urls/${params.shortId}`);
    if (response.status === 404) {
      throw new Response("Not Found", {
        status: 404,
        statusText: "Short URL not found",
      });
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Error", {
      status: 500,
      statusText: "Internal server error",
    });
  }
};
