import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Dashboard from "./admin/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Home from "./components/Home";
import Abouts from "./components/Abouts";
import Besiness from "./components/ProjectDetails";
import NewUpdate from "./components/NewUpdate";
import Contactus from "./components/Contactus";
import NewsDetail from "./components/NewsDetail";
import Joinus from "./components/Joinus";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/abouts" element={<Abouts />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projectdetails" element={<ProjectDetails />} />
        <Route path="/joinus" element={<Joinus />} />

        <Route path="/news-updates" element={<NewUpdate />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/news/:id" element={<NewsDetail />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
