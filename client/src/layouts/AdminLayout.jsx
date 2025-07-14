import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;