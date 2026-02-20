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
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 px-2">TOCA Player Portal</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 mr-1 mt-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              to="/home"
              className="py-4 flex-1 text-center border-b-2 border-transparent hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="py-4 flex-1 text-center border-b-2 border-transparent hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              About TOCA
            </Link>
            <Link
              to="/profile"
              className="py-4 flex-1 text-center border-b-2 border-transparent hover:border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg"
            >
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-2xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;