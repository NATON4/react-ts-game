import React, { useEffect, useState } from 'react';
import Cell from './Cell';

type CellState = { row: number; col: number; value: number }[];

type BoardProps = {
    size: number;
};

const Board: React.FC<BoardProps> = ({ size }) => {
    const gridTemplateColumns = `repeat(${size}, 1fr)`;
    const gridTemplateRows = `repeat(${size}, 1fr)`;
    const [cellStates, setCellStates] = useState<CellState>([]);
    const [currentPosition, setCurrentPosition] = useState<{ row: number; col: number }>({ row: 0, col: 0 });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const activeCellIndex = cellStates.findIndex(
                (cellState) => cellState.value === 2
            );

            const updatedCellStates = [...cellStates];
            const activeCell = updatedCellStates[activeCellIndex];

            switch (event.key) {
                case 'ArrowLeft':
                    activeCell.col = Math.max(0, activeCell.col - 1);
                    break;
                case 'ArrowRight':
                    activeCell.col = Math.min(size - 1, activeCell.col + 1);
                    break;
                case 'ArrowUp':
                    activeCell.row = Math.max(0, activeCell.row - 1);
                    break;
                case 'ArrowDown':
                    activeCell.row = Math.min(size - 1, activeCell.row + 1);
                    break;
                default:
                    break;
            }

            setCurrentPosition({ row: activeCell.row, col: activeCell.col });

            updatedCellStates.splice(activeCellIndex, 1);
            updatedCellStates.push(activeCell);

            setCellStates(updatedCellStates);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentPosition, size, cellStates]);

    const initialCellStates: CellState = [];

    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
        for (let columnIndex = 0; columnIndex < size; columnIndex++) {
            const isInitialPosition = rowIndex === 0 && columnIndex === 0;
            const cellValue = isInitialPosition ? 2 : 0;
            initialCellStates.push({
                row: rowIndex,
                col: columnIndex,
                value: cellValue,
            });
        }
    }

    useEffect(() => {
        setCellStates(initialCellStates);
    }, [size]);

    return (
        <div className="board" style={{ gridTemplateColumns, gridTemplateRows }}>
            {cellStates.map((cellState, index) => (
                <Cell
                    key={`${cellState.row}/${cellState.col}`}
                    value={cellState.value}
                    position={{ row: cellState.row, col: cellState.col }}
                />
            ))}
        </div>
    );
};

export default Board;
