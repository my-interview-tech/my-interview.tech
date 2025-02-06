---
title: Bad App
draft: false
tags:
  - "#React"
  - "#reactTask"
  - "#лигаСтавок"
---
```js
// Починить React Application
```

```TSX
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const LargeList = ({ commentPrefix, error = false }) => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  if (!error) {
    /* fetch data */
    // @ts-ignore
    useEffect(async () => {
      const postsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const postsJson = await postsResponse.json();

      setPosts(postsJson);

      const commentsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const commentsJson = await commentsResponse.json();

      setComments(commentsJson);
    }, [setPosts, setComments]);
  }

  /* get all comments by postId */
  const findRelatedComments = (postId: number) => {
    let answer = [];

    for (var i = 0; i < comments.length; i++) {
      const comment = comments[i];

      if (comment.postId === postId) {
        answer = [...answer, comment];
      }
    }

    return answer;
  };

  return (

    <div>
      {/* render posts */}
      {posts.map(({ title, body, id }) => (
        <main className="post">
          <h1 className="post-Item_red">{title}</h1>
          <p>{body}</p>
          <hr />
          {/* render comments list */}
          <ul className="postList">
            {findRelatedComments(id).map(({ body }) => (
              <div className="post__header">
                {commentPrefix} {body}
              </div>
            ))}
          </ul>
        </main>
      ))}
    </div>
  );
};

var loaded = false;
var value = 0;

const AppWithCounter = () => {
  const [counter, setCounter] = useState(0);
  
  let commentPrefix = "*";
  
  const increase = () => {
    setCounter(++value);
  };

  useEffect(() => {
    if (!loaded) {
      setInterval(increase, 1000);
    }

    loaded = true;
  });

  return (
    <div>
      seconds elapsed: {counter}
      <div>
        <LargeList commentPrefix={commentPrefix} />
      </div>
    </div>
  );
};

// don't change
ReactDOM.render(<AppWithCounter />, document.getElementById("root"));

setTimeout(() => console.clear(), 1000);
```

___

[[011 Решение задач JS, TS и React|Назад]]