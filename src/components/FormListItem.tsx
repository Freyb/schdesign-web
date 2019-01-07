import React from 'react';
import Img from 'gatsby-image';
import { Box, Text } from 'rebass';
import { Edit, Ban } from 'styled-icons/fa-solid';
import IconLink from './IconLink';

type Props = {
  date: Date;
  setDate: (date: any) => void;
  desc: string;
  setDesc: (e: any) => void;
  editCb: () => void;
  deleteCb: () => void;
  [propName: string]: any; // TODO: Extend type of `Box`
};

export const dateToString = (d: Date) =>
  d
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '.')
    .concat('.');

const FormListItem = ({
  date,
  setDate,
  desc,
  setDesc,
  editCb,
  deleteCb,
  ...props
}: Props) => (
  <Box
    as="li"
    p="1"
    flexDirection={['column', 'row']}
    css="
        display: flex;
        align-items: center;
        border: solid 1px black;
        margin-bottom: 0.5rem;
        @media (max-width: 600px) {
          flex-direction: column;
        }
      "
  >
    <Box
      as={Img}
      {...props}
      m={1}
      css="width: 4rem; min-width: 100px; flex-shrink: 0; margin: auto;"
    />
    <Text m="3">{dateToString(date)}</Text>
    <Text
      css="flex-grow: 1;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        width: 10px;
        @media (max-width: 600px) {
          width: 100%;
        }"
    >
      {desc}
    </Text>
    <Box ml={[null, 3]} mt={[3, 0]} css="font-size: 2rem;">
      <IconLink
        as="button"
        type="button"
        icon={Edit}
        title="Edit"
        onClick={editCb}
      />
      <IconLink
        as="button"
        type="button"
        icon={Ban}
        title="Delete"
        onClick={deleteCb}
      />
    </Box>
  </Box>
);

export default FormListItem;
