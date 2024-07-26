// material ui components and dependencies
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

// data
import Categories from "../data/categories";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ChipTextFieldComponent({dispatch,data}) {
  const theme = useTheme();
  
  const handleCategoryChange = (e) => {
    const {
      target: { value },
    } = e;
    dispatch({
      type: "categories",
      payload: { categories: typeof value === "string" ? value.split(",") : value },
    });
  };
  return (
    <Grid item xs={12}>
      <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
      <Select
        sx={{ width: "100%", maxWidth: "100%" }}
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={data.categories}
        onChange={handleCategoryChange}
        input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {Categories.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, data.categories, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
}

export default ChipTextFieldComponent;
