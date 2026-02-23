export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { dataPoints } = req.body;

  if (!dataPoints || dataPoints.length === 0) {
    return res.status(400).json({ error: 'No data points provided' });
  }

  const prompt = `You are a hyper-perceptive digital intelligence analyst. Using ONLY the following publicly available data points, construct a deeply unsettling yet accurate psychological and professional profile.

Your analysis should feel like the subject is being *seen* — like you've picked up on signals they didn't know they were broadcasting. Be precise, inferential, and surprisingly specific. Reference the actual handles, URLs, and domains provided. Cross-correlate across platforms to find patterns the subject wouldn't expect anyone to notice. Avoid generic observations.

Data:
${dataPoints.join('\n')}

Return ONLY a valid JSON object with this structure:
{
  "subject_label": "3-5 word identity archetype that cuts to the essence",
  "tagline": "One sentence that makes them feel seen",
  "sections": [
    {
      "id": "01",
      "title": "PSYCHOLOGICAL SIGNATURE",
      "status": "HIGH CONFIDENCE",
      "content": "3-4 sentences. Deep personality read using the data. Reference specific platforms/handles. Make it feel eerily accurate.",
      "tags": ["3-5 short trait tags"],
      "confidence": 87
    },
    {
      "id": "02",
      "title": "HOW YOU THINK",
      "status": "CONFIRMED",
      "content": "3-4 sentences on cognitive style, problem-solving approach, and learning patterns inferred from platform usage.",
      "tags": ["3-5 tags"],
      "confidence": 82
    },
    {
      "id": "03",
      "title": "WHAT DRIVES YOU",
      "status": "INFERRED",
      "content": "3-4 sentences on core motivations and underlying drives visible in their digital footprint.",
      "tags": ["3-5 tags"],
      "confidence": 79
    },
    {
      "id": "04",
      "title": "HIDDEN STRENGTHS",
      "status": "DETECTED",
      "content": "3-4 sentences on abilities or traits they probably underestimate in themselves.",
      "tags": ["3-5 tags"],
      "confidence": 74
    },
    {
      "id": "05",
      "title": "TRAJECTORY PROJECTION",
      "status": "MODELED",
      "content": "3-4 sentences on where they are headed professionally and personally.",
      "tags": ["3-5 tags"],
      "confidence": 71
    }
  ]
}

The goal: when they read this, they think "how the HELL do they know that about me."
Return ONLY valid JSON. No markdown fences, no explanation.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Anthropic API error' });
    }

    const raw = data.content.map(b => b.text || '').join('');
    const clean = raw.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
