import React from 'react';
import { Box } from 'rebass';

type Props = {
  type: 'fb' | 'plakat';
  name: string;
  description: string;
  [propName: string]: any; // TODO: Extend type of `Box`
};

const FormListItem = ({ type, name, description, ...props }: Props) => (
  <Box as="li" {...props} css="display: flex;">
    <Box as="div">asd</Box>
    <Box as="div">{name}</Box>
    <Box as="div">{description}</Box>
  </Box>
);

export default FormListItem;
