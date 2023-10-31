import { useSelector } from "react-redux";
import DisplayResponce from "./components/DisplayResponce";
import SpeechRecog from "./components/SpeechRecog";

function App() {
  const apiResponce = useSelector((state) => state.speech.apiResponces);

  return (
    <>
      <div className="h-screen w-screen bg-gray-600 flex justify-center items-center flex-col p-5">
        <div className=" bg-gray-500 shadow-lg rounded-2xl mt-5">
          <SpeechRecog />
        </div>
        <DisplayResponce apiRes={apiResponce} />
      </div>
    </>
  );
}

export default App;
