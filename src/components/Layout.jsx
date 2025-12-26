import Header from "./Header";
import Footer from "./Footer";
import "../styles/components/Layout.css";

const Layout = ({ children }) => {
  return (<>
    <div className="app-layout">
      <Header />

      <main className="app-main">
        {children}
        
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default Layout;
