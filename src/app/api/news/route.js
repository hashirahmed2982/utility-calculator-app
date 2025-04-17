// src/app/api/news/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "bmi";
  
    const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "error") {
        return new Response(
          JSON.stringify({ error: data.message }),
          { status: 400 }
        );
      }
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Something went wrong fetching news." }),
        { status: 500 }
      );
    }
  }
  