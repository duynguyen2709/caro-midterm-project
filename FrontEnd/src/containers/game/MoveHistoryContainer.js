import React from "react";
import { connect } from 'react-redux';
import { resetTable, setCurrentSelected } from '../../actions/RootActions';
import MoveHistoryTable from '../../components/game/MoveHistoryTable';

function MoveHistoryContainer(props) {

  function reset(record){
      if (record.id === props.currentSelected && props.win)
          return;

      props.resetTable(record);
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MoveHistoryTable {...props} resetTable={reset} />
}

function mapStateToProps(state) {
  return {
    data : state.root.historyMoves,
    currentSelected : state.root.currentSelected,
    win: state.root.win,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
    resetTable: (record) => dispatch(resetTable(record))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveHistoryContainer);