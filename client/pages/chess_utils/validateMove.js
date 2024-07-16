import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import generateMoves from './generateMoves.js';

export default function validateMove(before, after, board, kingPosition, enPassant) {
	const movingPiece = board[COORDINATES[before[1]]][COORDINATES[before[0]]];
	if(movingPiece <= 0) return 1;

	const moves = generateMoves(before, board, kingPosition, enPassant);

	if(moves.indexOf(after) > -1) return true;
	return false;
}
