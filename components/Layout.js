import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, reminders, onEditReminder }) {
  return (
    <>
      <Header />
      <hr />
      <main>{children}</main>
      <Footer reminders={reminders} onEditReminder={onEditReminder} />
    </>
  );
}
