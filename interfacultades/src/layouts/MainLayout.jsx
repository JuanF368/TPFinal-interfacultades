import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import { useState } from 'react';

const MainLayout = () => {
  const [abierto, setAbierto] = useState(false);

  return (
     <div className="min-h-screen relative ">
      <Header abierto={abierto} setAbierto={setAbierto}/>
      <SideBar abierto={abierto} />
        <div className={`pt-16 pl-[4rem] ${abierto ? 'pl-[16rem]' : ''} transition-all duration-300 pb-[100px]`}>
          <main className="min-h-screen p-4">
            <Outlet />
          </main>
        </div>
        <Footer />
    </div>
  );
};

export default MainLayout;
