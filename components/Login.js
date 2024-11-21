import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <LoginButton onClick={() => signOut()}>Sign out</LoginButton>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <LoginButton onClick={() => signIn()}>Sign in</LoginButton>
    </>
  );
}

const LoginButton = styled.button`
  background-color: var(--color-text-primary);
`;
