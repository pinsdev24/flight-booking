"use client";

import React from 'react';

interface HeaderProps {
  onResetChat: () => void;
}

export function Header({ onResetChat }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 app-header">
      <div className="max-w-screen-lg mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12Z" fill="#3B82F6" opacity="0.2"/>
              <path d="M16.25 3.75L14.5 9L9.5 4L8.25 6L12.75 10.5H5.5L4 13H12.75L10.75 19.25L12 20L18.5 10.5H21.5L16.25 3.75Z" fill="#3B82F6"/>
            </svg>
          </div>
          <h1 className="font-bold">
            <span className="text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AIR PARADISE</span>
            <span className="ml-2 text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">Chatbot</span>
          </h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button 
            onClick={onResetChat}
            className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1.5 px-3 rounded-full transition-colors"
            aria-label="Nouvelle session"
            title="Réinitialiser le chat et démarrer une nouvelle session"
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
    </header>
  );
}

export default Header;
