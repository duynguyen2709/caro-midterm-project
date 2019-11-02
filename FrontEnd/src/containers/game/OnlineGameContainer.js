import {withRouter} from 'react-router-dom'
import React from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";
import {initBoard, onClickSquare, resetBoard, setCurrentSelected} from '../../actions/RootActions';
import OnlineGame from '../../components/views/OnlineGame';
import FindingPlayer from "../../components/views/FindingPlayer";
import {joinNewGame, leaveRoom} from "../../actions/OnlineGameActions";

class OnlineGameContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            findingPlayer: true,
        };

        this.socket = io(process.env.REACT_APP_BACKEND_URL);

        this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
    }

    componentDidMount() {
        this.socket.emit('findPlayer', this.props.user);

        this.socket.on('newGame', (room) => {
            this.props.joinNewGame(room);

            this.setState({
                findingPlayer: false
            })
        });

        this.socket.on('kickRoom', () => {
            this.handleLeaveRoom();
        })
    }

    componentWillUnmount() {
        this.socket.close();
    }

    handleLeaveRoom() {
        this.socket.emit('leaveRoom', this.props.roomID);

        this.props.history.push('/');
        this.props.leaveRoom();
    }

    render() {

        const {findingPlayer} = this.state;

        if (findingPlayer)
            return <FindingPlayer/>;

        return <OnlineGame {...this.props}
                           leaveRoom={this.handleLeaveRoom} />;

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

        user: state.api.user,

        // online
        isMyTurn: state.online.isMyTurn,
        roomID: state.online.roomID,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initBoard: () => dispatch(initBoard()),
        resetBoard: () => dispatch(resetBoard()),
        setCurrentSelected: (val) => dispatch(setCurrentSelected(val)),
        onClickSquare: (i, j) => dispatch(onClickSquare(i, j)),

        joinNewGame: (room) => dispatch(joinNewGame(room)),
        leaveRoom: () => dispatch(leaveRoom()),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnlineGameContainer));