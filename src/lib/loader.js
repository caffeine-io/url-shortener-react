export const apiUrl = import.meta.env.VITE_BASE_URL;

export const createShortUrlAction = async ({ request }) => {
  const formData = await request.formData();
  const url = formData.get("url");
  try {
    const response = await fetch(`${apiUrl}/api/urls`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create short URL");
    }
    const shortUrl = await response.json();
    console.log(shortUrl);
    return shortUrl;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const redirectLoader = async ({ params }) => {
  console.log(params);
  try {
    const response = await fetch(`/api/urls/${params.shortId}`);
    if (!response.ok) {
      throw new Response("Not Found", { status: 404 });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to load URL", error);
  }
};
