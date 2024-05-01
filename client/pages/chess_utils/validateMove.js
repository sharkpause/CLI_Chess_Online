import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import generateMoves from './generateMoves.js';

export default function validateMove(before, after, board) {
	const movingPiece = board[COORDINATES[before[1]]][COORDINATES[before[0]]];

	switch(movingPiece) {
		case 1:
			return validatePawn(before, after, board);
		case 2:
			return generateMoves(before, board);
	}
}

function validatePawn(before, after, board) {
	const moves = generateMoves(before, board);

	if(moves.indexOf(after) > -1) return true;
	return false;
}
