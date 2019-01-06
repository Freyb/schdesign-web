import React from 'react';
import { Box } from 'rebass';

type Props = {
  value: string;
  onChange: (s: string) => void;
  [propName: string]: any; // TODO: Extend type of `Box`
};

const CustomTextArea = ({ value, onChange, ...props }: Props) => (
  <Box
    as="textarea"
    value={value}
    onChange={onChange}
    css="
      width: 100%;
      height: 5.5rem;
      border: solid 2px #f8485e;
      border-radius: 5px;
      color: #f8485e;
      font: inherit;
      font-size: 1rem;
      font-weight: bold;
      resize: none;
      outline: none;
    "
  />
);

export default CustomTextArea;
