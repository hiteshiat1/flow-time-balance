import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import Landing from "./pages/Landing";
import DailyView from "./pages/DailyView";
import WellnessLibrary from "./pages/WellnessLibrary";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import HealthDisclaimer from "./pages/HealthDisclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>Hello World - Testing React</div>
    </QueryClientProvider>
  );
}

export default App;
