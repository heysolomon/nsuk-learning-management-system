import React from 'react';
import LoginButton from '../../../components/AuthButton';

function AdminSignIn() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-[80%] md:w-[60%]">
        <h1 className="text-lg sm:text-2xl md:text-3xl text-center text-slate-800 dark:text-slate-100 font-bold mb-1">
          Staff Authentication ✨
        </h1>
        <LoginButton />
      </div>
    </div>
  );
}

export default AdminSignIn;
