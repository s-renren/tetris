import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 0)));
  const [next1, setNext1] = useState(0);
  const [next2, setNext2] = useState(0);
  const [next3, setNext3] = useState(0);
  const isStart = next1 !== 0;
  console.log(isStart);

  const clickReStart = () => {
    setNext1(Math.floor(Math.random() * 7) + 1);
    setNext2(Math.floor(Math.random() * 7) + 1);
    setNext3(Math.floor(Math.random() * 7) + 1);
    setBoard([...Array(20)].map(() => [...Array(10)].map(() => 0)));
  };

  // stateで管理するもの [board, Hold, next1.2.3, ]

  return (
    <div className={styles.container}>
      <div className={styles.bace}>
        <div className={styles.holdArea}>
          <p>Hold</p>
          <div className={styles.hold} />
        </div>
        <div className={styles.backBoard}>
          {board.map((row, y) =>
            row.map((number, x) => (
              <div
                className={
                  number === 0
                    ? styles.cell
                    : number === 1
                      ? styles.iMino
                      : number === 2
                        ? styles.oMino
                        : number === 3
                          ? styles.sMino
                          : number === 4
                            ? styles.zMino
                            : number === 5
                              ? styles.jMino
                              : number === 6
                                ? styles.lMino
                                : number === 7
                                  ? styles.tMino
                                  : ''
                }
                key={`${x}-${y}`}
              />
            )),
          )}
        </div>
        <div className={styles.nextArea}>
          <p>Next</p>
          <div className={styles.next} />
          <div className={styles.next} />
          <div className={styles.next} />
        </div>
      </div>
      <div className={styles.button}>
        <button onClick={clickReStart}>restart</button>
      </div>
    </div>
  );
};

export default Home;
