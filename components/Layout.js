import styled from "styled-components";
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
      <StyledHr />
      <main>{children}</main>
      <Footer
        plants={plants}
        reminders={reminders}
        onEditReminder={onEditReminder}
      />
    </>
  );
}

const StyledHr = styled.hr`
  margin-top: -50px;
`;
