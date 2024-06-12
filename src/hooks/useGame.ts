import { useState } from "react";

export const useGame = () => {
  const [board, setBoard] = useState([...Array(20)].map(() => [...Array(10)].map(() => 0)));
  return {
    board,
    setBoard
  }
}
