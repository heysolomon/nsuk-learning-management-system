import React, {  useState } from 'react';

import Sidebar from '../../../partials/Sidebar';
import Header from '../../../partials/Header';
import WelcomeBanner from '../../../partials/dashboard/WelcomeBanner';

function Dashboard({ currentUser, greeting }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // console.log(currentUser)
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;