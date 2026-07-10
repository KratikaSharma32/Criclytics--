// Bundled fallback so /api/matches/* etc. return sensible data with zero
// API keys configured. Real calls in services/cricketApi.js overwrite this
// once SPORTMONKS_API_TOKEN / CRICAPI_KEY are set in .env.

export const fallbackLive = [
  {
    id: "m1",
    teamA: { name: "India", short: "IND", flag: "🇮🇳", score: "256/5", overs: "48.2" },
    teamB: { name: "Australia", short: "AUS", flag: "🇦🇺", score: "248/7", overs: "50.0" },
    status: "IND won by 6 wickets",
    venue: "Wankhede Stadium, Mumbai",
    runRate: 5.3,
    requiredRate: 4.8,
    partnership: "Kohli & Iyer, 62 (48)",
    isLive: true,
  },
  {
    id: "m2",
    teamA: { name: "Pakistan", short: "PAK", flag: "🇵🇰", score: "178/6", overs: "36.4" },
    teamB: { name: "England", short: "ENG", flag: "🏴", score: "175/8", overs: "50.0" },
    status: "PAK won by 4 wickets",
    venue: "Eden Park",
    runRate: 4.9,
    requiredRate: 4.3,
    partnership: "Rizwan & Shaheen, 21 (14)",
    isLive: true,
  },
];

export const fallbackUpcoming = [
  {
    id: "u1",
    teamA: { name: "Sri Lanka", short: "SL", flag: "🇱🇰" },
    teamB: { name: "Bangladesh", short: "BAN", flag: "🇧🇩" },
    venue: "R. Premadasa Stadium",
    date: "Today",
    time: "3:00 PM",
  },
  {
    id: "u2",
    teamA: { name: "New Zealand", short: "NZ", flag: "🇳🇿" },
    teamB: { name: "South Africa", short: "SA", flag: "🇿🇦" },
    venue: "Kensington Oval",
    date: "Tomorrow",
    time: "7:00 PM",
  },
];

export const fallbackCompleted = [
  {
    id: "c1",
    teamA: { name: "India", short: "IND", flag: "🇮🇳" },
    teamB: { name: "Australia", short: "AUS", flag: "🇦🇺" },
    winner: "IND",
    margin: "won by 6 wickets",
    date: "Aug 22, 2024",
    mom: "Virat Kohli",
  },
  {
    id: "c2",
    teamA: { name: "England", short: "ENG", flag: "🏴" },
    teamB: { name: "Pakistan", short: "PAK", flag: "🇵🇰" },
    winner: "PAK",
    margin: "won by 4 wickets",
    date: "Aug 20, 2024",
    mom: "Shaheen Afridi",
  },
];

export const fallbackTeams = {
  india: {
    name: "India",
    board: "BCCI",
    ranking: 1,
    captain: "Rohit Sharma",
    coach: "Rahul Dravid",
    established: 1928,
    recentForm: ["W", "W", "W", "L", "W", "W"],
    squad: ["Rohit Sharma (C)", "Virat Kohli", "Shubman Gill", "Rishabh Pant", "Jasprit Bumrah"],
  },
};

export const fallbackPlayers = {
  "virat-kohli": {
    name: "Virat Kohli",
    country: "India",
    flag: "🇮🇳",
    role: "Top-order Batsman",
    battingStyle: "Right Hand Bat",
    bowlingStyle: "Right Arm Medium",
    stats: { matches: 275, runs: 12898, average: 57.42, hundreds: 47, fifties: 66, best: 183 },
    formatStats: [
      { format: "Tests", m: 111, r: 8848, avg: 49.71, hundreds: 29, fifties: 29 },
      { format: "ODIs", m: 275, r: 12898, avg: 57.42, hundreds: 47, fifties: 66 },
      { format: "T20Is", m: 115, r: 4008, avg: 52.05, hundreds: 1, fifties: 37 },
    ],
  },
};
