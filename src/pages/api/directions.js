export default async function handler(req, res) {
  const { start, end } = req.query;

  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a campus navigation assistant for the University of Ottawa. Provide clear, step-by-step walking directions from ${start} to ${end} on the uOttawa campus in Ottawa, Canada.`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();
    console.log('Google API raw response:', JSON.stringify(data, null, 2));

    // Extract directions text safely
    const directions = data.candidates?.[0]?.content?.parts?.[0]?.text || "No directions returned.";

    res.status(200).json({ directions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
