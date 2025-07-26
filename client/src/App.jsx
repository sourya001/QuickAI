import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Community from "./pages/Community.jsx";
import Reviews from "./pages/Reviews.jsx";
import Layout from "./pages/Layout";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import { useAuth } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";

const AppContent = () => {
  const { isDarkMode, isLoading } = useDarkMode();
  
  if (isLoading) {
    return (
      <div className="bg-primary-custom min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className={`bg-primary-custom text-primary-custom min-h-screen smooth-transition ${isLoading ? 'theme-loading' : ''}`}>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)',
          },
          success: {
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: 'var(--bg-card)',
            },
          },
          error: {
            style: {
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: 'var(--bg-card)',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
};

export default App;
