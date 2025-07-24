import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-64 h-full">
        <Sidebar />
      </div>

      {/* Main content: scrollable */}
      <main className="flex-1 h-full overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
