import {ActionConstant} from '../utils/Constants';

function setCurrentSelected(value) {
  return {
    type: ActionConstant.SET_CURRENT_SELECTED,
    value
  }
}

function initBoard() {
  return {
    type: ActionConstant.INIT_BOARD
  }
}

function resetBoard() {
  return {
    type: ActionConstant.RESET_BOARD
  }
}

function resetTable(record) {
  return {
    type: ActionConstant.RESET_TABLE,
    index: record.id - 1,
    i: record.row - 1,
    j: record.column - 1
  }
}

function onClickSquare(i, j) {
  return {
    type: ActionConstant.ON_CLICK_SQUARE,
    payload : {
      i, j
    }
  }
}

export {initBoard, resetBoard, resetTable, onClickSquare, setCurrentSelected}