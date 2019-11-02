import {withRouter} from 'react-router-dom'
import React from 'react';
import {connect} from 'react-redux';
import io from "socket.io-client";
import OnlineGame from '../../components/views/OnlineGame';
import FindingPlayer from "../../components/views/FindingPlayer";
import {joinNewGame, leaveRoom, onNewTurnPlayed} from "../../actions/OnlineGameActions";
import {ModalOutRoom} from "../../components/utils/Modals";

class OnlineGameContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            findingPlayer: true,
        };

        this.socket = io(process.env.REACT_APP_BACKEND_URL);

        this.handleLeaveRoom = this.handleLeaveRoom.bind(this);
        this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            this.socket.emit('findPlayer', this.props.user);
        } else {
            this.props.history.push('/');
            return;
        }

        this.socket.on('newGame', (room) => {
            this.props.joinNewGame(room);

            this.setState({
                findingPlayer: false
            })
        });

        this.socket.on('kickRoom', () => {
            ModalOutRoom(this.handleLeaveRoom);
        });

        this.socket.on('newTurn', (data) => this.props.onNewTurnPlayed(data));
    }

    componentWillUnmount() {
        this.socket.close();
    }

    handleLeaveRoom() {
        this.socket.emit('leaveRoom', this.props.roomID);

        this.props.history.push('/');
        this.props.leaveRoom();
    }

    handleOnClickSquare(i, j) {
        this.socket.emit('playTurn', {
            roomID: this.props.roomID,
            isPlayer1: this.props.isPlayer1,
            i,
            j,
        })
    }

    render() {

        const {findingPlayer} = this.state;

        if (findingPlayer)
            return <FindingPlayer/>;

        return <OnlineGame {...this.props}
                           onClickSquare={this.handleOnClickSquare}
                           leaveRoom={this.handleLeaveRoom}/>;

    }
}

function mapStateToProps(state) {
    return {
        user: state.api.user,

        // online
        isMyTurn: state.online.isMyTurn,
        roomID: state.online.roomID,
        isPlayer1: state.online.isPlayer1,
        squares: state.online.squares,
        totalChecked: state.online.totalChecked,
        win: state.online.win,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // online
        joinNewGame: (room) => dispatch(joinNewGame(room)),
        leaveRoom: () => dispatch(leaveRoom()),
        onNewTurnPlayed: (data) => dispatch(onNewTurnPlayed(data))
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnlineGameContainer));