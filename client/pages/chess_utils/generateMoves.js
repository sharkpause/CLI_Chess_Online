import { COORDINATES, RANK_COORDINATES } from './constants.js';

export default function generateMoves(square, board) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generatePawnMoves(square, board);
	}
}

function generatePawnMoves(square, board) {
	const moves = [];

	if(board[COORDINATES[square[1]] - 2][COORDINATES[square[0]]] === 0) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
		// Checks if two squares in front of the pawn is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
		// Checks if one square in front of the pawn is empty
	}

	return moves;
}
