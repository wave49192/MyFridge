import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Ingredient } from "../../types/inventory";
import { getEmojiByGroupName } from "../../utils/emojitify";

interface Props {
    ingredients: Ingredient[]
    setIngredients: (prev: any) => void
}

const GroupedAutocomplete: React.FC<Props> = ({ ingredients, setIngredients }) => {
  return (
    <Autocomplete
      id="grouped-demo"
      options={ingredients.map(i => ({ ...i, group: getEmojiByGroupName(i.group)})).sort(
        (a, b) => -b.group.localeCompare(a.group)
      )}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Select Ingredients"/>
      )}
      style={{ background: 'white'}}
      onChange={(event: any, newValue: Ingredient | null) => {
        setIngredients((prev: any) => ({...prev, ingredient: newValue?.id, name: newValue?.name}));
      }}
      isOptionEqualToValue={(option, value) => option.group === value.group}
    />
  );
};

export default GroupedAutocomplete;
