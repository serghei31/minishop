import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

interface Props {
  onSort: (filter: string) => void;
  onColorChange: (color: string) => void;
  onPriceChange: (price: number[]) => void;
}

const Filters = ({ onSort, onColorChange, onPriceChange }: Props) => {
  const [SortBy, setSortBy] = React.useState('');
  const [ColorBy, setColorBy] = React.useState('');
  const [price, setPrice] = React.useState<number[]>([40, 300]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSort = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
    onSort(event.target.value as string);
  };

  const handleColor = (event: SelectChangeEvent) => {
    setColorBy(event.target.value as string);
    onColorChange(event.target.value as string);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
    onPriceChange(newValue as number[]);
  };

  return (
    <Stack
      direction={{ sm: 'row' }}
      justifyContent={{ xs: 'center', md: 'flex-end' }}
      spacing={2}
    >
      <FormControl sx={{ minWidth: { sm: '200px', md: '250px' } }}>
        <InputLabel id="sort-by-select-label">Sort by:</InputLabel>
        <Select
          labelId="sort-by-select-label"
          id="sort-by-select"
          value={SortBy}
          label="Sort by:"
          onChange={handleSort}
        >
          <MenuItem value={'highest'}>Highest to lowest</MenuItem>
          <MenuItem value={'lowest'}>Lowest to highest</MenuItem>
        </Select>
      </FormControl>
      {open && (
        <>
          <FormControl sx={{ minWidth: { sm: '120px', md: '180px' } }}>
            <InputLabel id="color-select-label">Color:</InputLabel>
            <Select
              labelId="color-select-label"
              id="color-select"
              value={ColorBy}
              label="Color"
              onChange={handleColor}
            >
              <MenuItem value={'white'}>White</MenuItem>
              <MenuItem value={'black'}>Black</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ minWidth: { sm: '180px', md: '300px' } }}>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              step={10}
              max={500}
            />
          </Box>
        </>
      )}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {open ? <CloseIcon /> : 'Filters'}
      </Button>
    </Stack>
  );
};

export default Filters;
