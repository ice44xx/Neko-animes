import { ReactNode } from 'react';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/footer';

interface LayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
