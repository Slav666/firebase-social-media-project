import { provider, auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  return (
    <h1>
      <p>Sign i with google</p>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </h1>
  );
};
