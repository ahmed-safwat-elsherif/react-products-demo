import React, { useState, useEffect } from "react";

// Life Cycle Hooks
// 1- Mounting => Component is created.
// 2- Updating => Component updated (change in states or passing new props/change in props).
// 3- Unmounting => Component is about to be destroyed.
//
export default function Counter() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  // 1- Updating
  // useEffect( function ) => will run with each render

  //   useEffect(function () {
  //     console.log(
  //       "--- logging from useEffect",
  //       "Component is updated/mounted----"
  //     );
  //   });

  // useEffect (function , array of dependencies, i.e [count]) => only runs with each change in {count} only
  //   useEffect(
  //     function () {
  //       console.log("Count is changed");
  //     },
  //     [count]
  //   );

  // 2- Mounting
  // useEffect (function, [] ) => runs only in the mounting phase

  //   useEffect(() => {
  //     console.log("-- --- component is mounted --- --");
  //   }, []);

  // 3- Unmounting
  //   useEffect(() => {
  //     console.log("-- --- component is mounted --- --");
  //     document.addEventListener("click", handleOnDocumentClick);
  //     return () => {
  //       console.log("-- Component is Unmounted --");
  //       // clearInterval of setInterval
  //       // close connection with web sockets [Chat app / push notifications / real time data ]
  //       // removeEventListeners
  //       document.removeEventListener("click", handleOnDocumentClick);
  //     };
  //   }, []);

  // same functionality but diff syntax:
  useEffect(function () {
    //
    document.addEventListener("click", handleOnDocumentClick);
    return function () {
      // When Component will be destroyed
      document.removeEventListener("click", handleOnDocumentClick);
    };
  }, []); // => mounting only

  function handleOnIncrease() {
    setCount(count + 1);
  }

  function handleOnDecrease() {
    setCount(count - 1);
  }

  return (
    <div
      className="card"
      style={{
        maxWidth: "18rem",
        backgroundColor: darkMode ? "#000028" : "transparent",
        transition: "background-color 0.3s ease-out",
      }}
    >
      <div>
        <h3 className="text-center p-2">
          <span className={"badge bg-" + (count > 5 ? "warning" : "success")}>
            {count}
          </span>
        </h3>
      </div>
      <hr />
      <div className="d-flex gap-2 p-2">
        <button
          className="flex-grow-1 btn btn-primary"
          onClick={handleOnIncrease}
          disabled={count > 9}
        >
          [+]
        </button>
        <button
          disabled={count < 1}
          className="flex-grow-1 btn btn-danger"
          onClick={handleOnDecrease}
        >
          [-]
        </button>
      </div>
      <hr />
      <div className="d-flex gap-2 p-2">
        <button
          className={"flex-grow-1 btn btn-" + (darkMode ? "light" : "dark")}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );
}

function handleOnDocumentClick() {
  console.log("Document is Clicked");
}
