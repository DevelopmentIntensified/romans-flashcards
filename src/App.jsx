import { useState, useEffect, useReducer } from 'react';

import season from "./romans.json"
import upperCaseChName from "./utils/upperCaseChName"
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ChapterSelect from "./components/ChapterSelect"
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { useSelector, useDispatch } from 'react-redux'
import {
  toggleByYourself,
  toggleRandom,
  toggleReferenceToVerse
} from './reducers/flashCards'
import useKeydown from "./utils/hooks/useKeydown"
import useVerses from './utils/hooks/useVerses';
import typeQuizzingTypes from './static/typeQuizzingTypes';

const styles = makeStyles((theme)=>({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    minWidth: 180,
    maxWidth: 180,
  },
  del:{
  },
  beginPagePaper:{
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  paper:{
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      padding: theme.spacing(2),
    },
    height:160
  },
  toggle1:{
    textAlign:"center",
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  card:{
    textAlign:"center",
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    fontSize:20
  },
  toggle:{
    marginLeft:theme.spacing(2)
  },
  startBtn:{
    width:"100%",
    height:"100%",
    marginTop: theme.spacing(5)
  },
  verseCont:{
    fontSize:24,
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(3),
    minHeight: 200
  },
  verseData:{
    fontSize:32,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2)
  },
  correctbtn:{
    width:"100%",
    height:"200px"
  },
  incorrectbtn:{
    width:"100%",
    height:"200px"
  },
  skipbtn:{
    width:"100%",
    height:"200px"
  },
  btns:{
    width:"100%",
    position:"fixed",
    bottom:"0px",
    height:"400px"
  },
  show:{
    width:"100%",
    height:"200px"
  }
}));

function Page1({onStart}) {
  const classes = styles();
  const dispatch = useDispatch()
  const random = useSelector((state) => state.flashCards.random)
  const referenceToVerse = useSelector((state) => state.flashCards.referenceToVerse)
  const byYourself = useSelector((state) => state.flashCards.byYourself)
  const chapters = useSelector((state) => state.flashCards.chapters)
  const range = useSelector((state) => state.flashCards.range)
  const rangeVal = useSelector((state) => state.flashCards.rangeVal)

  const [canStart,setCanStart] = useState(false)

  useEffect(()=>{
    if(rangeVal.startingChapter!==""&&rangeVal.endingChapter!==""&&range){
      setCanStart(true);
    } else if(chapters.length!==0&&!range){
      setCanStart(true)
    } else{
      setCanStart(false)
    }
  },[rangeVal,chapters,range,canStart])

  useKeydown((e)=>{
    if(e.keyCode===13&&canStart){
      onStart()
    }
  })

  const handleRandomToggle = (e) => {
    dispatch(toggleRandom(""))
  }
  const handleRefernceToVerseToggle = (e) => {
    dispatch(toggleReferenceToVerse(""))
  }
  const handleByYourselfToggle = (e) => {
    dispatch(toggleByYourself(""))
  }

  return (
    <>
    <Paper className={classes.beginPagePaper}>
    <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
      <ChapterSelect 
        classes = {classes}
      />
      
      <Grid className={classes.toggle1} item xs={12} sm={8}>
          <FormGroup component="fieldset">
            <FormControlLabel
              className={classes.toggle}
              control={<Switch checked={random} onChange={handleRandomToggle} name="prompt" />}
              label="Do you want the verses to be sorted randomly?"
            />
            <FormControlLabel
              className={classes.toggle}
              control={<Switch checked={referenceToVerse} onChange={handleRefernceToVerseToggle} name="firstLetter" />}
              label="Do you want to be quizzed on the reference?"
            />
            <FormControlLabel
              className={classes.toggle}
              control={<Switch checked={byYourself} onChange={handleByYourselfToggle} name="firstLetter" />}
              label="Are you doing the flashcards by yourself?"
            />
          </FormGroup>
        </Grid>
        <Grid className={classes.toggle1} item xs={12} sm={3}>
          <Button
            className={classes.startBtn}
            variant="contained" 
            color="secondary" 
            onClick = {onStart}
            disabled = {!canStart}
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </Paper>
    </>
  )
}

