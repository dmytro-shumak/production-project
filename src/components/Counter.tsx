import { useState, type FC } from "react";
import * as styles from "./counter.module.css";

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment} className={styles.button}>
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
