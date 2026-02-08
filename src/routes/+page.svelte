<script lang="ts">
	import { getPieceImage, initBoard, type Piece, type Board, getMoves } from '$lib';

	const board: Board = initBoard();

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
</script>

<div class="mx-auto mt-20 w-160 border-10 border-cyan-950">
	{#each board as row, i}
		<div class="row">
			{#each row as _, j}
				<div
					class={[
						'cell',
						{
							selected: isSelected(i, j),
							white: !isSelected(i, j) && (i + j) % 2 === 0,
							black: !isSelected(i, j) && (i + j) % 2 !== 0,
							'border-4 border-yellow-400': moves.some((move) => move.x === i && move.y === j)
						}
					]}
				>
					{#if board[i][j]}
						<button class="cursor-pointer" onclick={() => selectPiece(board[i][j]!)}>
							<img class="w-17" src={getPieceImage(board[i][j])} alt={board[i][j]?.type} />
						</button>
					{/if}
				</div>
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

	.selected {
		background-color: rgb(150, 192, 255);
	}
</style>
