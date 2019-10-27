import {connect} from 'react-redux';
import {onClickSquare, resetTable, setCurrentSelected} from '../../actions/RootActions';
import MoveHistoryTable from '../../components/game/MoveHistoryTable';

function mapStateToProps(state) {
    return {
        data: state.root.historyMoves,
        currentSelected: state.root.currentSelected,
        win: state.root.win,
        squares: state.root.squares,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
        resetTable: (record) => dispatch(resetTable(record)),
        onClickSquare: (i, j) => dispatch(onClickSquare(i, j)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveHistoryTable);