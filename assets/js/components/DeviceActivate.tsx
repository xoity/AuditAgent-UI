import React, { useState } from 'react';

const DeviceActivate = () => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Verifying...');
    
    try {
      const response = await fetch('/api/device/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken') || '',
        },
        body: JSON.stringify({ user_code: code }),
      });
      
      if (response.ok) {
        setStatus('Success! You can close this window and return to the terminal.');
      } else {
        // If 401, redirect to login (or show message)
        if (response.status === 401) {
            setStatus('Error: You must be logged in to verify a device.');
            // window.location.href = '/admin/login/?next=/device/activate'; // Simple hack for now
        } else {
            const data = await response.json();
            setStatus(`Error: ${data.message || data.error || 'Unknown error'}`); // Ninja returns 'message' on some errors? No, usually detail or custom schema
        }
      }
    } catch (err) {
      setStatus('Error: Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Device Activation</h2>
          <p className="text-center mb-4">Enter the code displayed on your terminal</p>
          
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="ABCD-EFGH" 
              className="input input-bordered w-full text-center text-2xl tracking-widest uppercase mb-4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={9}
            />
            <div className="card-actions justify-center">
              <button type="submit" className="btn btn-primary w-full">Verify</button>
            </div>
          </form>
          
          {status && (
            <div className={`alert mt-4 ${status.includes('Success') ? 'alert-success' : 'alert-error'}`}>
              <span>{status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default DeviceActivate;
