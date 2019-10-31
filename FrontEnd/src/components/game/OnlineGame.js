import {Button} from "antd";
import React from 'react';
import '../../index.css';
import {isBoardFull, resetColor} from '../../utils/GameCheckUtil';
import Board from './Board';
import OnlineGameButtons from "./OnlineGameButtons";
import TabsWrapper from "./TabsWrapper";

class OnlineGame extends React.Component {

    constructor(props) {
        super(props);

        this.handleClickRestartButton = this.handleClickRestartButton.bind(this);
        this.handleOnClickSquare = this.handleOnClickSquare.bind(this);
        this.getStatus = this.getStatus.bind(this);
        this.goBack = this.goBack.bind(this);

        props.initBoard();
    }

    getStatus() {
        const currentSymbol = this.props.isXNext ? 'O' : 'X';
        const nextSymbol = this.props.isXNext ? 'X' : 'O';

        let text = <p className="game-info">Lượt tiếp theo : {nextSymbol}</p>;

        if (this.props.win) {
            text = <p className="game-info" style={{color: 'red'}}>Người thắng: {currentSymbol}</p>;
        } else if (isBoardFull(this.props.totalChecked)) {
            text = <p className="game-info">Hoà !</p>;
        }
        return text;
    }

    goBack() {
        this.props.history.goBack();
    }

    handleClickRestartButton() {
        this.props.resetBoard();

        resetColor();
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
                        onClick={this.goBack}>
                    Trang Chủ
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