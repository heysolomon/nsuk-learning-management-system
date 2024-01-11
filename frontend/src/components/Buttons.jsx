import React from 'react';

export function Button({ children, styling, ...props }) {
  return (
    <button
      className={`btn bg-indigo-500 hover:bg-indigo-600 text-white w-full ${styling}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLarge({ children }) {
  return (
    <button className="btn-lg bg-indigo-500 hover:bg-indigo-600 text-white">
      {children}
    </button>
  );
}
