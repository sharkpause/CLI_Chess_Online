import generateMoves from './generateMoves.js';

export default function checks(kingSquare, board) {
	for(let i = 0; i < board.length; ++i) {
		for(let j = 0; j < board[i].length; ++i) {
			if(board[i][j] !== 0) {
				if(generateMoves(board[i][j], board).indexOf(kingSquare) > -1) return true;
			}
		}
	}

	return false;
}
