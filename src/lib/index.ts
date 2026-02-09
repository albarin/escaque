import { getPawnMoves } from '$lib/assets/moves/pawn';
import bbishop from '$lib/assets/pieces/bbishop.svg';
import bking from '$lib/assets/pieces/bking.svg';
import bknight from '$lib/assets/pieces/bknight.svg';
import bpawn from '$lib/assets/pieces/bpawn.svg';
import bqueen from '$lib/assets/pieces/bqueen.svg';
import brook from '$lib/assets/pieces/brook.svg';
import wbishop from '$lib/assets/pieces/wbishop.svg';
import wking from '$lib/assets/pieces/wking.svg';
import wknight from '$lib/assets/pieces/wknight.svg';
import wpawn from '$lib/assets/pieces/wpawn.svg';
import wqueen from '$lib/assets/pieces/wqueen.svg';
import wrook from '$lib/assets/pieces/wrook.svg';
import { getKnightMoves } from './assets/moves/knight';
import { getRookMoves } from './assets/moves/rook';

export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type Color = 'white' | 'black';

export type Board = (Piece | null)[][];

export interface Piece {
    x: number;
    y: number;
    type: PieceType;
    color: Color;
}

export function initBoard(): (Piece | null)[][] {
    const board: (Piece | null)[][] = Array(8)
        .fill(null)
        .map(() => Array(8));

    for (let i = 0; i < 8; i++) {
        board[1][i] = { x: 1, y: i, type: 'pawn', color: 'black' } as Piece;
        board[6][i] = { x: 6, y: i, type: 'pawn', color: 'white' } as Piece;
    }

    const backRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    backRow.forEach((type, i) => {
        board[0][i] = { x: 0, y: i, type, color: 'black' } as Piece;
        board[7][i] = { x: 7, y: i, type, color: 'white' } as Piece;
    });

    board[2][3] = { x: 2, y: 3, type: 'knight', color: 'white' } as Piece; // For testing
    // board[1][4] = { x: 1, y: 4, type: 'pawn', color: 'white' } as Piece; // For testing

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

export function getMoves(board: Board, piece: Piece): { x: number; y: number }[] {
    if (piece.type === 'pawn') {
        return getPawnMoves(board, piece);
    }

    if (piece.type === 'knight') {
        return getKnightMoves(board, piece);
    }

    if (piece.type === 'rook') {
        return getRookMoves(board, piece);
    }

    return [];
}

export function isOpponentPiece(piece1: Piece, piece2: Piece): boolean {
    return piece1.color !== piece2.color;
}

export function squareIsInBounds(x: number, y: number): boolean {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

export function isKing(piece: Piece): boolean {
    return piece.type === 'king';
}

export function pieceIsWhite(piece: Piece): boolean {
    return piece.color === 'white';
}

export function pieceIsBlack(piece: Piece): boolean {
    return piece.color === 'black';
}

export function pieceIsInTheBackRank(piece: Piece): boolean {
    return (pieceIsWhite(piece) && piece.x === 0) || (pieceIsBlack(piece) && piece.x === 7);
}