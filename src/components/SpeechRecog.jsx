import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  getApiMessage,
  sliceText,
} from "../app/features/speechRecognitionSlice";

function SpeechRecog() {
  const dispatch = useDispatch();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListning = () =>
    SpeechRecognition.startListening({ continuous: true });

  const stopListning = () => SpeechRecognition.stopListening();

  const handleSend = () => {
    stopListning();
    dispatch(getApiMessage(transcript));
    resetTranscript();
  };

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      dispatch(sliceText({ text: transcript }));
    }
  }, [transcript, dispatch, browserSupportsSpeechRecognition]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <textarea
        className="rounded-xl h-48 w-full p-3 resize-none"
        placeholder="Say Something..."
        value={transcript}
        readOnly
      ></textarea>

      <div className="flex flex-wrap justify-center mt-4 flex-col">
        <div>
          <p className="mr-2">Microphone: {listening ? "on" : "off"}</p>
        </div>
        <div>
          <button
            className="bg-red-500 text-white p-3 rounded-2xl mr-2 mt-4"
            onClick={handleSend}
          >
            Send
          </button>
          <button
            className="bg-red-500 text-white p-3 rounded-2xl mr-2 mt-4"
            onClick={startListning}
          >
            Start recording
          </button>
          <button
            className="bg-red-500 text-white p-3 rounded-2xl mr-2 mt-4"
            onClick={stopListning}
          >
            Stop recording
          </button>
          <button
            className="bg-red-500 text-white p-3 rounded-2xl mt-4"
            onClick={resetTranscript}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpeechRecog;
