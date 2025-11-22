import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/style.css';

const App = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Audit Agent</h1>
            <p className="py-6">
              Secure your infrastructure with automated auditing and remediation.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
