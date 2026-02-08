import type { Board, Piece } from "$lib";

export function getPawnMoves(board: Board, piece: Piece): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];

    const direction = piece.color === 'white' ? -1 : 1;

    // Move forward 1 square
    const oneSquarePiece = board[piece.x + direction][piece.y];
    if (piece.x + direction >= 0 && !oneSquarePiece) {
        moves.push({ x: piece.x + direction, y: piece.y });
    }

    // Move forward 2 squares
    const twoSquaresPiece = board[piece.x + 2 * direction][piece.y];
    if (piece.x === (piece.color === 'white' ? 6 : 1) && !oneSquarePiece && !twoSquaresPiece) {
        moves.push({ x: piece.x + 2 * direction, y: piece.y });
    }

    // Capture diagonally
    const captureLeft = board[piece.x + direction][piece.y - 1];
    if (piece.y - 1 >= 0 && captureLeft && captureLeft.color !== piece.color) {
        moves.push({ x: piece.x + direction, y: piece.y - 1 });
    }

    const captureRight = board[piece.x + direction][piece.y + 1];
    if (piece.y + 1 < 8 && captureRight && captureRight.color !== piece.color) {
        moves.push({ x: piece.x + direction, y: piece.y + 1 });
    }

    // TODO: Implement capture en passant

    return moves;
}