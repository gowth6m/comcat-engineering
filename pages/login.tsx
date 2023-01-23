import Layout from "@/components/Layout";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initFirebase } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginPage() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [loggingIn, setLoggingIn] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  //   const { data: session } = useSession();
  //   const { redirect } = router.query;

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  if (user) {
    router.push("/");
  }

  return (
    <Layout title="GCE: Login">
      {loggingIn || loading ? <Loading /> : <div></div>}

      <div className="flex justify-center align-middle">
        <button onClick={signIn} className="pri-button">
          {" "}
          Login with Google{" "}
        </button>
      </div>
    </Layout>
  );
}
