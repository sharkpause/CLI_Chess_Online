import { show, hide } from 'alternate-screen';
import readline from 'readline-sync';

import {
	RESET,
	RED,
	BLUE,
	WHITE,
	GREEN,
	BG_BLACK,
	BG_WHITE,
	BG_YELLOW,
	FILE_COORDINATES,
	RANK_COORDINATES,
	COORDINATES
} from './chess_utils/constants.js';

import validateMove from './chess_utils/validateMove.js';
import movePiece from './chess_utils/movePiece.js';
import generateMoves from './chess_utils/generateMoves.js';
import inCheck from './chess_utils/inCheck.js';

//let board = [
// 	[10, 8, 9, 11, 14, 9, 8, 10],
// 	[7, 7, 7, 7, 7, 7, 7, 7],
//	[0, 0, 0, 0, 0, 0, 0, 0],
//	[0, 0, 0, 0, 0, 0, 0, 0],
//	[0, 0, 0, 0, 0, 0, 0, 0],
//	[0, 0, 0, 0, 0, 0, 0, 0],
//	[1, 1, 1, 1, 1, 1, 1, 1],
// 	[4, 2, 3, 5, 13, 3, 2, 4]
//];

let board = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0], // Testing board
	[0, 0, 0, 12, 0, 12, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 6, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 12, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]
];

/*
 * 0 = Empty
 * 1 = White Pawn
 * 2 = White Knight
 * 3 = White Bishop
 * 4 = White Rook
 * 5 = White Queen
 * 6 = White King
 * 7 = White King (unmoved)
 * 8 = Black Pawn
 * 9 = Black Knight
 * 10 = Black Bishop
 * 11 = Black Rook
 * 12 = Black Queen
 * 13 = Black King
 * 14 = Black King (unmoved)
 */

const PIECE_CHARACTER = [
	' ',
	BLUE + String.fromCharCode(0x265f) + WHITE,
	BLUE + String.fromCharCode(0x265e) + WHITE,
	BLUE + String.fromCharCode(0x265d) + WHITE,
	BLUE + String.fromCharCode(0x265c) + WHITE,
	BLUE + String.fromCharCode(0x265b) + WHITE,
	BLUE + String.fromCharCode(0x265a) + WHITE,
	BLUE + String.fromCharCode(0x265a) + WHITE,
	RED + String.fromCharCode(0x265f) + WHITE,
	RED + String.fromCharCode(0x265e) + WHITE,
	RED + String.fromCharCode(0x265d) + WHITE,
	RED + String.fromCharCode(0x265c) + WHITE,
	RED + String.fromCharCode(0x265b) + WHITE,
	RED + String.fromCharCode(0x265a) + WHITE,
	RED + String.fromCharCode(0x265a) + WHITE
];

function displayBoard(board) {
	for(let rank = 0; rank < board.length; ++rank) {
		process.stdout.write(8-rank + "\t"); // Writes the rank

		for(let file = 0; file < board[rank].length; ++file) {
			if((rank + file) % 2 === 0) {
				process.stdout.write(BG_WHITE + ' ' + PIECE_CHARACTER[board[rank][file]] + ' ');
			} else {
				process.stdout.write(BG_BLACK + ' ' + PIECE_CHARACTER[board[rank][file]] + ' ');
			}
			process.stdout.write(RESET); // Resets the colors
		}

		console.log();
	}
	console.log(RESET + "\n\n\t a  b  c  d  e  f  g  h");
}

function displayHighlightedBoard(board, squares) {
	if(squares === undefined || squares.length <= 0) return displayBoard(board);

	for(let rank = 0; rank < board.length; ++rank) {
		process.stdout.write(8-rank + "\t"); // Writes the rank

		for(let file = 0; file < board[rank].length; ++file) {
			if(squares.indexOf(FILE_COORDINATES[file] + RANK_COORDINATES[rank]) > -1) {
				process.stdout.write(BG_YELLOW + ' ' + PIECE_CHARACTER[board[rank][file]] + ' ');
			} else if((rank + file) % 2 === 0) {
				process.stdout.write(BG_WHITE + ' ' + PIECE_CHARACTER[board[rank][file]] + ' ');
			} else {
				process.stdout.write(BG_BLACK + ' ' + PIECE_CHARACTER[board[rank][file]] + ' ');
			}
			process.stdout.write(RESET); // Resets the colors
		}

		console.log();
	}
	console.log(RESET + "\n\n\t a  b  c  d  e  f  g  h");
}

function move(before, after, board) {
	if(!validateMove(before, after, board)) return 1;

	const beforeFile = COORDINATES[before[0]];
	const beforeRank = COORDINATES[before[1]];

	const afterFile = COORDINATES[after[0]];
	const afterRank = COORDINATES[after[1]];

	const pieceToMove = board[beforeRank][beforeFile];

	board[beforeRank][beforeFile] = 0;
	board[afterRank][afterFile] = pieceToMove;
}

console.log('in check: ' + inCheck('e4', board));
displayHighlightedBoard(board, generateMoves('e4', board, false));
