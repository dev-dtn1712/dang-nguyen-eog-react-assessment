import React, { ChangeEvent, MouseEvent } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import useStyles from './_styles/dropdown';

interface Options {
  options: Array<string>,
  selectedOptions: Array<string>,
  setSelectedOptions: Function
}

const Dropdown = ({ options, selectedOptions, setSelectedOptions }: Options) => {
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedOptions(event.target.value as string[]);
  };

  const handleDelete = (e: MouseEvent, value: string) => {
    e.preventDefault();
    const newList = selectedOptions.filter(option => option !== value);
    setSelectedOptions(newList);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        labelId="demo-mutiple-chip-checkbox-label"
        id="demo-mutiple-chip-checkbox"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {(selected as string[]).map((value) => (
              <Chip
                key={value}
                label={value}
                clickable
                deleteIcon={(
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                )}
                className={classes.chip}
                onDelete={(e) => handleDelete(e, value)}
              />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
