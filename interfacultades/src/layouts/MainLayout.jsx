import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
     <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-grow p-4">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default MainLayout;
