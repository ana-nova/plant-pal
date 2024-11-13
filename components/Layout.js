import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  reminders,
  onEditReminder,
  plants,
}) {
  return (
    <>
      <Header />
      <hr />
      <main>{children}</main>
      <Footer
        plants={plants}
        reminders={reminders}
        onEditReminder={onEditReminder}
      />
    </>
  );
}
