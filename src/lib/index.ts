export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type Color = 'white' | 'black';

export interface Piece {
    type: PieceType;
    color: Color;
}

export function initBoard(): (Piece | null)[][] {
    const board: (Piece | null)[][] = Array(8)
        .fill(null)
        .map(() => Array(8));

    for (let i = 0; i < 8; i++) {
        board[1][i] = { type: 'pawn', color: 'black' } as Piece;
        board[6][i] = { type: 'pawn', color: 'white' } as Piece;
    }

    const backRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    backRow.forEach((type, i) => {
        board[0][i] = { type, color: 'black' } as Piece;
        board[7][i] = { type, color: 'white' } as Piece;
    });

    return board;
}