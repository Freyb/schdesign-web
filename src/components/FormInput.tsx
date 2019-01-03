import React from 'react';
import { Box } from 'rebass';

export type Props = {
  text: string;
  id: string;
  [propName: string]: any; // TODO: Extend type of `Box`
};

const FormInput = ({ text, id, ...props }: Props) => (
  <>
    <Box
      as="label"
      htmlFor={id}
      css="
        display: block;
        width: 100px;
        font-weight: bold;
        font-size: 1em;
      "
    >
      {text}
    </Box>
    <Box
      as="input"
      id={id}
      css="
        flex: 1;
      "
      mt={[1, 0]}
      mb={[3, 0]}
      {...props}
    />
  </>
);

export default FormInput;
