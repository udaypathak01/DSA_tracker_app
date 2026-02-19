import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import DSAProvider from "./context/DSAProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Topics from "./pages/Topics";
import LoveBubberSheet from "./pages/LoveBubberSheet";
import KunalBootcampSheet from "./pages/KunalBootcampSheet";
import StriverA2ZSheet from "./pages/StriverA2ZSheet";
import Resources from "./pages/Resources";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";

/**
 * Main App Component
 * Sets up routing and global providers including:
 * - HelmetProvider for SEO
 * - AuthProvider for authentication
 * - DSAProvider for state management
 * - Protected routes for authenticated features
 */
function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <DSAProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes - wrapped in MainLayout */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/topics" element={<Topics />} />
                        <Route path="/love-bubber-sheet" element={<LoveBubberSheet />} />
                        <Route path="/kunal-bootcamp" element={<KunalBootcampSheet />} />
                        <Route path="/striver-a2z" element={<StriverA2ZSheet />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
          <Toaster position="bottom-right" />
          <Analytics />
        </DSAProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
