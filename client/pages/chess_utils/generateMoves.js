import { COORDINATES, FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import inCheck from './inCheck.js';
import isEnemyPiece from './isEnemyPiece.js';
import generateMovesForChecks from './generateMovesForChecks.js';

export default function generateMoves(square, board, kingPosition, enPassant) {
	switch(board[COORDINATES[square[1]]][COORDINATES[square[0]]]) {
		case 1:
			return generateWhitePawnMoves(square, board, kingPosition, enPassant);
		case 2:
			return generateKnightMoves(square, board, 1, kingPosition); // 0: White, 1: Black
		case 3:
			return generateBishopMoves(square, board, 1, kingPosition);
		case 4:
		case 5:
			return generateRookMoves(square, board, 1, kingPosition);
		case 6:
			const diagonalsWhite = generateBishopMoves(square, board, 1, kingPosition);
			const straightsWhite = generateRookMoves(square, board, 1, kingPosition);

			return diagonalsWhite + straightsWhite;
		case 7:
		case 8:
			return generateKingMoves(square, board, 1);
			return generateKingMoves(square, board, 1);
		case 9:
			return generateBlackPawnMoves(square, board, kingPosition, enPassant);
		case 10:
			return generateKnightMoves(square, board, 0, kingPosition);
		case 11:
			return generateBishopMoves(square, board, 0, kingPosition);
		case 12:
		case 13:
			return generateRookMoves(square, board, 0, kingPosition);
		case 14:
			const diagonalsBlack = generateBishopMoves(square, board, 0, kingPosition);
			const straightsBlack = generateRookMoves(square, board, 0, kingPosition);

			return diagonalsBlack + straightsBlack;
		case 15:
			return generateKingMoves(square, board, 0);
			return generateKingMoves(square, board, 0);
	}
}

function generateKingMoves(square, board, enemyColor) {
	let moves = [];

	if(COORDINATES[square[0]]-1 >= 0 && !inCheck(FILE_COORDINATES[COORDINATES[square[0]]-1] + square[1], board, enemyColor) && (board[COORDINATES[square[1]]][COORDINATES[square[0]]-1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]][COORDINATES[square[0]]-1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + square[1]); // Left
	}
	if(COORDINATES[square[0]]+1 < 8 && !inCheck(FILE_COORDINATES[COORDINATES[square[0]]+1] + square[1], board, enemyColor) && (board[COORDINATES[square[1]]][COORDINATES[square[0]]+1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]][COORDINATES[square[0]]+1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + square[1]); // Right
	}
	if(COORDINATES[square[1]]-1 >= 0 && !inCheck(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1], board, enemyColor) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]] === 0 || isEnemyPiece(board[COORDINATES[square[1]]-1][COORDINATES[square[0]]], enemyColor))) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top
	}
	if(COORDINATES[square[1]]+1 < 8 && !inCheck(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+1], board, enemyColor) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]] === 0 || isEnemyPiece(board[COORDINATES[square[1]]+1][COORDINATES[square[0]]], enemyColor))) {
		moves.push(square[0] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom
	}

	if((COORDINATES[square[0]]-1 >= 0 && COORDINATES[square[1]]-1 >= 0) && !inCheck(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1], board, enemyColor) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]-1][COORDINATES[square[0]]-1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top-Left
	}
	if((COORDINATES[square[0]]+1 < 8 && COORDINATES[square[1]]-1 >= 0) && !inCheck(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1], board, enemyColor) && (board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]-1][COORDINATES[square[0]]+1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]-1]); // Top-Right
	}
	if((COORDINATES[square[0]]-1 >= 0 && COORDINATES[square[1]]+1 < 8) && !inCheck(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]+1], board, enemyColor) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]+1][COORDINATES[square[0]]-1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]-1] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom-Left
	}
	if((COORDINATES[square[0]]+1 < 8 && COORDINATES[square[1]]+1 < 8) && !inCheck(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]+1], board, enemyColor) && (board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1] === 0 || isEnemyPiece(board[COORDINATES[square[1]]+1][COORDINATES[square[0]]+1], enemyColor))) {
		moves.push(FILE_COORDINATES[COORDINATES[square[0]]+1] + RANK_COORDINATES[COORDINATES[square[1]]+1]); // Bottom-Right
	}

	if(board[COORDINATES[square[1]]][COORDINATES[square[0]]] === 8) {
		if(inCheck(square, board, 1)) return moves;
		let generatedMoves;

		for(let i = 0; i < board.length; ++i) {
			for(let j = 0; j < board[i].length; ++j) {
				if(board[i][j] !== 0 && isEnemyPiece(board[i][j], 1)) {
					generatedMoves += generateMovesForChecks(FILE_COORDINATES[j]+RANK_COORDINATES[i], board);
				}
			}
		}
		
		if(typeof generatedMoves !== "undefined") {
			if(board[7][0] === 5 && generatedMoves.indexOf('c1') < 0 && generatedMoves.indexOf('d1') < 0) {
				moves.push('c1');
			}
			if(board[7][7] === 5 && generatedMoves.indexOf('g1') < 0 && generatedMoves.indexOf('f1') < 0) {
				moves.push('g1');
			}
		} else {
			if(board[7][0] === 5) {
				moves.push('c1');
			}
			if(board[7][7] === 5) {
				moves.push('g1');
			}
		}
	}

	return moves;
}

