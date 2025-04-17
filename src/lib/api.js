export default async function handler(req, res) {
    const API_KEY = "2315f418ddcc4af1be5bcc8f0340d6ee";
    const query = req.query.q || ""; // Default query
    const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "error") {
        return res.status(400).json({ error: data.message });
      }
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong fetching news." });
    }
  }
  