import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 3)));

  return (
    <div className={styles.container}>
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
                        : ''
              }
              key={`${x}-${y}`}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
