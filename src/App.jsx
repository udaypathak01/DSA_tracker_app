import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import DSAProvider from "./context/DSAProvider";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
/**
 * Main App Component
 * Sets up routing and global providers
 */
function App() {
  return (
    <DSAProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </Router>
      <Toaster position="bottom-right" />
      <Analytics />
    </DSAProvider>
  );
}

export default App;
