import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sumArray} from '../reducers/reducers';

import * as actionCreators from '../actions/actionCreators';

import '../index.css';

const Scoreboard = (props) => {
	const { score, total, actions } = props;
	return (
		<div className="scoreboard">
			<div className="score-column">
				<div className="scoreboard-section" onClick={() => actions.upper(1)}>
					<div className="title">ONES</div>
					<div className="score">{score.UPPER[1]}</div>
				</div>
				<div className="scoreboard-section" onClick={() => actions.upper(2)}>
					<div className="title">TWOS</div>
					<div className="score">{score.UPPER[2]}</div>
				</div>
				<div className="scoreboard-section" onClick={() => actions.upper(3)}>
					<div className="title">THREES</div>
					<div className="score">{score.UPPER[3]}</div>
				</div>
				<div className="scoreboard-section" onClick={() => actions.upper(4)}>
					<div className="title">FOURS</div>
					<div className="score">{score.UPPER[4]}</div>
				</div>
				<div className="scoreboard-section" onClick={() => actions.upper(5)}>
					<div className="title">FIVES</div>
					<div className="score">{score.UPPER[5]}</div>
				</div>
				<div className="scoreboard-section" onClick={() => actions.upper(6)}>
					<div className="title">SIXES</div>
					<div className="score">{score.UPPER[6]}</div>
				</div>
				<div className="scoreboard-section no-click" >
					<div className="title">UPPER TOTAL</div>
					<div className="score">{sumArray(score.UPPER.slice(1))}</div>
				</div>
				<div className="scoreboard-section no-click">
					<div className="title">UPPER BONUS</div>
					<div className="score">{score.UPPER[0] || '-'}</div>
				</div>
				<div className="scoreboard-section no-click">
					<div className="title">UPPER SCORE</div>
					<div className="score">{sumArray(score.UPPER)}</div>
				</div>
			</div>
			<div className="score-column">
				<div className="scoreboard-section" onClick={actions.threeKind}>
					<div className="title">3 of a Kind</div>
					<div className="score">{score.THREE_KIND}</div>
				</div>
				<div className="scoreboard-section" onClick={actions.fourKind}>
					<div className="title">4 of a Kind</div>
					<div className="score">{score.FOUR_KIND}</div>
				</div>
				<div className="scoreboard-section" onClick={actions.fullHouse}>
					<div className="title">Full House</div>
					<div className="score">{score.FULL_HOUSE}</div>
				</div>
				<div className="scoreboard-section" onClick={actions.smallStraight}>
					<div className="title">Small Straight</div>
					<div className="score">{score.SMALL_STRAIGHT}</div>
				</div>
				<div className="scoreboard-section" onClick={actions.largeStraight}>
					<div className="title">Large Straight</div>
					<div className="score">{score.LARGE_STRAIGHT}</div>
				</div>
				<div className="scoreboard-section" onClick={actions.yahtzee}>
					<div className="title">YAHTZEE</div>
					<div className="score">{score.YAHTZEE}</div>
				</div>
				<div className="scoreboard-section" onClick={actions.chance}>
					<div className="title">Chance</div>
					<div className="score">{score.CHANCE}</div>
				</div>
				<div className="scoreboard-section no-click">
					<div className="title">YAHTZEE BONUS</div>
					<div className="score">{score.YAHTZEE_BONUS || '-'}</div>
				</div>
				<div className="scoreboard-section no-click bold">
					<div className="title">TOTAL</div>
					<div className="score">{total}</div>
				</div>
			</div>
		</div>


	);
}

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  score: state.score,
  total: state.total,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

/**
 * Connect the component to the Redux Store.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);


//export default Scoreboard;