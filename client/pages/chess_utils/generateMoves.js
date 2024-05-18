import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';

export default function generateMoves(square, board) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generateWhitePawnMoves(square, board);
		case 2:
			return generateWhiteKnightMoves(square, board);
		case 3:
			return generateWhiteBishopMoves(square, board);
	}
}

function generateWhiteBishopMoves(square, board) {
	const moves = [];

	for(let i = 0; i < board.length; ++i) {
		;
	}

	return moves;
}

function generateWhitePawnMoves(square, board) {
	const moves = [];

	if(COORDINATES[square[1]] - 2 > 0 && board[COORDINATES[square[1]] - 2][COORDINATES[square[0]]] === 0) {
		// Checks if two squares in front of the pawn is empty and not outside the board
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if(COORDINATES[square[1]] - 1 > 0 && board[COORDINATES[square[1]] - 1][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}

	return moves;
}

function generateWhiteKnightMoves(square, board) {
	const moves = [];

	if(COORDINATES[square[1]] - 2 >= 0 && COORDINATES[square[0]] - 1 >= 0 && board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] - 1] === 0) {
		// Check if two squares up and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if(COORDINATES[square[1]] - 2 >= 0 && COORDINATES[square[0]] + 1 < 8 && board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] + 1] === 0) {
		// Check if two squares up and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if(COORDINATES[square[1]] + 2 < 8 && COORDINATES[square[0]] - 1 >= 0 && board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] - 1] === 0) {
		// Check if two squares down and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] + 2]);
	}
	if(COORDINATES[square[1]] + 2 < 8 && COORDINATES[square[0]] + 1 < 8 && board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] + 1] === 0) {
		// Check if two squares down and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 1] + RANK_COORDINATES[COORDINATES[square[1]] + 2]);
	}
	if(COORDINATES[square[1]] - 1 >= 0 && COORDINATES[square[0]] - 2 >= 0 && board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] - 2] === 0) {
		// Check if two squares left and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 2] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}
	if(COORDINATES[square[1]] + 1 < 8 && COORDINATES[square[0]] - 2 >= 0 && board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] - 2] === 0) {
		// Check if two squares left and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 2] + RANK_COORDINATES[COORDINATES[square[1]] + 1]);
	}
	if(COORDINATES[square[1]] - 1 >= 0 && COORDINATES[square[0]] + 2 < 8 && board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] + 2] === 0) {
		// Check if two squares right and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 2] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}
	if(COORDINATES[square[1]] + 1 < 8 && COORDINATES[square[0]] + 2 < 8 && board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] + 2] === 0) {
		// Check if two squares right and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 2] + RANK_COORDINATES[COORDINATES[square[1]] + 1]);
	}

	return moves;
}
