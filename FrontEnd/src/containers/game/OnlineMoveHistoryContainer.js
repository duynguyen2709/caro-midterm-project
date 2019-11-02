import {connect} from 'react-redux';
import OnlineMoveHistoryTable from "../../components/game/OnlineMoveHistoryTable";

function mapStateToProps(state) {
    return {
        data: state.online.historyMoves,
        totalChecked: state.online.totalChecked,
        mySymbol: state.online.mySymbol,
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineMoveHistoryTable);