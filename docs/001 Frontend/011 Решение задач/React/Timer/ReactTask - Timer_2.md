---
title: Timer_2
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#unknownINC"
  - "#itOne"
---
```jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

  
function TimerContainer() {
  let [isTimerStarted, setTimerStarted] = useState(false);
  const startTimer = () => setTimerStarted(true);
  const stopTimer = () => setTimerStarted(false);

  return (
    <div className="App">
      <div>
        <Timer isStarted={isTimerStarted} />
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

function Timer({ isStarted }) {
  return <div>Write Code heree </div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<TimerContainer />, rootElement);
```

___

[[011 Решение задач JS, TS и React|Назад]]