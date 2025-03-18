import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Jobs from './components/Jobs';
import AdminDashboard from './components/AdminDashboard';
import AddNewJob from './components/AddNewJob';
import Header from './components/Header';
import JobList from './components/JobList';
import ViewApplications from './components/ViewApplications';
import LandingPage from './components/LandingPage';

// Import static pages
import CopyrightPage from './components/CopyrightPage';
import ContactPage from './components/ContactPage';
import HelpPage from './components/HelpPage';
import ServicePage from './components/ServicePage';
import BlogPage from './components/blog';
import EmployersPage from './components/employers';
import InformationPage from './components/information';
import TermsOfUsePage from './components/TermsOfUse';

// Import ForgotPassword and ResetPassword components
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Import Payment, Courses, Chatbot, and Interview components
import Payment from './components/Payment';
import Courses from './components/courses';  // ✅ Import Courses Page
import Chatbot from './components/Chatbot';  // ✅ Import Chatbot Page
import Interview from './components/interview';  // ✅ Import Interview Page

import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      {/* Common Header for all routes */}
      <Header />

      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Static Pages Routes */}
        <Route path="/copyright" element={<CopyrightPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/employers" element={<EmployersPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/terms" element={<TermsOfUsePage />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Forgot Password Route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Reset Password Route */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Register Route */}
        <Route path="/register" element={<Register />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<Navigation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />

        {/* Payment Route */}
        <Route path="/payment" element={<Payment />} />

        {/* ✅ Courses Page Route (Fixes Blank Page) */}
        <Route path="/courses" element={<Courses />} />

        {/* ✅ Chatbot Page Route */}
        <Route path="/chatbot" element={<Chatbot />} />

        {/* ✅ Interview Page Route */}
        <Route path="/interview" element={<Interview />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/add-job" element={<AddNewJob />} />
        <Route path="/admin-dashboard/job-list" element={<JobList />} />
        <Route path="/admin-dashboard/view-applications" element={<ViewApplications />} />
      </Routes>
    </Router>
  );
};

export default App;
