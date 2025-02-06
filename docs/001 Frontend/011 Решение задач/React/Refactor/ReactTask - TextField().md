---
title: TextField()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#БКС"
---
```jsx
// Что не так с компонентом?

import React, { useState } from "react";

  
const TextField = (props) => {
  console.log("Render TextField");
  return <input {...props} />;
};


const Button = (props) => {
  console.log("Render Button");
  return <button {...props} />;
};

  
const App = () => {
  const [message, setMessage] = useState("");
  const handleChangeMessage = (e) => setMessage(e.target.value);
  const handleSendMessage = () => console.log(message);

  return (
    <div>
      <TextField
        placeholder="Input message"
        onChange={handleChangeMessage}
        value={message}
        type="text"
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
};

export default App;
```

___

[[011 Решение задач JS, TS и React|Назад]]