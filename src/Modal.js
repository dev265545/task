import { doc, updateDoc } from "firebase/firestore";

import React, { useState } from "react";
import { db } from "./firebase";

function Modal({ onClose, theme, user_id }) {
  const [selected, setSelected] = useState(theme);

  const handleOnclick = (pattern) => {
    setSelected(pattern[0]);
    updateDoc(doc(db, "users", user_id), {
      background: pattern[0],
      bubble: pattern[1],
      text: pattern[2],
    });
  };

  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className="   backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Theme Selector
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white p-3">
            Themes
          </h3>
          <div className="grid grid-cols-3">
            <div className="max-w-sm p-2 rounded overflow-hidden shadow-lg">
              <div className="w-full bg-hero-pattern h-[78.85px] "></div>

              <div className="px-6 py-4"></div>

              {selected === "hero-pattern" ? (
                <button
                  onClick={() =>
                    handleOnclick(["hero-pattern", "black", "white"])
                  }
                  className="rounded-full border-white border bg-white p-1  font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Selected</div>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleOnclick(["hero-pattern", "black", "white"])
                  }
                  className="rounded-full border-white border bg-white p-1 font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Select</div>
                </button>
              )}

              <div className="px-6 pt-4 pb-2"></div>
            </div>
            <div className="max-w-sm p-2 rounded overflow-hidden shadow-lg">
              <div className="w-full bg-pattern-3 h-[78.85px] "></div>

              <div className="px-6 py-4"></div>

              {selected === "pattern-3" ? (
                <button
                  onClick={() =>
                    handleOnclick(["pattern-3", "blue-500", "white"])
                  }
                  className="rounded-full border-white border bg-white p-1  font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Selected</div>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleOnclick(["pattern-3", "blue-500", "white"])
                  }
                  className="rounded-full border-white border bg-white p-1 font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Select</div>
                </button>
              )}

              <div className="px-6 pt-4 pb-2"></div>
            </div>
            <div className="max-w-sm p-2 rounded overflow-hidden shadow-lg">
              <div className="w-full bg-pattern-2 h-[78.85px] "></div>
              <div className="px-6 py-4"></div>{" "}
              {selected === "pattern-2" ? (
                <button
                  onClick={() => handleOnclick(["pattern-2", "white", "black"])}
                  className="rounded-full border-white border bg-white p-1 font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Selected</div>
                </button>
              ) : (
                <button
                  onClick={() => handleOnclick(["pattern-2", "white", "black"])}
                  className="rounded-full border-white border bg-white p-1 font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Select</div>
                </button>
              )}
              <div className="px-6 pt-4 pb-2"></div>
            </div>
            <div className="max-w-sm p-2 rounded overflow-hidden shadow-lg">
              <div className="w-full bg-pattern-4  h-[78.85px] "></div>
              <div className="px-6 py-4"></div>{" "}
              {selected === "pattern-4" ? (
                <button
                  onClick={() =>
                    handleOnclick(["pattern-4", "blue-500", "black"])
                  }
                  className="rounded-full border-white border bg-white p-1 font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Selected</div>
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleOnclick(["pattern-4", "blue-500", "black"])
                  }
                  className="rounded-full border-white border bg-white p-1 font-bold px-2 hover:bg-gray-300 "
                >
                  <div>Select</div>
                </button>
              )}
              <div className="px-6 pt-4 pb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
