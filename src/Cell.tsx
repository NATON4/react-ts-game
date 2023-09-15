import React from 'react';

type CellProps = {
    value: number;
    position: {
        row: number;
        col: number;
    };
};

const Cell: React.FC<CellProps> = ({ value, position }) => {
    const cellStyle: React.CSSProperties = {
        gridArea: `${position.row + 1} / ${position.col + 1}`,
    };

    return (
        <div style={cellStyle} className={`cell cell-${value}`}>
            {value}
        </div>
    );
};

export default Cell;
