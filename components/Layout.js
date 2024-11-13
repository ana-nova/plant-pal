import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <hr />
      <main>{children}</main>
      <Footer />
    </>
  );
}
