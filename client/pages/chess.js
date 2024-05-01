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

let board = [
 	[10, 8, 9, 11, 14, 9, 8, 10],
 	[7, 7, 7, 7, 7, 7, 7, 7],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1],
 	[4, 2, 3, 5, 13, 3, 2, 4]
];

/*
 * 0 = Empty
 * 1 = White Pawn
 * 2 = White Knight
 * 3 = White Bishop
 * 4 = White Rook
 * 5 = White Queen
 * 6 = White King
 * 7  = Black Pawn
 * 8  = Black Knight
 * 9  = Black Bishop
 * 10 = Black Rook
 * 11 = Black Queen
 * 12 = Black King
 * 13 = White King (unmoved)
 * 14 = Black King (unmoved)
 */

function pieceCharacter(square) {
	switch(square) {
		case 4:
			return BLUE + String.fromCharCode(0x265c) + WHITE;
		case 10:
			return RED + String.fromCharCode(0x265c) + WHITE;
		case 2:
			return BLUE + String.fromCharCode(0x265e) + WHITE;
		case 8:
			return RED + String.fromCharCode(0x265e) + WHITE;
		case 3:
			return BLUE + String.fromCharCode(0x265d) + WHITE;
		case 9:
			return RED + String.fromCharCode(0x265d) + WHITE;
		case 13:
		case 6:
			return BLUE + String.fromCharCode(0x265a) + WHITE;
		case 14:
		case 12:
			return RED + String.fromCharCode(0x265a) + WHITE;
		case 5:
			return BLUE + String.fromCharCode(0x265b) + WHITE;
		case 11:
			return RED + String.fromCharCode(0x265b) + WHITE;
		case 1:
			return BLUE + String.fromCharCode(0x265f) + WHITE;
		case 7:
			return RED + String.fromCharCode(0x265f) + WHITE;
		default: 
			return ' ';
	}
}

function displayBoard(board) {
	let square, squareCoordinate, isWhite;

	for(let rank = 0; rank < board.length; ++rank) {
		process.stdout.write(8-rank + "\t"); // Writes the rank

		for(let file = 0; file < board[rank].length; ++file) {
			if((rank + file) % 2 === 0) {
				process.stdout.write(BG_WHITE + ' ' + pieceCharacter(board[rank][file]) + ' ');
			} else {
				process.stdout.write(BG_BLACK + ' ' + pieceCharacter(board[rank][file]) + ' ');
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

validateMove('e2', 'e5', board);

displayBoard(board);
