import season from "../../romans.json"
import {
  setChapters,
  clearChapters,
  toggleRange,
  setStartChapter,
  setEndChapter,
  setStartVerse,
  setEndVerse
} from '../../reducers/flashCards'
import Settings from "./settings"
import { useSelector, useDispatch } from 'react-redux'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },    
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null
};

export default ({classes}) => {
  const chapters = useSelector((state) => state.flashCards.chapters)
  const range = useSelector((state) => state.flashCards.range)
  const rangeVal = useSelector((state) => state.flashCards.rangeVal)
  const dispatch = useDispatch()

  const handleChapterChange = (e) => {
    dispatch(setChapters(e.target.value))
  }
  const handleChapterClear = (e) => {
    dispatch(clearChapters(e.target.value))
  }
  const handleStartChapterRangeChange = (e) => {
    dispatch(setStartChapter(e.target.value))
    dispatch(setStartVerse(1))
  }
  const handleEndChapterRangeChange = (e) => {
    let val = e.target.value
    dispatch(setEndChapter(val))
    console.log(season[val].verses)
    dispatch(setEndVerse(season[val].verses.length))
  }
  const handleEndVerseRangeChange = (e) => {
    dispatch(setEndVerse(e.target.value))
  }
  const handleStartVerseRangeChange = (e) => {
    dispatch(setStartVerse(e.target.value))
  }
  const handleRangeChange = (e) => {
    dispatch(toggleRange(e.target.value))
  }
  
  return (
    <>
      <Settings
        {...{
          handleChapterClear,
          handleChapterChange,
          handleStartChapterRangeChange,
          handleEndChapterRangeChange,
          handleEndVerseRangeChange,
          handleStartVerseRangeChange,
          handleRangeChange,
          classes,
          chapters,
          season:season,
          range,
          rangeVal,
          MenuProps
        }}
      />
    </>
  )
}