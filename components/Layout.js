import Footer from "./Footer";
import Header from "./Header";

export default function Layout({
  children,
  plants,
  reminders,
  onEditReminder,
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
