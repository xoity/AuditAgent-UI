import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">AuditAgent</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Documentation</a></li>
          <li><a>Pricing</a></li>
          <li><Link to="/dashboard" className="btn btn-primary btn-sm ml-2">Login</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
