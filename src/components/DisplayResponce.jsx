import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function DisplayResponce({ apiRes }) {
  const displayLoadingState = useSelector((state) =>
    state.speech.loading
  );
  if (displayLoadingState) {
    return <h3 className="text-white mt-5">Loading...</h3>;
  }
  return (
    <>
      <div className="h-screen bg-grey-600">
        <div className="text-white p-6 mt-5 w-auto flex justify-center items-center">
          {apiRes}
        </div>
      </div>
    </>
  );
}

export default DisplayResponce;
