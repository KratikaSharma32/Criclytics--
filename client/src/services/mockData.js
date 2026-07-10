// Mock data layer — mirrors the shape of SportMonks / CricAPI responses so
// swapping in real fetch calls later (services/cricketApi.js) is a drop-in.

export const liveMatches = [
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

export const upcomingMatches = [
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
  {
    id: "u3",
    teamA: { name: "New Zealand", short: "NZ", flag: "🇳🇿" },
    teamB: { name: "Afghanistan", short: "AFG", flag: "🇦🇫" },
    venue: "Eden Park",
    date: "Aug 24",
    time: "10:00 AM",
  },
];

export const completedMatches = [
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
  {
    id: "c3",
    teamA: { name: "South Africa", short: "SA", flag: "🇿🇦" },
    teamB: { name: "New Zealand", short: "NZ", flag: "🇳🇿" },
    winner: "NZ",
    margin: "won by 7 runs",
    date: "Aug 18, 2024",
    mom: "Kane Williamson",
  },
];

export const teams = {
  india: {
    name: "India",
    board: "BCCI",
    ranking: 1,
    captain: "Rohit Sharma",
    coach: "Rahul Dravid",
    established: 1928,
    recentForm: ["W", "W", "W", "L", "W", "W"],
    jerseyColor: "#1E3A8A",
    squad: ["Rohit Sharma (C)", "Virat Kohli", "Shubman Gill", "Rishabh Pant", "Jasprit Bumrah"],
  },
};

export const players = {
  "virat-kohli": {
    name: "Virat Kohli",
    country: "India",
    flag: "🇮🇳",
    role: "Top-order Batsman",
    battingStyle: "Right Hand Bat",
    bowlingStyle: "Right Arm Medium",
    stats: {
      matches: 275,
      runs: 12898,
      average: 57.42,
      hundreds: 47,
      fifties: 66,
      best: 183,
    },
    formatStats: [
      { format: "Tests", m: 111, r: 8848, avg: 49.71, hundreds: 29, fifties: 29 },
      { format: "ODIs", m: 275, r: 12898, avg: 57.42, hundreds: 47, fifties: 66 },
      { format: "T20Is", m: 115, r: 4008, avg: 52.05, hundreds: 1, fifties: 37 },
    ],
  },
};

export const runRateSeries = {
  overs: [0, 10, 20, 30, 40, 50],
  india: [0, 5.4, 5.1, 5.6, 5.2, 5.3],
  australia: [0, 4.8, 4.6, 5.0, 4.9, 4.96],
};

export const winProbability = { teamA: 72, teamB: 28 };

export const topPlayers = [
  { name: "Virat Kohli", runs: 871 },
  { name: "Rohit Sharma", runs: 742 },
  { name: "Glenn Maxwell", runs: 632 },
];

export const news = [
  {
    id: "n1",
    title: "India Clinch Thrilling Victory Against Australia in 1st ODI",
    blurb: "A brilliant all-round performance helps India seal the game.",
    time: "2h ago",
  },
  {
    id: "n2",
    title: "ICC Announces Men's ODI Team of the Year",
    time: "5h ago",
  },
  {
    id: "n3",
    title: "Ben Stokes Ruled Out of Upcoming Series",
    time: "8h ago",
  },
];

export const favorites = {
  matches: [
    { id: "c1", label: "IND vs AUS · 1st ODI, Aug 22, 2024", result: "IND won by 6 wickets" },
    { id: "c2", label: "PAK vs ENG · 2nd T20I, Aug 20, 2024", result: "PAK won by 4 wickets" },
    { id: "c3", label: "SA vs NZ · 1st Test, Aug 18, 2024", result: "NZ won by 7 runs" },
  ],
};
