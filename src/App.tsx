import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
  const [boardSize, setBoardSize] = useState(6);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let newSize = parseInt(event.target.value);

    newSize = Math.min(20, newSize);
    newSize = Math.max(2, newSize);
    setBoardSize(newSize);
  };

  return (
      <div className="App">
        <h1>2048 Game</h1>
        <div>
          <label htmlFor="boardSize">Enter board size:</label>
          <input
              type="number"
              id="boardSize"
              value={boardSize || 2}
              onChange={handleSizeChange}
          />
        </div>
        <Board key={boardSize} size={boardSize} />
      </div>
  );
}

export default App;
