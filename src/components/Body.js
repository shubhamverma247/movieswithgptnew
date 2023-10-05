import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div className="w-[100%] h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/9db4a880-3034-4e98-bdea-5d983e86bf52/b5953637-091d-4e02-9754-2bfadc8a8f7c/IN-en-20230925-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-center bg-cover">
      <div className="w-[100%] h-[100vh] bg-[rgba(0,0,0,0.5)]">
        <RouterProvider router={appRouter}></RouterProvider>
      </div>
    </div>
  );
};

export default Body;
