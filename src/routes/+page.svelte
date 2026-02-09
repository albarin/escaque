<script lang="ts">
	import { getPieceImage, initBoard, type Piece, type Board, getMoves } from '$lib';

	let board: Board = $state(initBoard());

	let selectedPiece: Piece | null = $state(null);
	let moves: { x: number; y: number }[] = $state([]);
	$inspect(moves);

	function selectPiece(piece: Piece) {
		selectedPiece = piece;
		moves = getMoves(board, piece);
	}

	function isSelected(x: number, y: number) {
		return selectedPiece && selectedPiece.x === x && selectedPiece.y === y;
	}

	function movePiece(x: number, y: number) {
		if (!selectedPiece) {
			return;
		}

		// Capture piece and remove it from the board
		if (board[x][y] && board[x][y]!.color !== selectedPiece.color) {
			board[x][y] = null;
		}

		// Update board
		board[selectedPiece.x][selectedPiece.y] = null;
		board[x][y] = { ...selectedPiece, x, y };

		// Clear selection and moves
		selectedPiece = null;
		moves = [];
	}

	function handleCellClick(x: number, y: number) {
		const piece = board[x][y];
		if (piece && (!selectedPiece || piece.color === selectedPiece.color)) {
			selectPiece(piece);
		} else if (selectedPiece && moves.some((move) => move.x === x && move.y === y)) {
			movePiece(x, y);
		}
	}
</script>

<div class="mx-auto mt-20 w-160 border-10 border-cyan-950">
	{#each board as row, i}
		<div class="row">
			{#each row as _, j}
				<button
					class={[
						'cell',
						{
							selected: isSelected(i, j),
							white: !isSelected(i, j) && (i + j) % 2 === 0,
							black: !isSelected(i, j) && (i + j) % 2 !== 0,
							move: moves.some((move) => move.x === i && move.y === j),
							capture:
								moves.some((move) => move.x === i && move.y === j) &&
								board[i][j] &&
								board[i][j]!.color !== selectedPiece?.color
						}
					]}
					onclick={() => handleCellClick(i, j)}
				>
					{#if board[i][j]}
						<div class="cursor-pointer">
							<img class="w-17" src={getPieceImage(board[i][j])} alt={board[i][j]?.type} />
						</div>
					{/if}
				</button>
			{/each}
		</div>
	{/each}
</div>

<style>
	.row {
		display: flex;
		justify-content: center;
	}

	.cell {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cell.white {
		background-color: #eee;
	}

	.cell.black {
		background-color: #666;
		color: white;
	}

	.cell.move {
		background-color: #b1c131;
	}

	.cell.capture {
		background-color: #c13131;
	}

	.selected {
		background-color: rgb(150, 192, 255);
	}
</style>