const fcState = {
  correct:0,
  incorrect:0,
  skipped:0,
  done:0,
  currentVerse: 0,
  show:false
}
function fcreducer (state,action){
  console.log(action.payload)
  switch(action.type){
    case "correct":
      return {
        ...state,
        correct:state.correct+1,
        done:state.done+1,
        currentVerse: action.payload.incr
            ? 1 + state.currentVerse
            : state.currentVerse,
        show:false
      }
    break;
    case "incorrect":
      return {
        ...state,
        incorrect:state.correct+1,
        done:state.done+1,
        currentVerse: action.payload.incr
            ? 1 + state.currentVerse
            : state.currentVerse,
        show:false
      }
    break;
    case "skip":
      return {
        ...state,
        skipped:state.skipped+1,
        currentVerse: action.payload.incr
            ? 1 + state.currentVerse
            : state.currentVerse,
        show:false
      }
    break;
    case "show":
      return {
        ...state,
        show:true
      }
    break;
  }
}

function Page2({time, order, referenceForVerse, byYoourself, chapters, range, chapterRange}) {
  const dispatch = useDispatch();
  const classes = styles();
  const [verses, setVerseO] = useVerses("flashCards");
  const [state, dispatch2] = useReducer(fcreducer, fcState);
  const type = useSelector((state) => state.flashCards.type)
  const byYourself = useSelector((state) => state.flashCards.byYourself)
  const referenceToVerse = useSelector((state) => state.flashCards.referenceToVerse)

  const handleCorrect = () => {
    setVerseO(state.currentVerse);
    dispatch2({type:"correct", payload:{
      incr: typeQuizzingTypes[type].type === 'quote'
    }})
  }
  const handleIncorrect = () => {
    setVerseO(state.currentVerse);
    dispatch2({type:"incorrect", payload:{
      incr: typeQuizzingTypes[type].type === 'quote'
    }})
  }
  const handleSkip = () => {
    setVerseO(state.currentVerse);
    dispatch2({type:"skip", payload:{
      incr: typeQuizzingTypes[type].type === 'quote'
    }})
  }
  const handleShow = () => {
    dispatch2({type:"show"})
  }
  useEffect(()=>{
    console.log(state.show || !referenceToVerse || !byYourself)
  },[state,referenceToVerse,byYourself])
  return (
    <Container className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
        <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
          <Grid item xs={12} sm={3}><h3>correct: {state.correct} </h3></Grid>
          <Grid item xs={12} sm={3}><h3>incorrect: {state.incorrect} </h3></Grid>
          <Grid item xs={12} sm={3}><h3>skips: {state.skipped} </h3></Grid>
          <Grid item xs={12} sm={3}><h3>done: {state.done}</h3></Grid>
        </Grid>
        </Toolbar>
      </AppBar>
      <Container className={classes.beginPagePaper} component={Paper}>
        {(state.show || !referenceToVerse || !byYourself) && <Container className={classes.card}><h2>{verses[state.currentVerse] && upperCaseChName(verses[state.currentVerse].ref)}</h2></Container>}
        {(state.show || referenceToVerse || !byYourself) && <Container className={classes.card}><p className = {classes.verse}>{verses[state.currentVerse] && verses[state.currentVerse].verse}</p></Container>}
      </Container>
      <Container className={classes.btns}>
       <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={11}>
        {(byYourself)&&(<Button onClick = {handleShow} variant="contained" className={classes.show}>Show</Button>)}
        </Grid>
        <Grid item xs={12} sm={4}>
            <Button onClick = {handleCorrect} variant="contained" color="secondary" className={classes.correctbtn}>
              Correct
            </Button>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button onClick = {handleSkip} variant="contained" className={classes.skipbtn}>
            Skip
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button onClick = {handleIncorrect} variant="contained" color="primary" className={classes.incorrectbtn}>
            Incorrect
          </Button>
        </Grid>
      </Grid>
      </Container>
    </Container>
  );
}

function App() {
  const [page,setPage] = useState(1)
  const onStart = (e) => {
    setPage(page+1)
  }
  return (
    <Container>
      {(page===1&&<Page1 {...{onStart}}/>)}
      {(page===2&&<Page2 />)}
    </Container>
  );
}

export default App;