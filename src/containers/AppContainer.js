import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import App from '../components/App';

function mapStateToProps(state) {
	return {
		...state,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

//Adds all the data from state and action creators to Main component's PROPS
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;