const SET_REVEALED = "SET_REVEALED";
const SET_FLAG = "SET_FLAG";
const REMOVE_FLAG = "REMOVE_FLAG";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_REVEALED:
      return {
        ...state,
        isRevealed: true
      };
    case SET_FLAG:
      return {
        ...state,
        isFlagged: true
      };
    case REMOVE_FLAG:
      return {
        ...state
        // isFlagged: false
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export { SET_REVEALED, SET_FLAG, REMOVE_FLAG };
