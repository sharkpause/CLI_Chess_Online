import { COORDINATES } from './constants.js';

export default function movePiece(beforeSquare, afterSquare, board) {
	board[COORDINATES[afterSquare[1]]][COORDINATES[afterSquare[0]]] = board[COORDINATES[beforeSquare[1]]][COORDINATES[beforeSquare[0]]];
	// Moves piece from before square to after square

	board[COORDINATES[beforeSquare[1]]][COORDINATES[beforeSquare[0]]] = 0; // Sets before square to empty

	return 0;
}
