import { isKing, isOpponentPiece, squareIsInBounds, type Board, type Piece } from "$lib";

export function getKnightMoves(board: Board, piece: Piece): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];

    const validMoves = [
        { x: -2, y: -1 },
        { x: -2, y: 1 },
        { x: -1, y: -2 },
        { x: -1, y: 2 },
        { x: 1, y: -2 },
        { x: 1, y: 2 },
        { x: 2, y: -1 },
        { x: 2, y: 1 }
    ];

    for (const move of validMoves) {
        const newX = piece.x + move.x;
        const newY = piece.y + move.y;

        if (!squareIsInBounds(newX, newY)) {
            continue;
        }

        const targetPiece = board[newX][newY];

        if (!targetPiece) {
            moves.push({ x: newX, y: newY });
            continue;
        }

        if (isKing(targetPiece)) {
            continue;
        }

        if (!isOpponentPiece(piece, targetPiece)) {
            continue;
        }

        if (isOpponentPiece(piece, targetPiece)) {
            moves.push({ x: newX, y: newY });
        }
    }

    return moves;
}