import React, { useEffect, useRef } from "react";
import logo from "../images/logo.png";
import { BsGlobe2 } from "react-icons/bs";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/configs/firebase";
import { addUser, removeUser } from "../utils/slices/userSlice";
import { toggleGPTSearch } from "../utils/slices/gptSlice";
import { changeLanguage } from "../utils/slices/configSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants/constants";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useRef(null);
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.toggleGPT);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleToggle = () => {
    dispatch(toggleGPTSearch());
  };

  const handleLanguageChange = (e) => {
    // or we can use e.target.value
    dispatch(changeLanguage(language.current.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe onauthstatechange callback
    return () => unsubscribe();
  }, []);
  return (
    <div className="max-w-[1170px] mx-auto sticky z-50">
      <div className="grid sm:grid-cols-2 grid-cols-[30%_auto] px-[10px] items-center">
        <div>
          <img alt="logo" src={logo} className="w-[148px]" />
        </div>

        {user && (
          <div className="flex justify-end gap-[10px]">
            {showGptSearch && (
              <>
                <div className="relative ">
                  <BsGlobe2 className="text-white absolute top-[12px] left-[6px] "></BsGlobe2>
                  <select
                    className="bg-[black] text-white border-[1px] border-[white]  sm:pl-5 sm:pr-0 sm:py-[6px] py-[6px] pl-5 pr-0 rounded-[5px]"
                    onChange={handleLanguageChange}
                    ref={language}>
                    {SUPPORTED_LANGUAGES.map((language) => (
                      <option
                        key={language.identifier}
                        value={language.identifier}>
                        {language.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <button
              onClick={handleToggle}
              className="bg-[purple] rounded-[5px] px-[10px] sm:py-[6px] py-[6px] text-white hover:bg-opacity-50">
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>
            <button
              onClick={handleSignOut}
              className="bg-[red] rounded-[5px] px-[10px] sm:py-[6px] py-[6px] text-white hover:bg-opacity-50">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
