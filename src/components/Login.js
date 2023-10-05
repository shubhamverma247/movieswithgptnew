import React, { useRef, useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../utils/configs/firebase";
import {
  validateSignInForm,
  validateSignUpForm,
} from "../utils/validators/validateForm";
import { addUser } from "../utils/slices/userSlice";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const fullName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignForm((previous) => !previous);
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const submitForm = () => {
    if (isSignInForm) {
      const message = validateSignInForm(
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      // signing in user
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}-${errorMessage}`);
        });
    } else {
      const message = validateSignUpForm(
        fullName.current.value,
        email.current.value,
        password.current.value
      );
      setErrorMessage(message);
      if (message) return;

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/58245885?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}-${errorMessage}`);
        });
    }
  };
  return (
    <div>
      <Header />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-9/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12 p-12 bg-black my-32 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl  py-4">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            ref={fullName}
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          ref={email}
          placeholder="Email Address"
          className="p-2 my-2 w-full bg-gray-700"
        />
        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-2 my-2 w-full bg-gray-700"
        />
        {errorMessage && (
          <p className="font-bold text-red-600 text-xl">{errorMessage}</p>
        )}
        <button
          className="py-2 my-4 bg-red-600 w-full rounded-lg"
          onClick={submitForm}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {isSignInForm && (
          // <div className="text-center">
          //   <FcGoogle onClick={signInWithGoogle}></FcGoogle>
          // </div>
          <div className="flex justify-center items-center">
            <div
              onClick={signInWithGoogle}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
              <FcGoogle size={30} />
            </div>
          </div>
        )}
        <p className="cursor-pointer my-4" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
