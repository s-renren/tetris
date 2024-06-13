import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 0)));
  const [next1, setNext1] = useState(0);
  const [next2, setNext2] = useState(0);
  const [next3, setNext3] = useState(0);
  const isStart = next1 !== 0;
  const changeI = [
    { rowIndex: 0, colIndex: 4, newvalue: 1 },
    { rowIndex: 1, colIndex: 4, newvalue: 1 },
    { rowIndex: 2, colIndex: 4, newvalue: 1 },
    { rowIndex: 3, colIndex: 4, newvalue: 1 },
  ];
  const changeO = [
    { rowIndex: 0, colIndex: 4, newvalue: 2 },
    { rowIndex: 0, colIndex: 5, newvalue: 2 },
    { rowIndex: 1, colIndex: 4, newvalue: 2 },
    { rowIndex: 1, colIndex: 5, newvalue: 2 },
  ];
  const changeS = [
    { rowIndex: 0, colIndex: 4, newvalue: 3 },
    { rowIndex: 0, colIndex: 5, newvalue: 3 },
    { rowIndex: 1, colIndex: 3, newvalue: 3 },
    { rowIndex: 1, colIndex: 4, newvalue: 3 },
  ];
  const changeZ = [
    { rowIndex: 0, colIndex: 4, newvalue: 4 },
    { rowIndex: 0, colIndex: 5, newvalue: 4 },
    { rowIndex: 1, colIndex: 5, newvalue: 4 },
    { rowIndex: 1, colIndex: 6, newvalue: 4 },
  ];
  const changeJ = [
    { rowIndex: 0, colIndex: 3, newvalue: 5 },
    { rowIndex: 1, colIndex: 3, newvalue: 5 },
    { rowIndex: 1, colIndex: 4, newvalue: 5 },
    { rowIndex: 1, colIndex: 5, newvalue: 5 },
  ];
  const changeL = [
    { rowIndex: 0, colIndex: 5, newvalue: 6 },
    { rowIndex: 1, colIndex: 3, newvalue: 6 },
    { rowIndex: 1, colIndex: 4, newvalue: 6 },
    { rowIndex: 1, colIndex: 5, newvalue: 6 },
  ];
  const changeT = [
    { rowIndex: 0, colIndex: 4, newvalue: 7 },
    { rowIndex: 1, colIndex: 3, newvalue: 7 },
    { rowIndex: 1, colIndex: 4, newvalue: 7 },
    { rowIndex: 1, colIndex: 5, newvalue: 7 },
  ];
  const changeMap: { [key: string]: { rowIndex: number; colIndex: number; newvalue: number }[] } = {
    '1': changeI,
    '2': changeO,
    '3': changeS,
    '4': changeZ,
    '5': changeJ,
    '6': changeL,
    '7': changeT,
  };
  const setBlock = (num: number) => {
    const newBoard = structuredClone(board);
    const changes = changeMap[num.toString()];

    changes.forEach((change) => {
      newBoard[change.rowIndex][change.colIndex] = change.newvalue;
    });
    setBoard(newBoard);
  };

  // useEffect(() => {
  //   if (!isStart) {
  //     return;
  //   } else {
  //   }
  // });

  const clickReStart = () => {
    setNext1(Math.floor(Math.random() * 7) + 1);
    setNext2(Math.floor(Math.random() * 7) + 1);
    setNext3(Math.floor(Math.random() * 7) + 1);
    setBoard([...Array(20)].map(() => [...Array(10)].map(() => 0)));
    setBlock(Math.floor(Math.random() * 7) + 1);
    console.log(next1, next2, next3, isStart);
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
