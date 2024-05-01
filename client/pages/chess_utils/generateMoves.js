import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';

export default function generateMoves(square, board) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generateWhitePawnMoves(square, board);
		case 2:
			return generateWhiteKnightMoves(square, board);
	}
}

function generateWhitePawnMoves(square, board) {
	const moves = [];

	if(board[COORDINATES[square[1]] - 2][COORDINATES[square[0]]] === 0) {
		// Checks if two squares in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}

	return moves;
}

function generateWhiteKnightMoves(square, board) {
	const moves = [];

	if(board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] - 1] === 0) {
		// Check if two squares up and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] + 1] === 0) {
		// Check if two squares up and one square right is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Check if two squares down and one square left is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Check if two squares down and one square right is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Check if two squares left and one square left is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Check if two squares left and one square right is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Check if two squares right and one square left is empty
	}
	if(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Check if two squares right and one square right is empty
	}

	return moves;
}
