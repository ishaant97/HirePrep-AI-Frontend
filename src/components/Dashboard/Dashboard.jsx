import { useAuth } from '../../context/AuthContext';

function Dashboard() {
    const { user, logout } = useAuth();
    return <div>
        <h1>Welcome to the Dashboard {user.name} {user.id} {user.collegeName}</h1>
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            Logout
        </button>
    </div>
}

export default Dashboard;