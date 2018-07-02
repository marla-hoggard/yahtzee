import * as types from './actionTypes';

export function newGame() {
	return {
		type: types.NEW_GAME,
	}
}
export function toggleDieSelect(i) {
	return {
		type: types.TOGGLE_DIE_SELECT,
		i, //index from 0-4
	}
}
export function rollDice() {
	return {
		type: types.ROLL_DICE,
	}
}

//Scoring options
export function upper(num) {
	return {
		type: types.UPPER,
		num,
	}
}
export function threeKind() {
	return {
		type: types.THREE_KIND,
	}
}

export function fourKind() {
	return {
		type: types.FOUR_KIND,
	}
}

export function yahtzee() {
	return {
		type: types.YAHTZEE,
	}
}

export function smallStraight() {
	return {
		type: types.SMALL_STRAIGHT,
	}
}

export function largeStraight() {
	return {
		type: types.LARGE_STRAIGHT,
	}
}

export function fullHouse() {
	return {
		type: types.FULL_HOUSE,
	}
}

export function chance() {
	return {
		type: types.CHANCE,
	}
}