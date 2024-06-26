import generateMovesForChecks from './generateMovesForChecks.js';
import isEnemyPiece from './isEnemyPiece.js';

import { FILE_COORDINATES, RANK_COORDINATES } from './constants.js';

export default function inCheck(kingSquare, board, enemyColor) {
	for(let i = 0; i < board.length; ++i) {
		for(let j = 0; j < board[i].length; ++j) {
			if(board[i][j] !== 0 && isEnemyPiece(board[i][j], enemyColor)) {
				const moves = generateMovesForChecks(FILE_COORDINATES[j]+RANK_COORDINATES[i], board);
				if(typeof moves !== 'undefined' && moves.indexOf(kingSquare) > -1) return true;
			}
		}
	}

	return false;
}
