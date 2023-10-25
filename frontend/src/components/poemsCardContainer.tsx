import React from "react";
import PoemCard from "./poemCard";
import { Grid } from "@mui/material";
import { Poem } from "@/utils/poem.type";
import PoemsNotFound from "./poemsNotFound";

interface Props {
  poems: Poem[][];
}

const PoemsCardContainer: React.FC<Props> = ({ poems }) => {
  console.log(poems);
  return (
    <Grid container spacing={2} marginLeft={5} paddingRight={8}>
      {poems.length > 0 ? (
        poems.map((poem, index) => (
          <Grid item xs={6} key={index}>
            <PoemCard content={poem} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <PoemsNotFound />
        </Grid>
      )}
    </Grid>
  );
};

export default PoemsCardContainer;
