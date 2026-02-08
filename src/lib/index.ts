import bpawn from '$lib/assets/pieces/bpawn.svg';
import bknight from '$lib/assets/pieces/bknight.svg';
import bbishop from '$lib/assets/pieces/bbishop.svg';
import brook from '$lib/assets/pieces/brook.svg';
import bqueen from '$lib/assets/pieces/bqueen.svg';
import bking from '$lib/assets/pieces/bking.svg';
import wpawn from '$lib/assets/pieces/wpawn.svg';
import wknight from '$lib/assets/pieces/wknight.svg';
import wbishop from '$lib/assets/pieces/wbishop.svg';
import wrook from '$lib/assets/pieces/wrook.svg';
import wqueen from '$lib/assets/pieces/wqueen.svg';
import wking from '$lib/assets/pieces/wking.svg';

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

export function getPieceImage(piece: Piece): string {
    const pieces: Record<string, Record<PieceType, string>> = {
        b: {
            pawn: bpawn,
            knight: bknight,
            bishop: bbishop,
            rook: brook,
            queen: bqueen,
            king: bking
        },
        w: {
            pawn: wpawn,
            knight: wknight,
            bishop: wbishop,
            rook: wrook,
            queen: wqueen,
            king: wking
        }
    };

    return pieces[piece.color[0]][piece.type];
}
