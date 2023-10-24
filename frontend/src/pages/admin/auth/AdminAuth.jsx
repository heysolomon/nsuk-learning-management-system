import React from "react";
import { Outlet } from "react-router-dom";

const AdminAuth = () => {
  return (
    <div className="h-screen md:bg-white flex items-center justify-center md:grid grid-cols-2">
      <Outlet />
      <div className="hidden md:block w-full bg-indigo-600">
        <img
          src="https://images.unsplash.com/photo-1472772049637-f128df70697d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b25saW5lJTIwbGVhcm5pbmclMjBibGFja3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          className="object-cover object-top w-full h-screen opacity-[0.8]"
          alt=""
        />
      </div>
    </div>
  );
};

export default AdminAuth;
