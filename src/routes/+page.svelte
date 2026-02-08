<script lang="ts">
	import { initBoard, type Piece } from '$lib';

	const board: (Piece | null)[][] = initBoard();
</script>

<div class="mx-auto mt-20 w-160 border-8 border-cyan-950">
	{#each board as row, i}
		<div class="row">
			{#each row as _, j}
				<div class="cell {(i + j) % 2 === 0 ? 'white' : 'black'}">
					<p>{board[i][j]?.type}</p>
					_
					<p>{board[i][j]?.color[0]}</p>
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
		background-color: #444;
		color: white;
	}
</style>
