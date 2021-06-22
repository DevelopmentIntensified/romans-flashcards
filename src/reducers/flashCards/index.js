import { createSlice } from '@reduxjs/toolkit'
import initialStates from "../../static/initialStates"

const setChaptersR = (state,action) => {
  state.chapters = action.payload
  state.range = false
}
const clearChaptersR = (state,action) => {
  state.chapters.splice(0,state.chapters.length)
}
const toggleRangeR = (state,action) => {
  state.range = !state.range
}
const setStartChapterR = (state,action) => {
  if(state.rangeVal.startingChapter === ""&&state.rangeVal.endingChapter === ""){
    state.rangeVal.endingChapter = action.payload
  }
  state.rangeVal.startingChapter = action.payload
  state.range = true
}
const setEndChapterR = (state,action) => {
  if(state.rangeVal.startingChapter === ""&&state.rangeVal.endingChapter === ""){
    state.rangeVal.startingChapter === action.payload
  }
  state.rangeVal.endingChapter = action.payload
  state.range = true
}
const setStartVerseR = (state,action) => {
  state.rangeVal.startingVerse = action.payload
  state.range = true
}
const setEndVerseR = (state,action) => {
  state.rangeVal.endingVerse = action.payload
  state.range = true
  console.log(state.rangeVal,action)
}
const toggleByYourselfR = (state,action) => {
  state.byYourself = !state.byYourself
}
const toggleRandomR = (state,action) => {
  if(!state.random){
    state.type = 1
  } else {
    state.type = 0
  }
  state.random = !state.random
}
const toggleJustMemoryR = (state,action) => {
  state.justMemory = !state.justMemory
}
const toggleReferenceToVerseR = (state,action) => {
  state.referenceToVerse = !state.referenceToVerse
}

const flashCardsReducer = createSlice({
  name:"flashCards",
  initialState:initialStates.flashCards,
  reducers:{
    setChapters:setChaptersR,
    clearChapters:clearChaptersR,
    toggleRange:toggleRangeR,
    setStartChapter:setStartChapterR,
    setEndChapter:setEndChapterR,
    setStartVerse:setStartVerseR,
    setEndVerse:setEndVerseR,
    toggleRandom:toggleRandomR,
    toggleByYourself:toggleByYourselfR,
    toggleJustMemory:toggleJustMemoryR,
    toggleReferenceToVerse:toggleReferenceToVerseR
  }
});

export const {
  setChapters,
  clearChapters,
  toggleByYourself,
  toggleRange,
  setStartChapter,
  setEndChapter,
  setStartVerse,
  setEndVerse,
  toggleRandom,
  toggleJustMemory,
  toggleReferenceToVerse
} = flashCardsReducer.actions;
export default flashCardsReducer.reducer;