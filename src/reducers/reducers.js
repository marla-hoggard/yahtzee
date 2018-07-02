import * as actionTypes from '../actions/actionTypes';

const initialState = {
	dice: Array(5).fill(0),
	selected: Array(5).fill(false),
	rollsLeft: 3,
	turnsLeft: 13,
	score: {
		UPPER: Array(7).fill(null), //upper[0] = bonus, upper[1-6] = 1s, 2s ... 6s
		THREE_KIND: null,
		FOUR_KIND: null,
		YAHTZEE: null,
		SMALL_STRAIGHT: null,
		LARGE_STRAIGHT: null,
		FULL_HOUSE: null,
		CHANCE: null,
		YAHTZEE_BONUS: null,
	},
	total: 0,
	firstYahtzee: false, //for checking on yahtzee bonus
} 

function rootReducer(state = initialState, action) {
	switch(action.type) {
		case actionTypes.NEW_GAME:
			const dice = state.dice.map(die => randomDie());
			return {
				...initialState,
				dice,
				rollsLeft: 2,
			}

		case actionTypes.TOGGLE_DIE_SELECT:
			let selected = [...state.selected];
			selected[action.i] = !selected[action.i];
			return {
				...state,
				selected,
			}

		case actionTypes.ROLL_DICE:
			//Fail-safe in case button disabling delay
			if (state.rollsLeft > 0) {
				const dice = state.dice.map((die,i) => {
					return state.selected[i] ? die : randomDie();
				});
				return {
					...state,
					dice,
					rollsLeft: state.rollsLeft - 1,
				}
			}
			else return state;

		case actionTypes.UPPER: 
			if (state.score.UPPER[action.num] !== null) {
				return state;
			}
			else return upperReducer(state,action);
		case actionTypes.THREE_KIND:
		case actionTypes.FOUR_KIND:
		case actionTypes.YAHTZEE:
		case actionTypes.SMALL_STRAIGHT:
		case actionTypes.LARGE_STRAIGHT:
		case actionTypes.FULL_HOUSE:
		case actionTypes.CHANCE:
			if (state.score[action.type] !== null) {
				return state;
			}
			else return lowerReducer(state,action);
		default:
			return state;	
	}
}

//====== SUB-REDUCERS =======//
function upperReducer(state,action) {
	if (action.type !== actionTypes.UPPER) {
		return state;
	}
	const num = action.num;

	let upper = [...state.score.UPPER];
	const toAdd = countInstances(num,state.dice) * num;
	upper[num] = toAdd;
	let score = {...state.score};
	score.UPPER = upper;

	let total = state.total + toAdd;

	//Check for upper bonus
	if (!upper[0]) {
		if (sumArray(upper) >= 63) {
			upper[0] = 35;
			total += 35;
		}
	}

	//Check if it should have been a yahtzee bonus
	if (state.firstYahtzee && checkOfAKind(5,state.dice)) {
		score.YAHTZEE_BONUS += 100;
		total += 100;
	}

	return {
		...state,
		dice: Array(5).fill(0),
		selected: Array(5).fill(false),
		rollsLeft: 3,
		turnsLeft: state.turnsLeft - 1,
		score,
		total,
	}
}

