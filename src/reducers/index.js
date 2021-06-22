import { combineReducers } from 'redux';
import flashCardsReducer from './flashCards/index'

const rootReducer = combineReducers({
  flashCards: flashCardsReducer
});
 
export default rootReducer;