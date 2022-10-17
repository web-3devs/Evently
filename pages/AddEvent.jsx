import React from "react";
import { Stack, Input } from "@chakra-ui/react";

function AddEvent() {
  return (
    <Stack spacing={3}>
      <Input variant="outline" placeholder="Outline" />
      <Input variant="filled" placeholder="Filled" />
      <Input variant="flushed" placeholder="Flushed" />
      <Input variant="unstyled" placeholder="Unstyled" />
    </Stack>
  );
}

export default AddEvent;
