import React from 'react';

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <div className="w-full navbar bg-base-100 lg:hidden">
            <div className="flex-none">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div> 
            <div className="flex-1 px-2 mx-2">Audit Agent</div>
        </div>
        
        <div className="p-8 w-full h-full">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Audits</div>
                        <div className="stat-value">89</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
                
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Compliance Score</div>
                        <div className="stat-value text-success">94%</div>
                        <div className="stat-desc">↗︎ 4% (30 days)</div>
                    </div>
                </div>
                
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Active Devices</div>
                        <div className="stat-value">12</div>
                        <div className="stat-desc">↘︎ 1 (1 day)</div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Device</th>
                            <th>Action</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>web-server-01</td>
                            <td>Audit Run</td>
                            <td><div className="badge badge-success">Pass</div></td>
                            <td>2023-10-26 14:30</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>db-server-01</td>
                            <td>Policy Update</td>
                            <td><div className="badge badge-info">Applied</div></td>
                            <td>2023-10-26 12:15</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>web-server-02</td>
                            <td>Remediation</td>
                            <td><div className="badge badge-warning">Fixed</div></td>
                            <td>2023-10-25 09:45</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li className="mb-4"><a className="text-xl font-bold">AuditAgent</a></li>
          <li><a className="active">Overview</a></li>
          <li><a>Devices</a></li>
          <li><a>Policies</a></li>
          <li><a>Audits</a></li>
          <li><a>Settings</a></li>
        </ul>
      
      </div>
    </div>
  );
};

export default Dashboard;
