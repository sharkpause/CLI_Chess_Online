import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import inCheck from './inCheck.js';
import isEnemyPiece from './isEnemyPiece.js';

export default function generateMoves(square, board) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generateWhitePawnMoves(square, board);
		case 2:
			return generateKnightMoves(square, board, 1); // 0: White, 1: Black
		case 3:
			return generateBishopMoves(square, board, 1);
		case 4:
			return generateRookMoves(square, board, 1);
		case 5:
			const diagonalsWhite = generateBishopMoves(square, board, 1);
			const straightsWhite = generateRookMoves(square, board, 1);

			return diagonalsWhite + straightsWhite;
		case 6:
			return generateKingMoves(square, board, 1);
		case 8:
			return generateBlackPawnMoves(square, board);
		case 9:
			return generateKnightMoves(square, board, 0);
		case 10:
			return generateBishopMoves(square, board, 0);
		case 11:
			return generateRookMoves(square, board, 0);
		case 12:
			const diagonalsBlack = generateBishopMoves(square, board, 0);
			const straightsBlack = generateRookMoves(square, board, 0);

			return diagonalsBlack + straightsBlack;
		case 13:
			return generateKingMoves(square, board, 0);
	}
}

function generateKingMoves(square, board, enemyColor) {
	const moves = [];

	if(!inCheck(FILE_COORDINATES[COORDINATES[square[0]]-1] + square[1], board, enemyColor) && (COORDINATES[square[0]]-1 >= 0 && (board[COORDINATES[square[1]]][COORDINATES[square[0]]-1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]][COORDINATES[square[0]]-1], enemyColor)))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + square[1]); // Left
	}
	if(!inCheck(FILE_COORDINATES[COORDINATES[square[0]]+1] + square[1], board, enemyColor) && (COORDINATES[square[0]]+1 < 8 && (board[COORDINATES[square[1]]][COORDINATES[square[0]]+1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]][COORDINATES[square[0]]+1], enemyColor)))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + square[1]); // Right
	}
	if(!inCheck(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1], board, enemyColor) && (COORDINATES[square[1]]-1 >= 0 && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]] === 0 || isEnemyPiece(board[COORDINATES[square[1]]-1][COORDINATES[square[0]]], enemyColor)))) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top
	}
	if(!inCheck(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+1], board, enemyColor) && (COORDINATES[square[1]]+1 < 8 && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]] === 0 || isEnemyPiece(board[COORDINATES[square[1]]+1][COORDINATES[square[0]]], enemyColor)))) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom
	}

	if(!inCheck(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1], board, enemyColor) && (COORDINATES[square[0]]-1 >= 0 && COORDINATES[square[1]]-1 >= 0) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top-Left
	}
	if(!inCheck(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1], board, enemyColor) && (COORDINATES[square[0]]+1 < 8 && COORDINATES[square[1]]-1 >= 0) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top-Right
	}
	if(!inCheck(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]+1], board, enemyColor) && (COORDINATES[square[0]]-1 >= 0 && COORDINATES[square[1]]+1 < 8) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom-Left
	}
	if(!inCheck(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]+1], board, enemyColor) && (COORDINATES[square[0]]+1 < 8 && COORDINATES[square[1]]+1 < 8) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom-Right
	}

	return moves;
}

function generateRookMoves(square, board, enemyColor) {
	const moves = [];

	for(let i = 1; i < board.length; ++i) { // Left, condition: 0 = checks for empty
		if(COORDINATES[square[0]]-i >= 0) {
			if(board[COORDINATES[square[1]]][COORDINATES[square[0]]-i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + square[1]);
			} else if(isEnemyPiece(board[COORDINATES[square[1]]][COORDINATES[square[0]]-i], enemyColor)) {
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
			} else if(isEnemyPiece(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]], enemyColor)) {
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
			} else if(isEnemyPiece(board[COORDINATES[square[1]]][COORDINATES[square[0]]+i], enemyColor)) {
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
			} else if(isEnemyPiece(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]], enemyColor)) {
				moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+i]);
				break;
			} else {
				break;
			}
		}
	}

	return moves;
}

function generateBishopMoves(square, board, enemyColor) {
	const moves = [];

	for(let i = 1; i < board.length; ++i) { // Top-left
		if(COORDINATES[square[0]]-i >= 0 && COORDINATES[square[1]]-i >= 0) {
			if(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]-i] === 0) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]-i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
			} else if(isEnemyPiece(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]-i], enemyColor)) {
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
			} else if(isEnemyPiece(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]+i], enemyColor)) {
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
			} else if(isEnemyPiece(board[COORDINATES[square[1]]+i][COORDINATES[square[0]]-i], enemyColor)) {
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
			} else if(isEnemyPiece(board[COORDINATES[square[1]]-i][COORDINATES[square[0]]+i], enemyColor)) {
				moves.push(FILE_COORDINATES[COORDINATES[square[0]]+i] + RANK_COORDINATES[COORDINATES[square[1]]-i]);
				break;
			} else {
				break;
			}
		}
	}	

	return moves;
}

