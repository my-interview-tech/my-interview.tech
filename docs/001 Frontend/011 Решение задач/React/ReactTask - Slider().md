---
title: Slider()
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#сбербанк"
---

```jsx
import React  from "react";
import { Button } from "react-bootstrap";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";


const slides = [
  { id: 1, label: "label 1", background: "yellowgreen" },
  { id: 2, label: "label 2", background: "mediumaquamarine" },
  { id: 3, label: "label 3", background: "pink" }
];

  
const DURATION = 2000;

function Slider() {
  const handleStop = () => {};
  const handlePlay = () => {};
  const handleNext = () => {};
  const handlePrevious = () => {};


  return (
    <div className="slides-wrapper">
      <div style={{ background: slides[0].background }}>{slides[0].label}</div>
      <div>
        <Button onClick={handlePrevious}> prev </Button>
        <Button onClick={handleStop}> stop </Button>
        <Button onClick={handlePlay}> play </Button>
        <Button onClick={handleNext}> next </Button>
      </div>
    </div>
  );
}

export default Slider;
```


___

[[011 Решение задач JS, TS и React|Назад]]