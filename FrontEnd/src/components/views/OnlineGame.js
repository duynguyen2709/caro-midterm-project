import React from 'react';
import '../../index.css';
import {isBoardFull} from '../../utils/GameCheckUtil';
import Board from '../game/Board';
import OnlineGameButtons from "../game/OnlineGameButtons";
import TabsWrapper from "../game/TabsWrapper";
import OnlineGameHeader from "../forms/OnlineGameHeader";
import {BASE_COL, BASE_ROW} from "../../utils/Constants";
import {ModalGameEnded} from "../utils/Modals";

class OnlineGame extends React.Component {

    constructor(props) {
        super(props);

        this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
        this.getStatus = this.getStatus.bind(this);
    }

    getStatus() {
        const turn = this.props.isMyTurn ? 'Lượt của bạn' : 'Lượt của đối thủ';

        let text = <p className="game-info">{turn}</p>;

        if (this.props.win) {
            if (this.props.winPlayer === this.props.mySymbol) {
                text = <p className="game-info" style={{color: 'red'}}>Bạn Đã Thắng</p>;
            } else {
                text = <p className="game-info" style={{color: 'red'}}>Bạn Đã Thua</p>;

            }
        } else if (isBoardFull(this.props.totalChecked)) {
            text = <p className="game-info">Hoà !</p>;
        }
        return text;
    }

    handleOnClickSquare(i, j) {

        if (this.props.win || isBoardFull(this.props.totalChecked)) {
            ModalGameEnded();
            return;
        }

        if (this.props.squares[i][j] != null || !this.props.isMyTurn) {
            return;
        }

        this.props.onClickSquare(i, j);
    }

    render() {
        return (
            <div className="container">

                <OnlineGameHeader leaveRoom={this.props.leaveRoom}
                                  roomID={this.props.roomID}
                                  otherPlayerName="123"
                />

                <div className="game">
                    <div className="game-board">
                        <Board row={BASE_ROW}
                               column={BASE_COL}
                               squares={this.props.squares}
                               handleOnClickSquare={this.handleOnClickSquare}/>
                    </div>

                    <div className="game-info-section">
                        {this.getStatus()}

                        <OnlineGameButtons onUndoClick={this.props.handleOnRequestUndo}
                                           onDrawClick={this.props.handleOnRequestDraw}
                                           onSurrenderClick={this.props.handleOnRequestSurrender}
                        />

                        <TabsWrapper sendMessage={this.props.sendMessage}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default OnlineGame;