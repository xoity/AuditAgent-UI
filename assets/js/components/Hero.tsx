import React from 'react';

const Hero = () => {
  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Automated Security Audits</h1>
          <p className="py-6">
            Enforce policies, detect vulnerabilities, and remediate issues automatically across your infrastructure.
          </p>
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-ghost ml-2">View Demo</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
