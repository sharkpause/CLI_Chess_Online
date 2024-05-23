import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';

export default function generateMoves(square, board) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generatePawnMoves(square, board);
		case 2:
			return generateKnightMoves(square, board);
		case 3:
			return generateBishopMoves(square, board);
	}
}

function generateBishopMoves(square, board) {
	const moves = [];

	for(let i = 1; i < board.length; ++i) { // Top-left
		if(COORDINATES[square[0]]-i >= 0 && COORDINATES[square[1]]-i >= 0 && board[COORDINATES[square[1]]-i][COORDINATES[square[0]]-i] === 0) {
			moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
		} else {
			break;
		}
	}

	for(let i = 1; i < board.length; ++i) {
		if(COORDINATES[square[0]]+i < 8 && COORDINATES[square[1]]+i < 8 && board[COORDINATES[square[1]]+i][COORDINATES[square[0]]+i] === 0) {
			moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
		} else {
			break;
		}
	}

	for(let i = 1; i < board.length; ++i) {
		if(COORDINATES[square[0]]-i >= 0 && COORDINATES[square[1]]+i < 8 && board[COORDINATES[square[1]]+i][COORDINATES[square[0]]-i] === 0) {
			moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
		} else {
			break;
		}
	}

	for(let i = 1; i < board.length; ++i) {
		if(COORDINATES[square[0]]+i < 8 && COORDINATES[square[1]]-i >= 0 && board[COORDINATES[square[1]]-i][COORDINATES[square[0]]+i] === 0) {
			moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
		} else {
			break;
		}
	}	

	console.log(moves);

	return moves;
}

function generatePawnMoves(square, board) {
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

function generateKnightMoves(square, board) {
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
