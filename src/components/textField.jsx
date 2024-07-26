import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function TextFieldComponent({ label, value, dispatch, type = "text", placeholder = "" }) {
  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        multiline={placeholder.length !== 0}
        rows={placeholder.length !== 0 ? 5 : 1}
        placeholder={placeholder}
        id={label}
        label={label}
        variant="outlined"
        type={type}
        value={value}
        onChange={(e) => {
          dispatch({
            type: label,
            payload: { [label]: e.target.value }, // ensure the correct key-value structure
          });
        }}
      />
    </Grid>
  );
}

export default TextFieldComponent;
