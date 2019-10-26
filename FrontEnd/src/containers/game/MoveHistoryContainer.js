import { connect } from 'react-redux';
import { resetTable, setCurrentSelected } from '../../actions/RootActions';
import MoveHistoryTable from '../../components/game/MoveHistoryTable';

function mapStateToProps(state) {
  return {
    data : state.root.historyMoves,
    currentSelected : state.root.currentSelected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
    resetTable: (index) => dispatch(resetTable(index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveHistoryTable);