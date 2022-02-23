import React, { FC, useState, useEffect } from 'react';
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

const SignIn: FC = (props) => {
  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);
  console.log(providers?.github)
  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in but in the custom page!
      <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
      {providers?.email && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.email.id)}>
            Email Login Bro
          </button>
        </>
      )}
      {providers?.github && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.github.id)}>
            Github Login Sis
          </button>
        </>
      )}
    </>
  );
};

export default SignIn;