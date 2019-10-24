import { ActionConstant, NO_OF_COL, NO_OF_ROW } from '../utils/Constants';
import { checkWinCondition, resetColor } from '../utils/GameCheckUtil';

const initialState = {
  baseRow: [],
  baseColumn: [],

  squares: Array(NO_OF_ROW).fill(Array(NO_OF_COL).fill(null)),
  isXNext: true,
  totalChecked: 0,
  win: false,
  historyMoves: [],
  historySquares: [],
  currentSelected: -1,
  currentTurn: 0
};

function initBoard(state) {

  let baseRow = [];
  let baseColumn = [];

  for (let i = 0; i < NO_OF_ROW; i++) {
    baseColumn = baseColumn.concat(i);
    baseRow = baseRow.concat(i);
  }

  return {
    ...state,
    baseRow,
    baseColumn,

    squares: Array(NO_OF_ROW).fill(Array(NO_OF_COL).fill(null)),
    isXNext: true,
    totalChecked: 0,
    win: false,
    historyMoves: [],
    historySquares: [],
    currentSelected: -1,
    currentTurn: 0
  };
}

function onClickSquare(state, payload) {
  const copyState = {...state};

  if (copyState.currentTurn < copyState.historySquares.length) {
    copyState.historySquares = copyState.historySquares.slice(0, copyState.currentTurn);
    copyState.historyMoves = copyState.historyMoves.slice(0, copyState.currentTurn);
  }

  const currentSymbol = copyState.isXNext ? 'X' : 'O';

  const elementClicked = {
    id: copyState.totalChecked + 1,
    symbol: currentSymbol,
    row: payload.i + 1,
    column: payload.j + 1
  };

  copyState.historyMoves.push(elementClicked);

  const newArray = copyState.squares.map(arr => arr.slice());
  newArray[payload.i][payload.j] = currentSymbol;

  copyState.historySquares.push(newArray);

  const checkWin = checkWinCondition(newArray, payload.i, payload.j);

  if (checkWin != null) {
    copyState.win = true;
  }

  return {
    ...copyState,
    squares: newArray,
    isXNext: !copyState.isXNext,
    totalChecked: copyState.totalChecked + 1,
    historyMoves: copyState.historyMoves,
    historySquares: copyState.historySquares,
    currentSelected: copyState.totalChecked,
    currentTurn: copyState.currentTurn + 1
  };
}

export default function rootReducer(state = initialState, action){

  switch (action.type) {
    case ActionConstant.INIT_BOARD:
      return initBoard(initialState);

    case ActionConstant.SET_CURRENT_SELECTED:
      return {
        ...state,
        currentSelected: action.value
      };

    case ActionConstant.RESET_BOARD:
      return {
        ...state,
        squares: Array(NO_OF_ROW).fill(Array(NO_OF_COL).fill(null)),
        isXNext: true,
        totalChecked: 0,
        win: false,
        historyMoves: [],
        historySquares: [],
        currentSelected: -1,
        currentTurn: 0
      };

    case ActionConstant.RESET_TABLE:
      resetColor();

      return {
        ...state,
        squares: state.historySquares[action.index],
        isXNext: action.index % 2 === 1,
        currentTurn: action.index + 1,
        currentSelected: action.index,
        totalChecked: action.index + 1,
        win: false
      };

    case ActionConstant.ON_CLICK_SQUARE:
      return onClickSquare(state, action.payload);

     default :
       return state;
   }
}