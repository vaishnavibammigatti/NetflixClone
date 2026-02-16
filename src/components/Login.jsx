import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG, USER_ICON } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignIn = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    //Validate form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;
    if (!isSignInForm) {
      //Sign Up form

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              {USER_ICON}
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      //Sign In form
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND_IMG}
          className="w-full"
          alt="backgroundImg"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-black text-white text-l w-4/12 my-24 absolute mx-auto left-0 right-0 p-8 space-y-6 opacity-80"
      >
        <h1 className="font-bold text-3xl p-5">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 w-full bg-gray-700"
            id="fullName"
            ref={name}
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 w-full bg-gray-700"
          ref={email}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 w-full bg-gray-700"
          ref={password}
          id="password"
        />
        <p className="text-red-700 font-bold">{errorMessage}</p>
        <button
          className="p-4 bg-red-600 w-full rounded-lg"
          onClick={() => handleButtonClick()}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-6 cursor-pointer" onClick={toggleSignIn}>
          {isSignInForm
            ? "New to Netflix? Sign up Now."
            : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