function lowerReducer(state,action) {
	let score = {...state.score};
	let { total, firstYahtzee }= state;
	let toAdd = 0;
	switch(action.type) {
		case actionTypes.THREE_KIND:
			if (checkOfAKind(3,state.dice)) {
				toAdd = sumArray(state.dice);
				score.THREE_KIND = toAdd;
				total += toAdd;
			}
			else {
				score.THREE_KIND = 0;
			}
			break;
		case actionTypes.FOUR_KIND:
			if (checkOfAKind(4,state.dice)) {
				toAdd = sumArray(state.dice);
				score.FOUR_KIND = toAdd;
				total += toAdd;
			}
			else {
				score.FOUR_KIND = 0;
			}
			break;
		case actionTypes.YAHTZEE:
			if (checkOfAKind(5,state.dice)) {
				toAdd = 50;
				score.YAHTZEE = toAdd;
				total += toAdd;
				firstYahtzee = true;
			}
			else {
				score.YAHTZEE = 0;
			}
			break;
		case actionTypes.SMALL_STRAIGHT:
			if (isSmallStraight(state.dice) || (state.firstYahtzee && checkOfAKind(5,state.dice))) {
				toAdd = 30;
				score.SMALL_STRAIGHT = toAdd;
				total += toAdd;
			}
			else {
				score.SMALL_STRAIGHT = 0;
			}
			break;
		case actionTypes.LARGE_STRAIGHT:
			if (isLargeStraight(state.dice) || (state.firstYahtzee && checkOfAKind(5,state.dice))) {
				toAdd = 40;
				score.LARGE_STRAIGHT = toAdd;
				total += toAdd;
			}
			else {
				score.LARGE_STRAIGHT = 0;
			}
			break;
		case actionTypes.FULL_HOUSE:
			if (isFullHouse(state.dice) || (state.firstYahtzee && checkOfAKind(5,state.dice))) {
				toAdd = 25;
				score.FULL_HOUSE = toAdd;
				total += toAdd;
			}
			else {
				score.FULL_HOUSE = 0;
			}
			break;
		case actionTypes.CHANCE:
			toAdd = sumArray(state.dice);
			score.CHANCE = toAdd;
			total += toAdd;
			break;
		default:
			return state;
	}
	switch(action.type) {
		case actionTypes.THREE_KIND:
		case actionTypes.FOUR_KIND:
		case actionTypes.YAHTZEE:
		case actionTypes.SMALL_STRAIGHT:
		case actionTypes.LARGE_STRAIGHT:
		case actionTypes.FULL_HOUSE:
		case actionTypes.CHANCE:
			if (state.firstYahtzee && checkOfAKind(5,state.dice)) {
				score.YAHTZEE_BONUS += 100;
				total += 100;
			}
			return {
				...state,
				dice: Array(5).fill(0),
				selected: Array(5).fill(false),
				rollsLeft: 3,
				turnsLeft: state.turnsLeft - 1,
				score,
				total,
				firstYahtzee,
			}
		default:
			return state;
	}
}


//====== UTILITY FUNCTIONS =====//

//Returns a random integer between 1 and 6 (inclusive)
function randomDie() {
  return Math.floor(Math.random() * 6) + 1;
}

//Returns the number of instances of val in array
//val must be primitive (found via indexOf/includes)
function countInstances(val,array) {
	let count = 0, last = 0;
	let arr = array.slice();
	while (arr.includes(val)) {
		count++;
		last = arr.indexOf(val);
		arr = arr.slice(last + 1);
	}
	return count;
}

//Returns the sum of an array of integers
export function sumArray(array) {
	return array.reduce((prev,cur) => prev + cur,0);
}

//Checks if there are 'num' of any number in dice array (num = 3,4,5)
function checkOfAKind(num,dice) {
	for (var i = 1; i <= 6; i++) {
		if (countInstances(i,dice) >= num) {
			return true;
		}
	}
	return false;
}

function isSmallStraight(dice) {
	//Must include a 3 and a 4
	if (!dice.includes(3) || !dice.includes(4)) {
		return false;
	}
	//1-2-3-4
	if (dice.includes(1) && dice.includes(2)) {
		return true;
	}
	//2-3-4-5
	if (dice.includes(2) && dice.includes(5)) {
		return true;
	}
	//3-4-5-6
	if (dice.includes(5) && dice.includes(6)) {
		return true;
	}
	return false;
}

function isLargeStraight(array) {
	const dice = [...array].sort();
	//1-2-3-4-5
	if (dice[0] === 1) {
		return dice[1] === 2 && dice[2] === 3 && dice[3] === 4 && dice[4] === 5;
	}
	//2-3-4-5-6
	else if (dice[0] === 2) {
		return dice[1] === 3 && dice[2] === 4 && dice[3] === 5 && dice[4] === 6;
	}
	else return false;
}

function isFullHouse(array) {
	const dice = [...array].sort();
	const first = countInstances(dice[0],array);
	const last = countInstances(dice[4],array);
	return (first === 3 && last === 2)  || (first === 2 && last === 3);
}





export default rootReducer;