function generateWhitePawnMoves(square, board) {
	const moves = [];

	if(COORDINATES[square[1]]-2 > 0 && board[COORDINATES[square[1]]-2][COORDINATES[square[0]]] === 0) {
		// Checks if two squares in front of the pawn is empty and not outside the board
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-2]);
	}
	if(COORDINATES[square[1]]-1 > 0 && board[COORDINATES[square[1]]-1][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}
	if(COORDINATES[square[1]]-1 > 0 && board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1] > 7) {
		// Checks if one square in front of the pawn and to the left has an enemy piece
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}
	if(COORDINATES[square[1]]-1 > 0 && board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1] > 7) {
		// Checks if one square in front of the pawn and to the right has an enemy piece
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1]);
	}

	return moves;
}

function generateBlackPawnMoves(square, board) {
	const moves = [];

	if(COORDINATES[square[1]]+2 > 0 && board[COORDINATES[square[1]]+2][COORDINATES[square[0]]] === 0) {
		// Checks if two squares in front of the pawn is empty and not outside the board
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+2]);
	}
	if(COORDINATES[square[1]]+1 > 0 && board[COORDINATES[square[1]]+1][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+1]);
	}
	if(COORDINATES[square[1]]+1 > 0 && board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1] < 8) {
		// Checks if one square in front of the pawn and to the left has an enemy piece
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]+1]);
	}
	if(COORDINATES[square[1]]+1 > 0 && board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1] < 8) {
		// Checks if one square in front of the pawn and to the right has an enemy piece
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]+1]);
	}

	return moves;
}

function generateKnightMoves(square, board, enemyColor) {
	const moves = [];

	if((COORDINATES[square[1]] - 2 >= 0 && COORDINATES[square[0]] - 1 >= 0) && (board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] - 1] === 0 || isEnemyPiece(board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] - 1] > 7, enemyColor))) {
		// Check if two squares up and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if((COORDINATES[square[1]] - 2 >= 0 && COORDINATES[square[0]] + 1 < 8) && (board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] + 1] === 0 || isEnemyPiece(board[COORDINATES[square[1]] - 2][COORDINATES[square[0]] + 1] > 7, enemyColor))) {
		// Check if two squares up and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 1] + RANK_COORDINATES[COORDINATES[square[1]] - 2]);
	}
	if((COORDINATES[square[1]] + 2 < 8 && COORDINATES[square[0]] - 1 >= 0) && (board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] - 1] === 0 || isEnemyPiece(board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] - 1] > 7, enemyColor))) {
		// Check if two squares down and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 1] + RANK_COORDINATES[COORDINATES[square[1]] + 2]);
	}
	if((COORDINATES[square[1]] + 2 < 8 && COORDINATES[square[0]] + 1 < 8) && (board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] + 1] === 0 || isEnemyPiece(board[COORDINATES[square[1]] + 2][COORDINATES[square[0]] + 1] > 7, enemyColor))) {
		// Check if two squares down and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 1] + RANK_COORDINATES[COORDINATES[square[1]] + 2]);
	}
	if((COORDINATES[square[1]] - 1 >= 0 && COORDINATES[square[0]] - 2 >= 0) && (board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] - 2] === 0 || isEnemyPiece(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] - 2] > 7, enemyColor))) {
		// Check if two squares left and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 2] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}
	if((COORDINATES[square[1]] + 1 < 8 && COORDINATES[square[0]] - 2 >= 0) && (board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] - 2] === 0 || isEnemyPiece(board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] - 2] > 7, enemyColor))) {
		// Check if two squares left and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] - 2] + RANK_COORDINATES[COORDINATES[square[1]] + 1]);
	}
	if((COORDINATES[square[1]] - 1 >= 0 && COORDINATES[square[0]] + 2 < 8) && (board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] + 2] === 0 || isEnemyPiece(board[COORDINATES[square[1]] - 1][COORDINATES[square[0]] + 2] > 7, enemyColor))) {
		// Check if two squares right and one square left is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 2] + RANK_COORDINATES[COORDINATES[square[1]] - 1]);
	}
	if((COORDINATES[square[1]] + 1 < 8 && COORDINATES[square[0]] + 2 < 8) && (board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] + 2] === 0 || isEnemyPiece(board[COORDINATES[square[1]] + 1][COORDINATES[square[0]] + 2], enemyColor))) {
		// Check if two squares right and one square right is empty
		moves.push(FILE_COORDINATES[COORDINATES[square[0]] + 2] + RANK_COORDINATES[COORDINATES[square[1]] + 1]);
	}

	return moves;
}
