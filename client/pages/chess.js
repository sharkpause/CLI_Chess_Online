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
 */

let board = [
 	[10, 8, 9, 11, 12, 9, 8, 10],
 	[7, 7, 7, 7, 7, 7, 7, 7],
 	['', '', '', '', '', '', '', ''],
 	['', '', '', '', '', '', '', ''],
 	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
	[1, 1, 1, 1, 1, 1, 1, 1],
 	[4, 2, 3, 5, 6, 3, 2, 4]
];

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
		case 6:
			return BLUE + String.fromCharCode(0x265a) + WHITE;
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
		process.stdout.write(8-rank + "\t");
		for(let file = 0; file < board[rank].length; ++file) {
			if((rank + file) % 2 === 0) {
				process.stdout.write(BG_WHITE + ' ' + pieceCharacter(board[rank][file]) + ' ');
			} else {
				process.stdout.write(BG_BLACK + ' ' + pieceCharacter(board[rank][file]) + ' ');
			}
			process.stdout.write(RESET);
		}

		console.log();
	}
	console.log(RESET + "\n\n\t a  b  c  d  e  f  g  h");
}

displayBoard(board);
