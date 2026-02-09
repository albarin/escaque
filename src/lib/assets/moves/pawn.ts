import { isKing, isOpponentPiece, pieceIsInTheBackRank, squareIsInBounds, type Board, type Piece } from "$lib";

export function getPawnMoves(board: Board, piece: Piece): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];

    const direction = piece.color === 'white' ? -1 : 1;

    // Move forward 1 square
    if (squareIsInBounds(piece.x + direction, piece.y)) {
        const oneSquarePiece = board[piece.x + direction][piece.y];
        if (piece.x + direction >= 0 && !oneSquarePiece) {
            moves.push({ x: piece.x + direction, y: piece.y });
        }
    }

    // Move forward 2 squares
    if (squareIsInBounds(piece.x + 2 * direction, piece.y)) {
        const oneSquarePiece = board[piece.x + direction][piece.y];
        const twoSquaresPiece = board[piece.x + 2 * direction][piece.y];
        if (piece.x === (piece.color === 'white' ? 6 : 1) && !oneSquarePiece && !twoSquaresPiece) {
            moves.push({ x: piece.x + 2 * direction, y: piece.y });
        }
    }

    // Capture diagonally to the left
    if (squareIsInBounds(piece.x + direction, piece.y - 1)) {
        const captureLeft = board[piece.x + direction][piece.y - 1];
        if (captureLeft && isOpponentPiece(piece, captureLeft) && !isKing(captureLeft)) {
            moves.push({ x: piece.x + direction, y: piece.y - 1 });
        }
    }

    // Capture diagonally to the right
    if (squareIsInBounds(piece.x + direction, piece.y + 1)) {
        const captureRight = board[piece.x + direction][piece.y + 1];
        if (captureRight && isOpponentPiece(piece, captureRight) && !isKing(captureRight)) {
            moves.push({ x: piece.x + direction, y: piece.y + 1 });
        }
    }

    // TODO: Implement capture en passant

    return moves;
}