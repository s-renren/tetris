import { BackBoard } from '../components/backBoard/backBoard';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { board, setBoard } = useGame();
  return (
    <div className={styles.container}>
      <div className={styles.bace}>
        <div className={styles.holdArea}>
          <p>Hold</p>
          <div className={styles.hold} />
        </div>
        <BackBoard board={board} />
        <div className={styles.nextArea}>
          <p>Next</p>
          <div className={styles.next} />
          <div className={styles.next} />
          <div className={styles.next} />
        </div>
      </div>
    </div>
  );
};

export default Home;
