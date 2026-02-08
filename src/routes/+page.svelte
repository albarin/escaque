<script lang="ts">
	import { initBoard, type Piece } from '$lib';

	const board: (Piece | null)[][] = initBoard();
</script>

<div>
	{#each board as row, i}
		<div class="row">
			{#each row as _, j}
				<div class="cell">
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
		border: 1px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