function generateRookMoves(square, board, enemyColor, kingPosition) {
	const moves = [];

	let tempBoard;
	let moveCoordinates;

	for(let i = 1; i < board.length; ++i) { // Left, condition: 0 = checks for empty
		tempBoard = JSON.parse(JSON.stringify(board));
		moveCoordinates = COORDINATES[square[0]]-i;

		if(moveCoordinates >= 0) {
			if(board[COORDINATES[square[1]]][moveCoordinates] === 0) {
				move(square, FILE_COORDINATES[moveCoordinates] + square[1], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(FILE_COORDINATES[moveCoordinates] + square[1]);
			} else if(isEnemyPiece(board[COORDINATES[square[1]]][moveCoordinates], moveCoordinates, enemyColor)) {
				move(square, FILE_COORDINATES[moveCoordinates] + square[1], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(FILE_COORDINATES[moveCoordinates] + square[1]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Top
		tempBoard = JSON.parse(JSON.stringify(board));
		moveCoordinates = COORDINATES[square[1]]-i;

		if(moveCoordinates >= 0) {
			if(board[moveCoordinates][COORDINATES[square[0]]] === 0) {
				move(square, square[0] + RANK_COORDINATES[moveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(square[0] + RANK_COORDINATES[moveCoordinates]);
			} else if(isEnemyPiece(board[moveCoordinates][COORDINATES[square[0]]], enemyColor)) {
				move(square, square[0] + RANK_COORDINATES[moveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(square[0] + RANK_COORDINATES[moveCoordinates]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Right
		tempBoard = JSON.parse(JSON.stringify(board));
		moveCoordinates = COORDINATES[square[0]]+i;

		if(moveCoordinates < 8) {
			if(board[COORDINATES[square[1]]][moveCoordinates] === 0) {
				move(square, FILE_COORDINATES[moveCoordinates] + square[1], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(FILE_COORDINATES[moveCoordinates] + square[1]);
			} else if(isEnemyPiece(board[COORDINATES[square[1]]][moveCoordinates], enemyColor)) {
				move(square, FILE_COORDINATES[moveCoordinates] + square[1], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(FILE_COORDINATES[moveCoordinates] + square[1]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Bottom
		tempBoard = JSON.parse(JSON.stringify(board));
		moveCoordinates = COORDINATES[square[1]]+i;

		if(moveCoordinates < 8) {
			if(board[moveCoordinates][COORDINATES[square[0]]] === 0) {
				move(square, square[0] + RANK_COORDINATES[moveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(square[0] + RANK_COORDINATES[moveCoordinates]);
			} else if(isEnemyPiece(board[moveCoordinates][COORDINATES[square[0]]], enemyColor)) {
				move(square, square[0] + RANK_COORDINATES[moveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(square[0] + RANK_COORDINATES[moveCoordinates]);
				break;
			} else {
				break;
			}
		}
	}

	return moves;
}

function generateBishopMoves(square, board, enemyColor, kingPosition) {
	const moves = [];

	let tempBoard;
	let fileMoveCoordinates;
	let rankMoveCoordinates;

	for(let i = 1; i < board.length; ++i) { // Top-left
		tempBoard = JSON.parse(JSON.stringify(board));
		fileMoveCoordinates = COORDINATES[square[0]]-i;
		rankMoveCoordinates = COORDINATES[square[1]]-i;

		if(fileMoveCoordinates >= 0 && rankMoveCoordinates >= 0) {
			if(board[rankMoveCoordinates][fileMoveCoordinates] === 0) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
			} else if(isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates], enemyColor)) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Bottom-right
		tempBoard = JSON.parse(JSON.stringify(board));
		fileMoveCoordinates = COORDINATES[square[0]]+i;
		rankMoveCoordinates = COORDINATES[square[1]]+i;

		if(fileMoveCoordinates < 8 && rankMoveCoordinates < 8) {
			if(board[rankMoveCoordinates][fileMoveCoordinates] === 0) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
			} else if(isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates], enemyColor)) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankmoveCoordinates]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Top-right
		tempBoard = JSON.parse(JSON.stringify(board));
		fileMoveCoordinates = COORDINATES[square[0]]+i;
		rankMoveCoordinates = COORDINATES[square[1]]-i;

		if(fileMoveCoordinates < 8 && rankMoveCoordinates >= 0) {
			if(board[rankMoveCoordinates][fileMoveCoordinates] === 0) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
			} else if(isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates], enemyColor)) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
				break;
			} else {
				break;
			}
		}
	}

	for(let i = 1; i < board.length; ++i) { // Bottom-left
		tempBoard = JSON.parse(JSON.stringify(board));
		fileMoveCoordinates = COORDINATES[square[0]]-i;
		rankMoveCoordinates = COORDINATES[square[1]]+i;

		if(fileMoveCoordinates < 8 && rankMoveCoordinates >= 0) {
			if(board[rankMoveCoordinates][fileMoveCoordinates] === 0) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) continue;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
			} else if(isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates], enemyColor)) {
				move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

				if(inCheck(kingPosition, tempBoard, enemyColor)) break;

				moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
				break;
			} else {
				break;
			}
		}
	}	

	return moves;
}

function generateWhitePawnMoves(square, board, kingPosition, enPassant) {
	const moves = [];
	const enemyColor = 1;

	let tempBoard = JSON.parse(JSON.stringify(board));
	let fileMoveCoordinates;
	let rankMoveCoordinates;

	if(square[1] == 2) {
		rankMoveCoordinates = COORDINATES[square[1]]-2;
		move(square, square[0] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

		if(!inCheck(kingPosition, tempBoard, enemyColor) && board[rankMoveCoordinates][COORDINATES[square[0]]] === 0) {
			// Checks if two squares in front of the pawn is empty and not outside the board
			moves.push(square[0] + RANK_COORDINATES[rankMoveCoordinates]);
		}
	}

	tempBoard = JSON.parse(JSON.stringify(board));

	rankMoveCoordinates = COORDINATES[square[1]]-1;
	if(rankMoveCoordinates >= 0) move(square, square[0] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if(!inCheck(kingPosition, tempBoard, enemyColor) && board[rankMoveCoordinates][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]]-1;
	rankMoveCoordinates = COORDINATES[square[1]]-1;
	if(rankMoveCoordinates >= 0 && fileMoveCoordinates >= 0) move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if(board[rankMoveCoordinates][fileMoveCoordinates] > 8) {
		// Checks if one square in front of the pawn and to the left has an enemy piece
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]]+1;
	if(rankMoveCoordinates >= 0 && fileMoveCoordinates < 8) move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if(rankMoveCoordinates >= 0 && fileMoveCoordinates < 8 && board[rankMoveCoordinates][fileMoveCoordinates] > 8) {
		// Checks if one square in front of the pawn and to the right has an enemy piece
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	for(let i = 0; i < enPassant.length; ++i) {
		if(enPassant[i][0] === square) moves.push(enPassant[i][1]);
	}

	for(let i = 0; i < enPassant.length; ++i) {
		if(enPassant[i][0] === square) moves.push(enPassant[i][1]);
	}

	return moves;
}

function generateBlackPawnMoves(square, board, kingPosition, enPassant) {
	const moves = [];
	const enemyColor = 0;

	let tempBoard = JSON.parse(JSON.stringify(board));
	let rankMoveCoordinates;

	if(square[1] === '7') {
		rankMoveCoordinates = COORDINATES[square[1]]+2;
		move(square, square[0] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

		if(!inCheck(kingPosition, tempBoard, enemyColor) && board[rankMoveCoordinates][COORDINATES[square[0]]] === 0) {
			// Checks if two squares in front of the pawn is empty and not outside the board
			moves.push(square[0] + RANK_COORDINATES[rankMoveCoordinates]);
		}
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	rankMoveCoordinates = COORDINATES[square[1]]+1;
	if(rankMoveCoordinates < 8) move(square, square[0] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if(!inCheck(kingPosition, tempBoard, enemyColor) && board[rankMoveCoordinates][COORDINATES[square[0]]] === 0) {
		// Checks if one square in front of the pawn is empty
		moves.push(square[0] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	let fileMoveCoordinates = COORDINATES[square[0]]-1;
	if(rankMoveCoordinates < 8 && fileMoveCoordinates >= 0) move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if(!inCheck(kingPosition, tempBoard, enemyColor) && board[rankMoveCoordinates][fileMoveCoordinates] < 9 && board[rankMoveCoordinates][fileMoveCoordinates] > 0) {
		// Checks if one square in front of the pawn and to the left has an enemy piece
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]]+1;
	rankMoveCoordinates = COORDINATES[square[1]]+1;
	if(rankMoveCoordinates < 8 && fileMoveCoordinates < 8) move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if(!inCheck(kingPosition, tempBoard, enemyColor) && board[rankMoveCoordinates][fileMoveCoordinates] < 9 && board[rankMoveCoordinates][fileMoveCoordinates] > 0) {
		// Checks if one square in front of the pawn and to the right has an enemy piece
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	for(let i = 0; i < enPassant.length; ++i) {
		if(enPassant[i][0] === square) moves.push(enPassant[i][1]);
	}

	return moves;
}

function generateKnightMoves(square, board, enemyColor, kingPosition) {
	const moves = [];

	let tempBoard = JSON.parse(JSON.stringify(board));
	let fileMoveCoordinates = COORDINATES[square[0]] - 1;
	let rankMoveCoordinates = COORDINATES[square[1]] - 2;

	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates >= 0 && fileMoveCoordinates >= 0) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares up and one square left is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] + 1;
	rankMoveCoordinates = COORDINATES[square[1]] - 2;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates >= 0 && fileMoveCoordinates < 8) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares up and one square right is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] - 1;
	rankMoveCoordinates = COORDINATES[square[1]] + 2;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates < 8 && fileMoveCoordinates >= 0) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares down and one square left is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] + 1;
	rankMoveCoordinates = COORDINATES[square[1]] + 2;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates < 8 && fileMoveCoordinates < 8) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares down and one square right is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] - 2;
	rankMoveCoordinates = COORDINATES[square[1]] - 1;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates >= 0 && fileMoveCoordinates >= 0) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares left and one square left is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] - 2;
	rankMoveCoordinates = COORDINATES[square[1]] + 1;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates < 8 && fileMoveCoordinates >= 0) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares left and one square right is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] + 2;
	rankMoveCoordinates = COORDINATES[square[1]] - 1;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates >= 0 && fileMoveCoordinates < 8) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates] > 7, enemyColor))) {
		// Check if two squares right and one square left is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	tempBoard = JSON.parse(JSON.stringify(board));
	fileMoveCoordinates = COORDINATES[square[0]] + 2;
	rankMoveCoordinates = COORDINATES[square[1]] + 1;
	move(square, FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates], tempBoard);

	if((rankMoveCoordinates < 8 && fileMoveCoordinates < 8) && !inCheck(kingPosition, tempBoard, enemyColor) && (board[rankMoveCoordinates][fileMoveCoordinates] === 0 || isEnemyPiece(board[rankMoveCoordinates][fileMoveCoordinates], enemyColor))) {
		// Check if two squares right and one square down is empty
		moves.push(FILE_COORDINATES[fileMoveCoordinates] + RANK_COORDINATES[rankMoveCoordinates]);
	}

	return moves;
}

function move(before, after, board) {
	const beforeFile = COORDINATES[before[0]];
	const beforeRank = COORDINATES[before[1]];

	const afterFile = COORDINATES[after[0]];
	const afterRank = COORDINATES[after[1]];

	const pieceToMove = board[beforeRank][beforeFile];

	board[beforeRank][beforeFile] = 0;
	board[afterRank][afterFile] = pieceToMove;
}
