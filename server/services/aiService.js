import axios from "axios";

async function callOpenAI(prompt) {
  const { data } = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, timeout: 15000 }
  );
  return data.choices[0].message.content.trim();
}

async function callGemini(prompt) {
  const { data } = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    { contents: [{ parts: [{ text: prompt }] }] },
    { timeout: 15000 }
  );
  return data.candidates[0].content.parts[0].text.trim();
}

// Tries OpenAI, then Gemini, then a rule-based fallback so every AI feature
// still returns something useful with zero keys configured.
async function generate(prompt, ruleBasedFallback) {
  if (process.env.OPENAI_API_KEY) {
    try {
      return { text: await callOpenAI(prompt), source: "openai" };
    } catch (err) {
      console.warn("OpenAI call failed:", err.message);
    }
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      return { text: await callGemini(prompt), source: "gemini" };
    } catch (err) {
      console.warn("Gemini call failed:", err.message);
    }
  }
  return { text: ruleBasedFallback(), source: "rule_based" };
}

export async function matchAnalyst({ match, question }) {
  const prompt = `You are a cricket match analyst. Match state: ${JSON.stringify(match)}.
Question: "${question}"
Answer in 2 short paragraphs using run rate, wickets in hand, partnerships, required rate, and momentum.`;

  return generate(prompt, () => {
    const rr = match.runRate ?? 5;
    const req = match.requiredRate ?? 5;
    const gap = (req - rr).toFixed(1);
    const trend = req > rr ? "climbing" : "under control";
    return (
      `Required rate is ${trend} at ${req} against a current run rate of ${rr} — a gap of ${gap} runs per over. ` +
      `${match.partnership ? `The ${match.partnership} partnership is the key variable right now.` : ""} ` +
      `If the gap keeps widening past over 40, the chasing side needs wickets in hand more than boundaries to stay ahead.`
    );
  });
}

export async function commentarySummary({ commentaryLines }) {
  const prompt = `Summarize these ${commentaryLines.length} cricket commentary lines into exactly 2 paragraphs, covering the overall match arc and the key turning point:\n\n${commentaryLines.join(
    "\n"
  )}`;

  return generate(prompt, () => {
    const count = commentaryLines.length;
    return (
      `Across ${count} balls of commentary, the innings moved through the usual phases — a watchful start, ` +
      `a middle-overs push once the field spread out, and a late acceleration in the closing overs.\n\n` +
      `The clearest turning point came from a cluster of boundaries and a key wicket in the same passage of play, ` +
      `which is where the run rate and required rate crossed and decided the shape of the finish.`
    );
  });
}

export async function fantasyAssistant({ players }) {
  const prompt = `Given this squad data: ${JSON.stringify(
    players
  )}, suggest a captain, vice-captain, 2 safe picks and 2 risky picks for fantasy cricket. Return as a short structured list.`;

  const result = await generate(prompt, () => {
    const sorted = [...players].sort((a, b) => (b.recentForm || 0) - (a.recentForm || 0));
    return JSON.stringify({
      captain: sorted[0]?.name || "Top-order batsman",
      viceCaptain: sorted[1]?.name || "Strike bowler",
      safePicks: sorted.slice(2, 4).map((p) => p.name),
      riskyPicks: sorted.slice(-2).map((p) => p.name),
      note: "Rule-based pick from recent form — connect OPENAI_API_KEY or GEMINI_API_KEY for reasoning-based picks.",
    });
  });
  return result;
}

export async function matchPredictor({ match }) {
  const prompt = `Predict the winner, winning probability and projected final score for this match state: ${JSON.stringify(
    match
  )}. Return as JSON with keys winner, probability, projectedScore.`;

  return generate(prompt, () => {
    const rr = match.runRate ?? 5.3;
    const oversLeft = 10;
    const projected = Math.round((match.teamA?.currentRuns || 250) + rr * oversLeft * 0.9);
    return JSON.stringify({
      winner: match.teamA?.name || "Team batting first",
      probability: 68,
      projectedScore: projected,
      note: "Rule-based projection from current run rate — connect an LLM key for a reasoned prediction.",
    });
  });
}
