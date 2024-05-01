import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import generateMoves from './generateMoves.js';

export default function validateMove(before, after, board) {
	const movingPiece = board[COORDINATES[before[1]]][COORDINATES[before[0]]];

	switch(movingPiece) {
		case 1:
			return validate(before, after, board);
		case 2:
			return validate(before, after, board);
	}
}

function validate(before, after, board) {
	const moves = generateMoves(before, board);

	console.log(moves);

	if(moves.indexOf(after) > -1) return true;
	return false;
}
