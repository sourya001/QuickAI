import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";
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
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
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
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            } 
          />
          <Route 
            path="/reviews" 
            element={
              <PageTransition>
                <Reviews />
              </PageTransition>
            } 
          />
          <Route path="/ai" element={<Layout />}>
            <Route 
              index 
              element={
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              } 
            />
            <Route 
              path="write-article" 
              element={
                <PageTransition>
                  <WriteArticle />
                </PageTransition>
              } 
            />
            <Route 
              path="blog-titles" 
              element={
                <PageTransition>
                  <BlogTitles />
                </PageTransition>
              } 
            />
            <Route 
              path="generate-images" 
              element={
                <PageTransition>
                  <GenerateImages />
                </PageTransition>
              } 
            />
            <Route 
              path="remove-background" 
              element={
                <PageTransition>
                  <RemoveBackground />
                </PageTransition>
              } 
            />
            <Route 
              path="remove-object" 
              element={
                <PageTransition>
                  <RemoveObject />
                </PageTransition>
              } 
            />
            <Route 
              path="review-resume" 
              element={
                <PageTransition>
                  <ReviewResume />
                </PageTransition>
              } 
            />
            <Route 
              path="community" 
              element={
                <PageTransition>
                  <Community />
                </PageTransition>
              } 
            />
          </Route>
        </Routes>
      </AnimatePresence>
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
