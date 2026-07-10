import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import NoLiveMatches from "./pages/NoLiveMatches";
import MatchDetails from "./pages/MatchDetails";
import TeamDetails from "./pages/TeamDetails";
import PlayerDetails from "./pages/PlayerDetails";
import Analytics from "./pages/Analytics";
import Favorites from "./pages/Favorites";
import FantasyAssistant from "./pages/FantasyAssistant";
import Subscription from "./pages/Subscription";
import News from "./pages/News";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/no-live-matches" element={<NoLiveMatches />} />
      <Route path="/matches/:id" element={<MatchDetails />} />
      <Route path="/teams/:slug" element={<TeamDetails />} />
      <Route path="/players/:slug" element={<PlayerDetails />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/fantasy-assistant" element={<FantasyAssistant />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/news" element={<News />} />
    </Routes>
  );
}
