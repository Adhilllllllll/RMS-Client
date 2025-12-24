import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import ReviewerDashboard from "./pages/dashboards/ReviewerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import Login from "./pages/Login";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import AdvisorDashboard from "./pages/dashboards/AdvisorDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import RecentActivity from "./pages/admin/RecentActivity";
import ReviewStatus from "./pages/admin/ReviewStatus";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import Reviews from "./pages/student/Reviews";
import Progress from "./pages/student/Progress";
import Tasks from "./pages/student/Tasks";
import StudyMaterials from "./pages/student/StudyMaterials";
import Chat from "./pages/student/Chat";
import IssuesSuggestions from "./pages/student/IssuesSuggestions";
import Notifications from "./pages/student/Notifications";
import StudentProfile from "./pages/student/Profile";
import Availability from "./pages/reviewer/Availability";
import ReviewRequests from "./pages/reviewer/ReviewRequests";
import ReviewSession from "./pages/reviewer/ReviewSession";
import History from "./pages/reviewer/History";
import Performance from "./pages/reviewer/Performance";
import ReviewerChat from "./pages/reviewer/Chat";
import ReviewerProfile from "./pages/reviewer/Profile";
import AdvisorStudents from "./pages/advisor/Students";
import AdvisorReviews from "./pages/advisor/Reviews";
import AdvisorReviewerAvailability from "./pages/advisor/ReviewerAvailability";
import AdvisorCalendar from "./pages/advisor/Calendar";
import AdvisorNotes from "./pages/advisor/NotesTemplates";
import AdvisorAnalytics from "./pages/advisor/ReportsAnalytics";
import AdvisorProfile from "./pages/advisor/Profile";
import AdvisorChat from "./pages/advisor/Chat";
import { useSelector } from "react-redux";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* ROOT ROUTE */}
        <Route
          path="/"
          element={
            isAuthenticated && user ? (
              user.role === "admin" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : user.role === "reviewer" ? (
                <Navigate to="/reviewer/dashboard" replace />
              ) : user.role === "student" ? (
                <Navigate to="/student/dashboard" replace />
              ) : user.role === "advisor" ? (
                <Navigate to="/advisor/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <ManageUsers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/recent-activity"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <RecentActivity />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/review-status"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <ReviewStatus />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute role="admin">
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <Settings />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* REVIEWER */}
        <Route
          path="/reviewer/dashboard"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <ReviewerDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/availability"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <Availability />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/requests"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <ReviewRequests />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/session"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <ReviewSession />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/history"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <History />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/performance"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <Performance />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/chat"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <ReviewerChat />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviewer/profile"
          element={
            <ProtectedRoute role="reviewer">
              <Layout>
                <ReviewerProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <StudentDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/reviews"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Reviews />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/progress"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Progress />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/tasks"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Tasks />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/study-materials"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <StudyMaterials />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/chat"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Chat />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/issues"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <IssuesSuggestions />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <StudentProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADVISOR */}
        <Route
          path="/advisor/dashboard"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/students"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorStudents />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/reviews"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorReviews />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/availability"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorReviewerAvailability />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/calendar"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorCalendar />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/chat"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorChat />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/notes"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorNotes />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/analytics"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorAnalytics />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/advisor/profile"
          element={
            <ProtectedRoute role="advisor">
              <Layout>
                <AdvisorProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
