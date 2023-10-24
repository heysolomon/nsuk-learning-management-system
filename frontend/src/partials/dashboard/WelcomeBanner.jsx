import React from 'react';

function WelcomeBanner() {
  return (
    <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
      {/* Background illustration */}
      <div
        className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Welcome,
          {' '}
          Solomon
          {' '}
          👋
        </h1>
        <p className="dark:text-indigo-200">Continue your learning here</p>
      </div>
    </div>
  );
}

export default WelcomeBanner;
