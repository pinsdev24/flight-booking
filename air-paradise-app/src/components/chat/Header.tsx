"use client";

import React, { useState } from 'react';

interface HeaderProps {
  onResetChat: () => void;
}

export function Header({ onResetChat }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100 dark:bg-gray-900/90 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
              <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12Z" fill="currentColor" opacity="0.2"/>
              <path d="M16.25 3.75L14.5 9L9.5 4L8.25 6L12.75 10.5H5.5L4 13H12.75L10.75 19.25L12 20L18.5 10.5H21.5L16.25 3.75Z" fill="currentColor"/>
            </svg>
          </div>
          
          <div>
            <h1 className="font-bold flex flex-col sm:flex-row sm:items-center">
              <span className="text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AIR PARADISE</span>
              <span className="mt-1 sm:mt-0 sm:ml-2 text-xs sm:text-sm font-medium bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full inline-flex items-center">Chatbot</span>
            </h1>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {menuOpen ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden sm:flex space-x-4 items-center">
          <button 
            onClick={onResetChat}
            className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1.5 px-3 rounded-full transition-colors"
            aria-label="New session"
            title="Reset chat and start a new session"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1.5">
              <path d="M2 12C2 16.4183 5.58172 20 10 20C14.4183 20 18 16.4183 18 12C18 7.58172 14.4183 4 10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 7L2 4L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 17L22 14L19 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            New session
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-lg dark:bg-gray-900" id="mobile-menu">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <button
              onClick={() => {
                onResetChat();
                setMenuOpen(false);
              }}
              className="w-full text-left flex items-center justify-center py-2 px-3 rounded-md bg-blue-100 text-blue-800"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M2 12C2 16.4183 5.58172 20 10 20C14.4183 20 18 16.4183 18 12C18 7.58172 14.4183 4 10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 7L2 4L5 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 17L22 14L19 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              New session
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
