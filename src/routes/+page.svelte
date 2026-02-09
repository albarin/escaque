<script lang="ts">
	import {
		getPieceImage,
		initBoard,
		type Piece,
		type Board,
		getMoves,
		pieceIsInTheBackRank
	} from '$lib';

	let board: Board = $state(initBoard());

	let selectedPiece: Piece | null = $state(null);
	let moves: { x: number; y: number }[] = $state([]);

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
			const targetPiece = board[x][y];
			if (targetPiece && pieceIsInTheBackRank(targetPiece) && targetPiece.type === 'pawn') {
				targetPiece.type = 'queen';
			}
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
						'relative',
						{
							selected: isSelected(i, j),
							'bg-white': !isSelected(i, j) && (i + j) % 2 === 0,
							'bg-black': !isSelected(i, j) && (i + j) % 2 !== 0
						}
					]}
					onclick={() => handleCellClick(i, j)}
				>
					{#if i === 7}
						<div
							class={[
								'absolute bottom-0.5 left-1 text-xs',
								{
									'text-black': (i + j) % 2 === 0,
									'text-white': (i + j) % 2 !== 0
								}
							]}
						>
							{String.fromCharCode(97 + j)}
						</div>
					{/if}
					{#if j === 0}
						<div
							class={[
								'absolute top-1 left-1 text-xs',
								{
									'text-black': (i + j) % 2 === 0,
									'text-white': (i + j) % 2 !== 0
								}
							]}
						>
							{8 - i}
						</div>
					{/if}
					{#if board[i][j]}
						<div class="cursor-pointer">
							<img class="w-17" src={getPieceImage(board[i][j])} alt={board[i][j]?.type} />
						</div>
					{/if}
					{#if moves.some((move) => move.x === i && move.y === j)}
						{#if !board[i][j] || board[i][j]!.color === selectedPiece?.color}
							<div class="dot"></div>
						{:else}
							<div class="capture"></div>
						{/if}
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

	.bg-white {
		background-color: #eee;
	}

	.bg-black {
		background-color: #666;
	}

	.text-white {
		color: #eee;
	}

	.text-black {
		color: #666;
	}

	.dot {
		height: 25px;
		width: 25px;
		opacity: 0.25;
		background-color: black;
		border-radius: 50%;
		display: inline-block;
	}

	.capture {
		height: 75px;
		width: 75px;
		opacity: 0.3;
		border: 7px solid #80030f;
		background-color: transparent;
		border-radius: 50%;
		position: absolute;
	}

	.selected {
		background-color: rgb(150, 192, 255);
	}
</style>
