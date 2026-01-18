export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { startLocation, destination } = req.body;

    if (!startLocation || !destination) {
      return res.status(400).json({ error: 'Missing locations' });
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a campus navigation assistant for the University of Ottawa.

Give clear, step-by-step walking directions from
${startLocation} to ${destination}.

Include:
- Approximate walking time
- Landmarks
- Turn-by-turn directions
- Indoor tunnels or passageways if applicable
- Floor numbers if relevant

Format as a numbered list.
                  `.trim()
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await geminiResponse.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;

    return res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to get directions' });
  }
}