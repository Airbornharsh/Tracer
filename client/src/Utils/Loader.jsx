import React, { useContext } from "react";
import Context from "../Context/Context";

const Loader = () => {
  const UtilCtx = useContext(Context).util;

  return (
    <div>
      {UtilCtx.loader && (
        <div className="fixed top-0 left-0 z-40 bg-black">
          <p className="flex items-center justify-center w-screen h-screen loader">
            Please Wait ...
          </p>
        </div>
      )}
    </div>
  );
};

export default Loader;
