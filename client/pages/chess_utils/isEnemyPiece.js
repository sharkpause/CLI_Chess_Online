export default function isEnemyPiece(square, enemyColor) { // 0: White, 1: Black
	if(enemyColor === 1) {
		if(square > 8) {
			return true;
		}
	} else if(enemyColor === 0) {
		if(square < 9 && square > 0) {
			return true;
		}
	}
	return false;
}
