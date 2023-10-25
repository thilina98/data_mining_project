import React from "react";
import { Box, Typography } from "@mui/material";

const PoemsNotFound = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h3" component="h1" gutterBottom>
        Poems Not Found
      </Typography>
      <Typography variant="body1" component="p">
        Sorry, we couldn't find any poems.
      </Typography>
    </Box>
  );
};

export default PoemsNotFound;
