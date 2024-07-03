import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 0)));
  const [nowBlockN, setNowBlockN] = useState(0);
  const [next1, setNext1] = useState(0);
  const [next2, setNext2] = useState(0);
  const [next3, setNext3] = useState(0);
  const [holdN, setHoldN] = useState(0);
  const [dropTime, setDropTime] = useState(0);
  const [rotateCount, setRotateCount] = useState(0);
  const resetBoard = [...Array(20)].map(() => [...Array(10)].map(() => 0));
  const isStart = next1 !== 0;
  // みのの形
  const changeI = useMemo(
    () => [
      { rowIndex: 0, colIndex: 2, newvalue: 1 },
      { rowIndex: 0, colIndex: 3, newvalue: 1 },
      { rowIndex: 0, colIndex: 4, newvalue: 1 },
      { rowIndex: 0, colIndex: 5, newvalue: 1 },
    ],
    [],
  );

  const changeO = useMemo(
    () => [
      { rowIndex: 0, colIndex: 4, newvalue: 2 },
      { rowIndex: 0, colIndex: 5, newvalue: 2 },
      { rowIndex: 1, colIndex: 4, newvalue: 2 },
      { rowIndex: 1, colIndex: 5, newvalue: 2 },
    ],
    [],
  );

  const changeS = useMemo(
    () => [
      { rowIndex: 0, colIndex: 4, newvalue: 3 },
      { rowIndex: 0, colIndex: 5, newvalue: 3 },
      { rowIndex: 1, colIndex: 3, newvalue: 3 },
      { rowIndex: 1, colIndex: 4, newvalue: 3 },
    ],
    [],
  );

  const changeZ = useMemo(
    () => [
      { rowIndex: 0, colIndex: 4, newvalue: 4 },
      { rowIndex: 0, colIndex: 5, newvalue: 4 },
      { rowIndex: 1, colIndex: 5, newvalue: 4 },
      { rowIndex: 1, colIndex: 6, newvalue: 4 },
    ],
    [],
  );

  const changeJ = useMemo(
    () => [
      { rowIndex: 0, colIndex: 3, newvalue: 5 },
      { rowIndex: 1, colIndex: 3, newvalue: 5 },
      { rowIndex: 1, colIndex: 4, newvalue: 5 },
      { rowIndex: 1, colIndex: 5, newvalue: 5 },
    ],
    [],
  );

  const changeL = useMemo(
    () => [
      { rowIndex: 0, colIndex: 5, newvalue: 6 },
      { rowIndex: 1, colIndex: 3, newvalue: 6 },
      { rowIndex: 1, colIndex: 4, newvalue: 6 },
      { rowIndex: 1, colIndex: 5, newvalue: 6 },
    ],
    [],
  );

  const changeT = useMemo(
    () => [
      { rowIndex: 0, colIndex: 4, newvalue: 7 },
      { rowIndex: 1, colIndex: 3, newvalue: 7 },
      { rowIndex: 1, colIndex: 4, newvalue: 7 },
      { rowIndex: 1, colIndex: 5, newvalue: 7 },
    ],
    [],
  );

  const moveLeft = useCallback(() => {
    const newBoard = structuredClone(board);
    const canMoveLeft = newBoard.every((row, y) =>
      row.every((num, x) => {
        if (num === nowBlockN) {
          return newBoard[y]?.[x - 1] === 0 || newBoard[y]?.[x - 1] === nowBlockN;
        }
        return true;
      }),
    );
    if (canMoveLeft) {
      board.forEach((row, y) => {
        row.forEach((num, x) => {
          if (num === nowBlockN) {
            newBoard[y][x - 1] = nowBlockN;
            if (newBoard[y][x - 1] === nowBlockN) {
              newBoard[y][x] = 0;
            }
          }
        });
      });
    }
    setBoard(newBoard);
  }, [board, nowBlockN, setBoard]);

  const moveRight = useCallback(() => {
    const newBoard = structuredClone(board);
    const canMoveRight = newBoard.every((row, y) =>
      row.every((num, x) => {
        if (num === nowBlockN) {
          return newBoard[y]?.[x + 1] === 0 || newBoard[y]?.[x + 1] === nowBlockN;
        }
        return true;
      }),
    );
    if (canMoveRight) {
      board.forEach((row, y) => {
        row.forEach((num, x) => {
          if (num === nowBlockN) {
            newBoard[y][x + 1] = nowBlockN;
            if (board[y][x - 1] !== nowBlockN || board[y][x - 1] === undefined) {
              newBoard[y][x] = 0;
            }
          }
        });
      });
    }
    setBoard(newBoard);
  }, [board, nowBlockN, setBoard]);

  interface ChangeMap {
    [key: string]: { rowIndex: number; colIndex: number; newvalue: number }[];
  }

  const changeMap: ChangeMap = useMemo(
    () => ({
      '1': changeI,
      '2': changeO,
      '3': changeS,
      '4': changeZ,
      '5': changeJ,
      '6': changeL,
      '7': changeT,
    }),
    [changeI, changeO, changeS, changeZ, changeJ, changeL, changeT],
  );
  // ブロックを出現させる
  const appBlock = useCallback(
    (num: number, newBoard: number[][]) => {
      const nowTime = new Date().getTime();
      const changes = changeMap[num.toString()];
      if (isStart) {
        const canChange = changes.every((num) => newBoard[num.rowIndex][num.colIndex] === 0);
        if (canChange) {
          changes.forEach((change) => {
            newBoard[change.rowIndex][change.colIndex] = change.newvalue;
          });
        } else {
          alert('Game Over');
        }
      } else {
        if (num !== 0) {
          changes.forEach((change) => {
            newBoard[change.rowIndex][change.colIndex] = change.newvalue;
          });
        }
      }
      setBoard(newBoard);
      setDropTime(nowTime);
    },
    [changeMap, setBoard, isStart],
  );

  const deleteLine = useCallback((newBoard: number[][]) => {
    newBoard.forEach((row, index) => {
      if (row.every((cell) => cell !== 0)) {
        for (let y = index; y > 0; y--) {
          for (let x = 0; x < 10; x++) {
            newBoard[y][x] = newBoard[y - 1][x];
            newBoard[y - 1][x] = 0;
          }
        }
      }
    });
  }, []);

  // ミノを落とす
  const dropMino = useCallback(() => {
    if (isStart) {
      const newBoard = structuredClone(board);
      const canDrop = newBoard.every((row, y) =>
        row.every((num, x) => {
          if (num === nowBlockN) {
            return newBoard[y + 1]?.[x] === 0 || newBoard[y + 1]?.[x] === nowBlockN;
          }
          return true;
        }),
      );
      if (canDrop) {
        board.forEach((row, y) =>
          row.forEach((num, x) => {
            if (num === nowBlockN) {
              newBoard[y + 1][x] = nowBlockN;
              if (board[y - 1]?.[x] !== nowBlockN) {
                newBoard[y][x] = 0;
              }
            }
          }),
        );
      } else {
        newBoard.forEach((row, y) =>
          row.forEach((num, x) => {
            if (0 < num && num < 8) {
              newBoard[y][x] = nowBlockN + 7;
            }
          }),
        );
        deleteLine(newBoard);
        appBlock(next1, newBoard);
        setNowBlockN(next1);
        setNext1(next2);
        setNext2(next3);
        setNext3(Math.floor(Math.random() * 7) + 1);
      }
      setBoard(newBoard);
    }
  }, [board, nowBlockN, next1, next2, next3, appBlock, deleteLine, isStart]);

  const clearNowBlockBoard = useCallback((newBoard: number[][]) => {
    newBoard.forEach((row, y) => {
      row.forEach((num, x) => {
        if (0 < num && num < 8) {
          newBoard[y][x] = 0;
        }
      });
    });
    setBoard(newBoard);
  }, []);

  const selectMinoForm = useCallback(
    (newBoard: number[][], x: number, y: number) => {
      let setPlacey1 = 0;
      let setPlacey2 = 0;
      let setPlacey3 = 0;
      let setPlacey4 = 0;
      let setPlacex1 = 0;
      let setPlacex2 = 0;
      let setPlacex3 = 0;
      let setPlacex4 = 0;
      if (nowBlockN === 1) {
        switch (rotateCount) {
          // 横向きの場合
          case 0:
            setRotateCount(1);
            if (y === 0) {
              (setPlacex1 = x), (setPlacex2 = x), (setPlacex3 = x), (setPlacex4 = x);
              (setPlacey1 = y), (setPlacey2 = y + 1), (setPlacey3 = y + 2), (setPlacey4 = y + 3);
            } else if (y === 18 || y === 19) {
              (setPlacex1 = x), (setPlacex2 = x), (setPlacex3 = x), (setPlacex4 = x);
              (setPlacey1 = y - 3), (setPlacey2 = y - 2), (setPlacey3 = y - 1), (setPlacey4 = y);
            } else {
              (setPlacex1 = x), (setPlacex2 = x), (setPlacex3 = x), (setPlacex4 = x);
              (setPlacey1 = y - 1), (setPlacey2 = y), (setPlacey3 = y + 1), (setPlacey4 = y + 2);
            }
            newBoard[setPlacey1][setPlacex1] = nowBlockN;
            newBoard[setPlacey2][setPlacex2] = nowBlockN;
            newBoard[setPlacey3][setPlacex3] = nowBlockN;
            newBoard[setPlacey4][setPlacex4] = nowBlockN;
            break;
          // 縦の時
          case 1:
            setRotateCount(0);
            if (x === 0 || x === 1) {
              (setPlacex1 = x), (setPlacex2 = x + 1), (setPlacex3 = x + 2), (setPlacex4 = x + 3);
              (setPlacey1 = y), (setPlacey2 = y), (setPlacey3 = y), (setPlacey4 = y);
            } else if (x === 8 || x === 9) {
              (setPlacex1 = x - 3), (setPlacex2 = x - 2), (setPlacex3 = x - 1), (setPlacex4 = x);
              (setPlacey1 = y), (setPlacey2 = y), (setPlacey3 = y), (setPlacey4 = y);
            } else {
              if (newBoard[y][x - 2] !== 0) {
                (setPlacex1 = x - 1), (setPlacex2 = x), (setPlacex3 = x + 1), (setPlacex4 = x + 2);
                (setPlacey1 = y), (setPlacey2 = y), (setPlacey3 = y), (setPlacey4 = y);
              } else if (newBoard[y][x - 1] !== 0) {
                (setPlacex1 = x), (setPlacex2 = x + 1), (setPlacex3 = x + 2), (setPlacex4 = x + 3);
                (setPlacey1 = y), (setPlacey2 = y), (setPlacey3 = y), (setPlacey4 = y);
              } else {
                (setPlacex1 = x - 2), (setPlacex2 = x - 1), (setPlacex3 = x), (setPlacex4 = x + 1);
                (setPlacey1 = y), (setPlacey2 = y), (setPlacey3 = y), (setPlacey4 = y);
              }
            }
            console.log(setPlacex1);
            newBoard[setPlacey1][setPlacex1] = nowBlockN;
            newBoard[setPlacey2][setPlacex2] = nowBlockN;
            newBoard[setPlacey3][setPlacex3] = nowBlockN;
            newBoard[setPlacey4][setPlacex4] = nowBlockN;
            break;
        }
      }
      setBoard(newBoard);
    },
    [nowBlockN, rotateCount],
  );

  const rotateMino = useCallback(() => {
    const newBoard = structuredClone(board);
    let serchCount = 0;
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        if (newBoard[y][x] === nowBlockN) {
          serchCount++;
          if (serchCount === 3) {
            // 回転の関数実行
            clearNowBlockBoard(newBoard);
            selectMinoForm(newBoard, x, y);
          }
        }
      }
    }
  }, [nowBlockN, board, clearNowBlockBoard, selectMinoForm]);

  const holdMino = useCallback(() => {
    const newBoard = structuredClone(board);
    const changeHold = structuredClone(holdN);
    if (isStart) {
      if (holdN === 0) {
        clearNowBlockBoard(newBoard);
        setHoldN(nowBlockN);
        appBlock(next1, newBoard);
        setNowBlockN(next1);
        setNext1(next2);
        setNext2(next3);
        setNext3(Math.floor(Math.random() * 7) + 1);
        setRotateCount(0);
      } else {
        clearNowBlockBoard(newBoard);
        setNowBlockN(changeHold);
        setHoldN(nowBlockN);
        appBlock(holdN, newBoard);
        setRotateCount(0);
      }
    }
  }, [holdN, nowBlockN, next1, next2, next3, clearNowBlockBoard, appBlock, board, isStart]);
  useEffect(() => {
    const interval = setInterval(() => {
      const nowTime = new Date().getTime();

      if (isStart && (nowTime - dropTime) / 1000 >= 1) {
        dropMino();
        setDropTime(nowTime);
      }
    }, 100);

    const arrowHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') rotateMino();
      if (event.key === 'ArrowLeft') moveLeft();
      if (event.key === 'ArrowRight') moveRight();
      if (event.key === 'ArrowDown') dropMino();
      if (event.key === 'l') holdMino();
    };

    window.addEventListener('keydown', arrowHandler);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', arrowHandler);
    };
  }, [isStart, dropTime, dropMino, moveLeft, moveRight, holdMino, rotateMino]);

  const clickStart = () => {
    const newBlockN = Math.floor(Math.random() * 7) + 1;
    setNext1(Math.floor(Math.random() * 7) + 1);
    setNext2(Math.floor(Math.random() * 7) + 1);
    setNext3(Math.floor(Math.random() * 7) + 1);
    setHoldN(0);
    setBoard([...Array(20)].map(() => [...Array(10)].map(() => 0)));
    appBlock(newBlockN, resetBoard);
    setNowBlockN(newBlockN);
    setRotateCount(0);
  };

  const clickReset = () => {
    setBoard([...Array(20)].map(() => [...Array(10)].map(() => 0)));
    setNext1(0);
    setNext2(0);
    setNext3(0);
    setHoldN(0);
    setNowBlockN(0);
    setRotateCount(0);
  };

  const getHoldNextArea = (num: number) => {
    if (num === 1) {
      return [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ];
    } else if (num === 2) {
      return [
        [0, 0, 0, 0],
        [0, 2, 2, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
      ];
    } else if (num === 3) {
      return [
        [0, 0, 0, 0],
        [0, 3, 3, 0],
        [3, 3, 0, 0],
        [0, 0, 0, 0],
      ];
    } else if (num === 4) {
      return [
        [0, 0, 0, 0],
        [0, 4, 4, 0],
        [0, 0, 4, 4],
        [0, 0, 0, 0],
      ];
    } else if (num === 5) {
      return [
        [0, 0, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 5, 5],
        [0, 0, 0, 0],
      ];
    } else if (num === 6) {
      return [
        [0, 0, 0, 0],
        [0, 0, 6, 0],
        [6, 6, 6, 0],
        [0, 0, 0, 0],
      ];
    } else if (num === 7) {
      return [
        [0, 0, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 7, 0],
        [0, 0, 0, 0],
      ];
    } else {
      return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
    }
  };
  const hold = getHoldNextArea(holdN);
  const next1Num = getHoldNextArea(next1);
  const next2Num = getHoldNextArea(next2);
  const next3Num = getHoldNextArea(next3);

  return (
    <div className={styles.container}>
      <div className={styles.bace}>
        <div className={styles.holdArea}>
          <p>Hold</p>
          <div className={styles.hold}>
            {hold.map((row, y) =>
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
        </div>
        <div className={styles.backBoard}>
          {board.map((row, y) =>
            row.map((number, x) => (
              <div
                className={
                  number === 0
                    ? styles.cell
                    : number === 1 || number === 8
                      ? styles.iMino
                      : number === 2 || number === 9
                        ? styles.oMino
                        : number === 3 || number === 10
                          ? styles.sMino
                          : number === 4 || number === 11
                            ? styles.zMino
                            : number === 5 || number === 12
                              ? styles.jMino
                              : number === 6 || number === 13
                                ? styles.lMino
                                : number === 7 || number === 14
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
          <div className={styles.next}>
            {next1Num.map((row, y) =>
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
          <div className={styles.next}>
            {next2Num.map((row, y) =>
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
          <div className={styles.next}>
            {next3Num.map((row, y) =>
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
        </div>
      </div>
      <div className={styles.button}>
        <button onClick={clickStart}>Start</button>
        <button onClick={clickReset}>Reset</button>
      </div>
    </div>
  );
};

export default Home;
