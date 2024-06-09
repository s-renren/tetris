import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 0)));

  return (
    <div className={styles.container}>
      <div className={styles.backBoard}>
        {board.map((row, y) =>
          row.map((number, x) => <div className={styles.cell} key={`${x}-${y}`} />),
        )}
      </div>
    </div>
  );
};

export default Home;
