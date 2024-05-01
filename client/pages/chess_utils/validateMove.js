import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';

export default function validateMove(before, after, board) {
	const movingPiece = board[COORDINATES[before[1]]][COORDINATES[before[0]]];

	switch(movingPiece) {
		case 1:
			const a = validatePawn(before, after, board);
			console.log(a);
			break;
	}
}

function validatePawn(before, after, board) {
	if(board[COORDINATES[before[1]] - 2][COORDINATES[before[0]]] === 0) {
		if(FILE_COORDINATES[COORDINATES[before[0]]] + RANK_COORDINATES[COORDINATES[before[1]] - 2] === after) return true;
		// Checks if two squares in front of the pawn is empty
	}
	if(board[COORDINATES[before[1]] - 1][COORDINATES[before[0]]] === 0) {
		if(FILE_COORDINATES[COORDINATES[before[0]]] + RANK_COORDINATES[COORDINATES[before[1]] - 1] === after) return true;
		// Checks if one square in front of the pawn is empty
	}

	return false;
}
