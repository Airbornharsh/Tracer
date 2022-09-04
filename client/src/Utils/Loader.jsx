import React, { useContext } from "react";
import Context from "../Context/Context";

const Loader = () => {
  const UtilCtx = useContext(Context).util;

  return (
    <div>
      {UtilCtx.loader && (
        // <div className="fixed top-0 left-0 z-40 bg-black">
        //   <p className="flex items-center justify-center w-screen h-screen loader">
        //     Please Wait ...
        //   </p>
        // </div>
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.4)]">
          <div className=" lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
