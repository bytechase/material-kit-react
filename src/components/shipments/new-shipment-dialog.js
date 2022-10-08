import { useState } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Autocomplete,
  styled,
  TextField,
  Divider,
  Box,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
// Custom Components
import ShippingRateTable from "./shipping-rate-table";
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    label: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { label: "Forrest Gump", year: 1994 },
  { label: "Inception", year: 2010 },
  {
    label: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: "Goodfellas", year: 1990 },
  { label: "The Matrix", year: 1999 },
  { label: "Seven Samurai", year: 1954 },
  {
    label: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { label: "City of God", year: 2002 },
  { label: "Se7en", year: 1995 },
  { label: "The Silence of the Lambs", year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: "Life Is Beautiful", year: 1997 },
  { label: "The Usual Suspects", year: 1995 },
  { label: "Léon: The Professional", year: 1994 },
  { label: "Spirited Away", year: 2001 },
  { label: "Saving Private Ryan", year: 1998 },
  { label: "Once Upon a Time in the West", year: 1968 },
  { label: "American History X", year: 1998 },
  { label: "Interstellar", year: 2014 },
  { label: "Casablanca", year: 1942 },
  { label: "City Lights", year: 1931 },
  { label: "Psycho", year: 1960 },
  { label: "The Green Mile", year: 1999 },
  { label: "The Intouchables", year: 2011 },
  { label: "Modern Times", year: 1936 },
  { label: "Raiders of the Lost Ark", year: 1981 },
  { label: "Rear Window", year: 1954 },
  { label: "The Pianist", year: 2002 },
  { label: "The Departed", year: 2006 },
  { label: "Terminator 2: Judgment Day", year: 1991 },
  { label: "Back to the Future", year: 1985 },
  { label: "Whiplash", year: 2014 },
  { label: "Gladiator", year: 2000 },
  { label: "Memento", year: 2000 },
  { label: "The Prestige", year: 2006 },
  { label: "The Lion King", year: 1994 },
  { label: "Apocalypse Now", year: 1979 },
  { label: "Alien", year: 1979 },
  { label: "Sunset Boulevard", year: 1950 },
  {
    label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { label: "The Great Dictator", year: 1940 },
  { label: "Cinema Paradiso", year: 1988 },
  { label: "The Lives of Others", year: 2006 },
  { label: "Grave of the Fireflies", year: 1988 },
  { label: "Paths of Glory", year: 1957 },
  { label: "Django Unchained", year: 2012 },
  { label: "The Shining", year: 1980 },
  { label: "WALL·E", year: 2008 },
  { label: "American Beauty", year: 1999 },
  { label: "The Dark Knight Rises", year: 2012 },
  { label: "Princess Mononoke", year: 1997 },
  { label: "Aliens", year: 1986 },
  { label: "Oldboy", year: 2003 },
  { label: "Once Upon a Time in America", year: 1984 },
  { label: "Witness for the Prosecution", year: 1957 },
  { label: "Das Boot", year: 1981 },
  { label: "Citizen Kane", year: 1941 },
  { label: "North by Northwest", year: 1959 },
  { label: "Vertigo", year: 1958 },
  {
    label: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { label: "Reservoir Dogs", year: 1992 },
  { label: "Braveheart", year: 1995 },
  { label: "M", year: 1931 },
  { label: "Requiem for a Dream", year: 2000 },
  { label: "Amélie", year: 2001 },
  { label: "A Clockwork Orange", year: 1971 },
  { label: "Like Stars on Earth", year: 2007 },
  { label: "Taxi Driver", year: 1976 },
  { label: "Lawrence of Arabia", year: 1962 },
  { label: "Double Indemnity", year: 1944 },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { label: "Amadeus", year: 1984 },
  { label: "To Kill a Mockingbird", year: 1962 },
  { label: "Toy Story 3", year: 2010 },
  { label: "Logan", year: 2017 },
  { label: "Full Metal Jacket", year: 1987 },
  { label: "Dangal", year: 2016 },
  { label: "The Sting", year: 1973 },
  { label: "2001: A Space Odyssey", year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: "Toy Story", year: 1995 },
  { label: "Bicycle Thieves", year: 1948 },
  { label: "The Kid", year: 1921 },
  { label: "Inglourious Basterds", year: 2009 },
  { label: "Snatch", year: 2000 },
  { label: "3 Idiots", year: 2009 },
  { label: "Monty Python and the Holy Grail", year: 1975 },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewShipmentDialog({ handleClose }) {
  const [age, setAge] = useState("");
  const [rates, setRates] = useState();
  const [selectedRate, setSelectedRate] = useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSave = () => {
    setRates(true);
  };

  const setRate = (rate) => {
    console.log(`Rate: ${rate}`);
    setSelectedRate(rate);
  };

  const handlePurchaseRate = () => {
    console.log("Purchasing Rate");
    handleClose();
  };
  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Create New Shipment
      </BootstrapDialogTitle>
      <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Selecting Users */}
        <Box>
          <Typography>User</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="User" />}
          />
        </Box>
        {/* Package Dimensions */}
        <Box>
          <Typography>Dimensions</Typography>
          <Divider />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box sx={{ flex: 3, display: "flex", gap: 1 }}>
              <TextField id="outlined-basic" label="Length" variant="outlined" />
              <TextField id="outlined-basic" label="Width" variant="outlined" />
              <TextField id="outlined-basic" label="Height" variant="outlined" />
            </Box>
            <FormControl fullWidth sx={{ flex: 1 }}>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age ? age : "in"}
                label="Unit"
                onChange={handleChange}
              >
                <MenuItem value={"cm"}>cm</MenuItem>
                <MenuItem value={"in"}>in</MenuItem>
                <MenuItem value={"mm"}>mm</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* Package Weight */}
        <Box>
          <Typography>Package Weight</Typography>
          <Divider />
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField id="outlined-basic" label="Weight" variant="outlined" />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age ? age : "lb"}
                label="Unit"
                onChange={handleChange}
              >
                <MenuItem value={"g"}>g</MenuItem>
                <MenuItem value={"kg"}>kg</MenuItem>
                <MenuItem value={"oz"}>oz</MenuItem>
                <MenuItem value={"lb"}>lb</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {rates && (
          <ShippingRateTable rates={top100Films} setRate={setRate} selectedRate={selectedRate} />
        )}
      </DialogContent>
      <DialogActions>
        {rates ? (
          <Button autoFocus onClick={handlePurchaseRate} variant="contained">
            Purchase
          </Button>
        ) : (
          <Button autoFocus onClick={handleSave} variant="contained">
            Save
          </Button>
        )}
      </DialogActions>
    </BootstrapDialog>
  );
}
