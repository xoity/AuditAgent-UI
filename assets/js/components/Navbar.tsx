import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">AuditAgent</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Documentation</a></li>
          <li><a>Pricing</a></li>
          <li><a className="btn btn-primary btn-sm ml-2">Login</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
