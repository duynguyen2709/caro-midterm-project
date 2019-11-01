import {withRouter} from 'react-router-dom'
import React from 'react';
import {connect} from 'react-redux';
import {initBoard, onClickSquare, resetBoard, setCurrentSelected} from '../../actions/RootActions';
import OnlineGame from '../../components/views/OnlineGame';
import FindingPlayer from "../../components/views/FindingPlayer";

class OnlineGameContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            findingPlayer: true,
        }
    }

    render() {
        const {findingPlayer} = this.state;

        if (findingPlayer)
            return <FindingPlayer />

        return <OnlineGame/>
    }
}

function mapStateToProps(state) {
    return {
        BASE_ROW: state.root.baseRow,
        BASE_COL: state.root.baseColumn,

        squares: state.root.squares,
        isXNext: state.root.isXNext,
        totalChecked: state.root.totalChecked,
        win: state.root.win,
        currentSelected: state.root.currentSelected,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initBoard: () => dispatch(initBoard()),
        resetBoard: () => dispatch(resetBoard()),
        setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
        onClickSquare: (i, j) => dispatch(onClickSquare(i, j)),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnlineGameContainer));