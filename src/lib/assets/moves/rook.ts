import { isKing, isOpponentPiece, squareIsInBounds, type Board, type Piece } from "$lib";

export function getRookMoves(board: Board, piece: Piece): { x: number; y: number }[] {
    const moves: { x: number; y: number }[] = [];

    // Directions the rook can move: up, down, left, right
    const directions = [
        { x: -1, y: 0 }, // Up
        { x: 1, y: 0 },  // Down
        { x: 0, y: -1 }, // Left
        { x: 0, y: 1 }   // Right
    ];

    for (const direction of directions) {
        let newX = piece.x + direction.x;
        let newY = piece.y + direction.y;

        while (squareIsInBounds(newX, newY)) {
            const targetPiece = board[newX][newY];

            if (targetPiece) {
                if (isOpponentPiece(piece, targetPiece)) {
                    if (!isKing(targetPiece)) {
                        moves.push({ x: newX, y: newY }); // Can capture opponent piece
                    }
                }
                break; // Can't move past any piece
            }

            moves.push({ x: newX, y: newY }); // Empty square

            newX += direction.x;
            newY += direction.y;
        }
    }

    return moves;
}