import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/footer';
import NavbarAdmin from '../components/admin/navbar';
import FooterAdmin from '../components/admin/footer';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const isRouteAdmin = router.asPath.startsWith('/dashboard');

  return (
    <div>
      {isRouteAdmin ? <NavbarAdmin /> : <Navbar />}
      {children}
      {isRouteAdmin ? <FooterAdmin /> : <Footer />}
    </div>
  );
};

export default DefaultLayout;
