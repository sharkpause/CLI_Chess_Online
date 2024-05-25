import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';

export default function generateMoves(square, board) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generatePawnMoves(square, board);
		case 2:
			return generateKnightMoves(square, board);
		case 3:
			return generateBishopMoves(square, board);
		case 4:
			return generateRookMoves(square, board);
		case 5:
			const diagonals = generateBishopMoves(square, board);
			const straights = generateRookMoves(square, board);

			return diagonals + straights;
		case 6:
			return generateKingMoves(square, board);
	}
}

function generateKingMoves(square, board) {
	const moves = [];

	if(COORDINATES[square[0]]-1 >= 0 && (board[COORDINATES[square[1]]][COORDINATES[square[0]]-1] === 0 || board[COORDINATES[square[1]]][COORDINATES[square[0]]-1] > 6)) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + square[1]); // Left
	}
	if(COORDINATES[square[0]]+1 < 8 && (board[COORDINATES[square[1]]][COORDINATES[square[0]]+1] === 0 || board[COORDINATES[square[1]]][COORDINATES[square[0]]+1] > 6)) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + square[1]); // Right
	}
	if(COORDINATES[square[1]]-1 >= 0 && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]] === 0 || board[COORDINATES[square[1]]-1][COORDINATES[square[0]]] > 6)) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top
	}
	if(COORDINATES[square[1]]+1 < 8 && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]] === 0 || board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1] > 6)) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom
	}

	if((COORDINATES[square[0]]-1 >= 0 && COORDINATES[square[1]]-1 >= 0) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1] === 0 || board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1] > 6)) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}
	if((COORDINATES[square[0]]+1 < 8 && COORDINATES[square[1]]-1 >= 0) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1] === 0 || board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1] > 6)) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}
	if((COORDINATES[square[0]]-1 >= 0 && COORDINATES[square[1]]+1 < 8) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1] === 0 || board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1] > 6)) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]+1]);
	}
	if((COORDINATES[square[0]]+1 < 8 && COORDINATES[square[1]]+1 < 8) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1] === 0 || board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1] > 6)) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]+1]);
	}

	return moves;
}

function generateRookMoves(square, board) {
	const moves = [];

	for(let i = 1; i < board.length; ++i) { // Left, condition: 0 = checks for empty, > 6 = checks for enemy pieces
		if(COORDINATES[square[0]]-i >= 0) {
			if(board[COORDINATES[square[1]]][COORDINATES[square[0]]-i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + square[1]);
			} else if(board[COORDINATES[square[1]]][COORDINATES[square[0]]-i] > 6) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + square[1]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Top
		if(COORDINATES[square[1]]-i >= 0) {
			if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]] === 0) {
				moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
			} else if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]] > 6) {
				moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Right
		if(COORDINATES[square[0]]+i < 8) {
			if(board[COORDINATES[square[1]]][COORDINATES[square[0]]+i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + square[1]);
			} else if(board[COORDINATES[square[1]]][COORDINATES[square[0]]+i] > 6) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + square[1]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Bottom
		if(COORDINATES[square[1]]+i < 8) {
			if(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]] === 0) {
				moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
			} else if(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]] > 6) {
				moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
				break;
			} else {
				break;
			}
		}
	}

	return moves;
}

function generateBishopMoves(square, board) {
	const moves = [];

	for(let i = 1; i < board.length; ++i) { // Top-left
		if(COORDINATES[square[0]]-i >= 0 && COORDINATES[square[1]]-i >= 0) {
			if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]-i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
			} else if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]-i] > 6) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Bottom-right
		if(COORDINATES[square[0]]+i < 8 && COORDINATES[square[1]]+i < 8) {
			if(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]+i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
			} else if(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]+i] > 6) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Top-right
		if(COORDINATES[square[0]]-i >= 0 && COORDINATES[square[1]]+i < 8) {
			if(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]-i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
			} else if(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]-i] > 6) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Bottom-left
		if(COORDINATES[square[0]]+i < 8 && COORDINATES[square[1]]-i >= 0) {
			if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]+i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
			} else if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]+i] > 6) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
				break;
			} else {
				break;
			}
		}
	}	

	console.log(moves);

	return moves;
}

function generatePawnMoves(square, board) {
	const moves = [];

	if(COORDINATES[square[1]]-2 > 0 && board[COORDINATES[square[1]]-2][COORDINATES[square[0]]] === 0) {
		// Checks if two squares in front of the pawn is empty and not outside the board
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-2]);
	}
	if(COORDINATES[square[1]]-1 > 0 && board[COORDINATES[square[1]]-1][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}
	if(COORDINATES[square[1]]-1 > 0 && board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1] > 6) {
		// Checks if one square in front of the pawn and to the left has an enemy piece
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}
	if(COORDINATES[square[1]]-1 > 0 && board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1] > 6) {
		// Checks if one square in front of the pawn and to the right has an enemy piece
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}

	return moves;
}

function generateKnightMoves(square, board) {
	const moves = [];

	if((COORDINATES[square[1]] - 2 >= 0 && COORDINATES[square[0]] - 1 >= 0) && (board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] - 1] === 0 || board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] - 1] > 6)) {
		// Check if two squares up and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if((COORDINATES[square[1]] - 2 >= 0 && COORDINATES[square[0]] + 1 < 8) && (board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] + 1] === 0 || board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] + 1] > 6)) {
		// Check if two squares up and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if((COORDINATES[square[1]] + 2 < 8 && COORDINATES[square[0]] - 1 >= 0) && (board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] - 1] === 0 || board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] - 1] > 6)) {
		// Check if two squares down and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] + 2]);
	}
	if((COORDINATES[square[1]] + 2 < 8 && COORDINATES[square[0]] + 1 < 8) && (board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] + 1] === 0 || board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] + 1] > 6)) {
		// Check if two squares down and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 1] + RANK_COORDINATES[COORDINATES[square[1]] + 2]);
	}
	if((COORDINATES[square[1]] - 1 >= 0 && COORDINATES[square[0]] - 2 >= 0) && (board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] - 2] === 0 || board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] - 2] > 6)) {
		// Check if two squares left and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 2] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}
	if((COORDINATES[square[1]] + 1 < 8 && COORDINATES[square[0]] - 2 >= 0) && (board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] - 2] === 0 || board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] - 2] > 6)) {
		// Check if two squares left and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 2] + RANK_COORDINATES[COORDINATES[square[1]] + 1]);
	}
	if((COORDINATES[square[1]] - 1 >= 0 && COORDINATES[square[0]] + 2 < 8) && (board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] + 2] === 0 || board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] + 2] > 6)) {
		// Check if two squares right and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 2] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}
	if((COORDINATES[square[1]] + 1 < 8 && COORDINATES[square[0]] + 2 < 8) && (board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] + 2] === 0 || board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] + 2] > 6)) {
		// Check if two squares right and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 2] + RANK_COORDINATES[COORDINATES[square[1]] + 1]);
	}

	return moves;
}
