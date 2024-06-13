import { FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import generateMoves from './generateMoves.js';
import isEnemyPiece from './isEnemyPiece.js';

export default function checkFilter(moves, board, enemyColor) {
	const allMoves = {};
	for(let i = 0; i < board.length; ++i) {
		for(let j = 0; j < board[i].length; ++j) {
			if(board[i][j] !== 0 && isEnemyPiece(board[i][j], enemyColor)) {
				const generatedMoves = generateMoves(FILE_COORDINATES[j]+RANK_COORDINATES[i], board, true);

				for(let i = 0; i < generatedMoves.length; ++i) {
					allMoves[generatedMoves[i]] = generatedMoves[i];
				}
			}
		}
	}

	const result = [];

	for(let i = 0; i < moves.length; ++i) {
		if(!allMoves[moves[i]]) result.push(moves[i]);
	}

	return result;
}
