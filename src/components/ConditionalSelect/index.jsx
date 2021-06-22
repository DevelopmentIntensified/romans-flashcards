import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const ConditionalSelect = ({
  labelId,
  selectId,
  inputLabelId,
  value,
  onChange,
  disabled,
  MenuProps,
  classes,
  data,
  label,
  condition,
  textModification,
  valueModification
}) => {
return (
  <FormControl className={classes.formControl}>
    <InputLabel id={inputLabelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={selectId}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={MenuProps}
    >
      {condition && data.map((v,i) => {
          return (
            <MenuItem key={valueModification(i)} value={valueModification(i)}>
              <ListItemText primary={textModification(i)} />
            </MenuItem>
          )
      })
    }
    </Select>
  </FormControl>
)}

const ConditionalSelect2 = ({
  labelId,
  selectId,
  inputLabelId,
  value,
  onChange,
  disabled,
  MenuProps,
  classes,
  data,
  label,
  condition,
  condition2,
  textModification,
  valueModification
}) => (
  <FormControl className={classes.formControl}>
    <InputLabel id={inputLabelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={selectId}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={MenuProps}
    >
      {condition && data.map((v,i) => {
        if(condition2(v,i,data)){
          return ( 
            <MenuItem key={valueModification(v,i)} value={valueModification(v,i)}>
              <ListItemText primary={textModification(v,i)} />
            </MenuItem>
          )
        }
      })
    }
    </Select>
  </FormControl>
)

const ConditionalSelectMultiple = ({
  labelId,
  selectId,
  inputLabelId,
  value,
  onChange,
  onClear,
  disabled,
  MenuProps,
  classes,
  data,
  label,
  condition,
  textModification,
  checked,
  renderValue,
  valueModification
}) => (
  <FormControl className={classes.formControl}>
    
    <InputLabel id={inputLabelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      id={selectId}
      value={value}
      onChange={onChange}
      disabled={disabled}
      MenuProps={MenuProps}
      multiple
      input={<Input />}
      renderValue={renderValue}
    >
      {condition && data.map((v,i) => {
        return (
          <MenuItem key={valueModification(v)} value={valueModification(v)}>
              <Checkbox checked={checked(v,i,data)} />
              <ListItemText primary={textModification(v)} />
          </MenuItem>
        )
      })
    }
    </Select>
    <IconButton onClick={onClear} aria-label="delete" className={classes.del}>
      <Icon fontSize="small" >clear</Icon>
    </IconButton>
  </FormControl>
)

export {ConditionalSelectMultiple, ConditionalSelect, ConditionalSelect2}