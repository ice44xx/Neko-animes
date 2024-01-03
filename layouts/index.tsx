import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/footer';
import NavbarAdmin from '../components/admin/navbar';
import FooterAdmin from '../components/admin/footer';
import NavbarUser from '../components/user/navbar';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const isRouteAdmin = router.asPath.startsWith('/neko-admin/dashboard');
  const isRouteLoginAdmin = router.asPath === '/neko-admin';

  useEffect(() => {
    const token = sessionStorage.getItem('nekoanimes-token');
    setIsLogged(!!token);
  }, []);

  if (isRouteLoginAdmin) {
    return <>{children}</>;
  }

  return (
    <div>
      {isRouteAdmin ? <NavbarAdmin /> : isLogged ? <NavbarUser /> : <Navbar />}
      {children}
      {isRouteAdmin ? <FooterAdmin /> : <Footer />}
    </div>
  );
};

export default DefaultLayout;
