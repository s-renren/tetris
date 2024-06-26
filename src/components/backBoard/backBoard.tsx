import styles from './backBoard.module.css';
type Props = {
  board: number[][];
};

export const BackBoard = ({ board }: Props) => (
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
                          : styles.tMino
          }
          key={`${x}-${y}`}
        />
      )),
    )}
  </div>
);
