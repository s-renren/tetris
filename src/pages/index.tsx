import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 0)));

  return (
    <div className={styles.container}>
      <div className={styles.backBoard}>
        {board.map((row, y) =>
          row.map((number, x) => <div className={number === 0 ? styles.cell : number === 1 ? styles.iStyle : ''} key={`${x}-${y}`} />),
        )}
      </div>
    </div>
  );
};

export default Home;
