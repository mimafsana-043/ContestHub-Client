import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Welcome, {user?.displayName || 'User'}!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Email</div>
                <div className="stat-value text-lg">{user?.email}</div>
              </div>
              
              <div className="stat bg-base-200 rounded-lg">
                <div className="stat-title">Account Status</div>
                <div className="stat-value text-lg">Active</div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="btn btn-primary">My Contests</button>
                <button className="btn btn-secondary">Create Contest</button>
                <button className="btn btn-accent">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
