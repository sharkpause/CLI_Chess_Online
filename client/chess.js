const { show, hide } = require("alternate-screen")
const readline = require("readline-sync");

const RESET = "\x1b[0m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const WHITE = "\x1b[37m";
const GREEN = "\x1b[32m";
const BG_BLACK = "\x1b[40m";
const BG_WHITE = "\x1b[47m";
const BG_YELLOW = "\x1b[43m";

const FILE_COORDINATES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const RANK_COORDINATES = [8, 7, 6, 5, 4, 3, 2, 1];

const COORDINATES = {
	'a': 0,
	'b': 1,
	'c': 2,
	'd': 3,
	'e': 4,
	'f': 5,
	'g': 6,
	'h': 7,
	1: 7,
	2: 6,
	3: 5,
	4: 4,
	5: 3,
	6: 2,
	7: 1,
	8: 0
}

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
 	[10, 8, 9, 11, 12, 9, 8, 10]
 	[7, 7, 7, 7, 7, 7, 7, 7],
 	['', '', '', '', '', '', '', ''],
 	['', '', '', '', '', '', '', ''],
 	['', '', '', '', '', '', '', ''],
	['', '', '', '', '', '', '', ''],
 	[4, 2, 3, 5, 6, 3, 2, 4],
	[1, 1, 1, 1, 1, 1, 1, 1],
];

function pieceCharacter(square) {
	switch(square) {
		case 4:
			return String.fromCharCode(0x265c);
		case 10:
			return RED + String.fromCharCode(0x265c) + WHITE;
		case 2:
			return String.fromCharCode(0x265e);
		case 8:
			return RED + String.fromCharCode(0x265e) + WHITE;
		case 3:
			return String.fromCharCode(0x265d);
		case 9:
			return RED + String.fromCharCode(0x265d) + WHITE;
		case 6:
			return String.fromCharCode(0x265a);
		case 12:
			return RED + String.fromCharCode(0x265a) + WHITE;
		case 5:
			return String.fromCharCode(0x265b);
		case 11:
			return RED + String.fromCharCode(0x265b) + WHITE;
		case 1:
			return String.fromCharCode(0x265f);
		case 7:
			return RED + String.fromCharCode(0x265f) + WHITE;
		default: 
			return square;
	}
}

function displayBoard(board) {
	let square, squareCoordinate, isWhite;

	for(let rank = 0; rank < board.length; ++rank) {
		process.stdout.write(8-rank + "\t");
		for(let file = 0; file < board[rank].length; ++file) {
			square = board[rank][file];
			squareCoordinate = fileCoordinates[file] + rankCoordinates[rank];
			isWhite = rank % 2 === file % 2;

			const pieceSquare = pieceCharacter(square);

			if(square !== '') {
				if(square.includes(RED)) {
					if(highlightedSquares.includes(squareCoordinate)) {
						process.stdout.write(BG_YELLOW + ' ' + pieceSquare + WHITE + ' ');
					} else if(isWhite) {
						process.stdout.write(BG_WHITE + ' ' + pieceSquare + WHITE + ' ');
					} else {
						process.stdout.write(BG_BLACK + ' ' + pieceSquare + WHITE + ' ');
					}
				} else {
					if(highlightedSquares.includes(squareCoordinate)) {
						process.stdout.write(BG_YELLOW + ' ' + BLUE + pieceSquare + WHITE + ' ');
					} else if(isWhite) {
						process.stdout.write(BG_WHITE + ' ' + BLUE + pieceSquare + WHITE + ' ');
					} else
						process.stdout.write(BG_BLACK + BLUE + ' ' + pieceSquare + WHITE + ' ');
					}
			} else {
				if(highlightedSquares.includes(squareCoordinate)) {
					process.stdout.write(BG_YELLOW + ' - ');
				} else if(isWhite) {
					process.stdout.write(BG_WHITE + ' - ');
				} else {
					process.stdout.write(BG_BLACK + ' - ');
				}
			}
			process.stdout.write(RESET);
		}

		console.log();
	}
	console.log(RESET + "\n\n\t a  b  c  d  e  f  g  h");
}

displayBoard();
