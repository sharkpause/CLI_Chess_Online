import { FILE_COORDINATES, RANK_COORDINATES } from './constants.js';
import generateMoves from './generateMoves.js';
import isEnemyPiece from './isEnemyPiece.js';

export default function checkFilter(moves, board, enemyColor) {
	const allMoves = [];
	for(let i = 0; i < board.length; ++i) {
		for(let j = 0; j < board[i].length; ++j) {
			if(board[i][j] !== 0 && isEnemyPiece(FILE_COORDINATES[j] + RANK_COORDINATES[i], enemyColor))
				allMoves.push(generateMoves(FILE_COORDINATES[j]+RANK_COORDINATES[i], board, true))
		}
	}

	console.log(allMoves);

	const result = [];

	for(let i = 0; i < moves.length; ++i) {
		if(allMoves.indexOf(moves[i]) <= -1) {
			result.push(moves[i]);
		}
	}

	return result;
}
