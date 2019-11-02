import {Button} from "antd";
import React from 'react';
import '../../index.css';
import {isBoardFull} from '../../utils/GameCheckUtil';
import Board from '../game/Board';
import OnlineGameButtons from "../game/OnlineGameButtons";
import TabsWrapper from "../game/TabsWrapper";

class OnlineGame extends React.Component {

    constructor(props) {
        super(props);

        this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
        this.getStatus = this.getStatus.bind(this);

        props.initBoard();
    }

    getStatus() {
        const currentSymbol = this.props.isXNext ? 'O' : 'X';
        const turn = this.props.isMyTurn ? 'Lượt của bạn' : 'Lượt của đối thủ';

        let text = <p className="game-info">{turn}</p>;

        if (this.props.win) {
            text = <p className="game-info" style={{color: 'red'}}>Người thắng: {currentSymbol}</p>;
        } else if (isBoardFull(this.props.totalChecked)) {
            text = <p className="game-info">Hoà !</p>;
        }
        return text;
    }

    handleOnClickSquare(i, j) {
        if (this.props.squares[i][j] != null || this.props.win) {
            return;
        }
        this.props.onClickSquare(i, j);

        setTimeout(() => {
            if (!this.props.win) {
                let randI = Math.floor(Math.random() * 20);
                let randJ = Math.floor(Math.random() * 20);

                while (this.props.squares[randI][randJ] != null) {
                    randI = Math.floor(Math.random() * 20);
                    randJ = Math.floor(Math.random() * 20);
                }
                this.props.onClickSquare(randI, randJ);
            }
        }, 100);

    }

    render() {
        return (
            <div className="container">

                <Button style={{width: 'fit-content', fontWeight: 'bold'}}
                        type="primary"
                        icon="caret-left"
                        onClick={this.props.leaveRoom}>
                    Thoát
                </Button>

                <div className="game">
                    <div className="game-board">
                        <Board row={this.props.BASE_ROW}
                               column={this.props.BASE_COL}
                               squares={this.props.squares}
                               handleOnClickSquare={this.handleOnClickSquare}/>
                    </div>

                    <div className="game-info-section">
                        {this.getStatus()}

                        <OnlineGameButtons/>

                        <TabsWrapper/>
                    </div>
                </div>
            </div>
        );
    }
}

export default OnlineGame;