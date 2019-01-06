import React from 'react';
import Img from 'gatsby-image';
import { Box } from 'rebass';
import CustomDate from './CustomDate';

type Props = {
  date: Date;
  setDate: (date: any) => void;
  desc: string;
  setDesc: (e: any) => void;
  deleteCb: () => void;
  [propName: string]: any; // TODO: Extend type of `Box`
};

const FormListItem = ({
  date,
  setDate,
  desc,
  setDesc,
  deleteCb,
  ...props
}: Props) => (
  <Box
    as="li"
    css="display: flex; align-items: center; border: solid 1px black; margin-bottom: 0.5rem;"
  >
    <Box as={Img} {...props} flex="0 1 80px" m={1} />
    <CustomDate date={date} setDate={setDate} />
    <Box as="textarea" value={desc} onChange={setDesc} />
    <input type="button" value="delete" onClick={deleteCb} />
  </Box>
);

export default FormListItem;
