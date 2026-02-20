import { Link, useNavigate, Outlet } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('player');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">TOCA Player Portal</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              to="/home"
              className="py-4 px-2 border-b-2 border-transparent hover:border-blue-500"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="py-4 px-2 border-b-2 border-transparent hover:border-blue-500"
            >
              About TOCA
            </Link>
            <Link
              to="/profile"
              className="py-4 px-2 border-b-2 border-transparent hover:border-blue-500"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;