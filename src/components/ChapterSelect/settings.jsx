import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {ConditionalSelect,ConditionalSelect2,ConditionalSelectMultiple} from "../ConditionalSelect"
import removeFooters from "../../utils/removeFooters"

export default ({
  handleChapterClear,
  handleChapterChange,
  handleStartChapterRangeChange,
  handleEndChapterRangeChange,
  handleEndVerseRangeChange,
  handleStartVerseRangeChange,
  handleRangeChange,
  classes,
  chapters,
  season,
  range,
  rangeVal,
  MenuProps
}) => (
  <>
    <Grid item xs={12} sm={4}>
      <h4>Select the chapters that you would like to study.</h4>
      <ConditionalSelectMultiple
        labelId="demo-mutiple-checkbox-label"
        SelectId="demo-mutiple-checkbox"
        inputLabelId="demo-mutiple-checkbox-label"
        multiple={true}
        value={chapters}
        onChange={handleChapterChange}
        onClear={handleChapterClear}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        label="Select chapters"
        classes={classes}
        condition={!season.loading}
        data={Object.keys(season)}
        checked={(ch)=>(chapters.indexOf(ch) > -1)}
        textModification={(t)=>(t.replace(/([0-9]+)/g," $1"))}
        valueModification={(v)=>(v)}
      />
    </Grid>
    <Grid className={classes.toggle1} item xs={12} sm={2}>
      <Switch
          checked={range}
          onChange={handleRangeChange}
          name="handleRangeChange"
          inputProps={{ 'aria-label': 'range select' }}
        />
    </Grid>
    <Grid item xs={12} sm={4}>
      <h4>Select the range of chapters or verses that you would like to study.</h4>
      <ConditionalSelect2
        labelId="Starting-Chapter-mutiple-checkbox-label"
        SelectId="Starting-Chapter-mutiple-checkbox"
        inputLabelId="Starting-Chapter-mutiple-checkbox-label"
        value={rangeVal.startingChapter}
        onChange={handleStartChapterRangeChange}
        MenuProps={MenuProps}
        label="Starting Chapter"
        classes={classes}
        condition={!season.loading}
        condition2={(v,i,data)=>(i<=data.indexOf(rangeVal.endingChapter)||rangeVal.endingChapter==="")}
        data={Object.keys(season)}
        textModification={(t)=> t.toString().replace(/([0-9]+)/g," $1")}
        valueModification={(v,i)=>v}
      />
      <ConditionalSelect2
        labelId="Starting-Verse-mutiple-checkbox-label"
        SelectId="Starting-Verse-mutiple-checkbox"
        inputLabelId="Starting-Verse-mutiple-checkbox-label"
        value={rangeVal.startingVerse}
        onChange={handleStartVerseRangeChange}
        MenuProps={MenuProps}
        label="Starting Verse"
        classes={classes}
        condition={!season.loading}
        condition2={(v,i,data)=>((rangeVal.startingChapter!==rangeVal.endingChapter || i+1<=rangeVal.endingVerse) &&removeFooters(v)!=="")}
        data={rangeVal.startingChapter === "" ? (season[Object.keys(season)[0]].verses) : (season[rangeVal.startingChapter].verses)}
        textModification={(v,t)=>(Number(t)+1)}
        valueModification={(v,t)=>(Number(t)+1)}
      />
      <ConditionalSelect2
        labelId="Ending-Chapter-mutiple-checkbox-label"
        SelectId="Ending-Chapter-mutiple-checkbox"
        inputLabelId="Ending-Chapter-mutiple-checkbox-label"
        value={rangeVal.endingChapter}
        onChange={handleEndChapterRangeChange}
        MenuProps={MenuProps}
        label="Ending Chapter"
        classes={classes}
        condition={!season.loading}
        condition2={(v,i,data)=>(i>=data.indexOf(rangeVal.startingChapter)||rangeVal.startingChapter==="")}
        data={Object.keys(season)}
        textModification={(t)=> t.toString().replace(/([0-9]+)/g," $1")}
        valueModification={(v,i)=>v}
      />
      <ConditionalSelect2
        labelId="Ending-Verse-mutiple-checkbox-label"
        SelectId="Ending-Verse-mutiple-checkbox"
        inputLabelId="Ending-Verse-mutiple-checkbox-label"
        value={rangeVal.endingVerse}
        onChange={handleEndVerseRangeChange}
        MenuProps={MenuProps}
        label="Ending Verse"
        classes={classes}
        condition={!season.loading}
        condition2={(v,i,data)=>(rangeVal.startingChapter!==rangeVal.endingChapter || i+1>=rangeVal.startingVerse &&removeFooters(v)!=="")}
        disabled={rangeVal.endingChapter === ""}
        data={rangeVal.endingChapter === "" ? (season[Object.keys(season)[0]].verses) : (season[rangeVal.endingChapter].verses)}
        textModification={(v,t)=>(Number(t)+1)}
        valueModification={(v,t)=>(Number(t)+1)}
      />
    </Grid>
    </>
)