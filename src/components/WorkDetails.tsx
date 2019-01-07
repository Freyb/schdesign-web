import Img from 'gatsby-image';
import React, { useState } from 'react';
import { Box, Flex, Text } from 'rebass';

import 'react-datepicker/dist/react-datepicker.css';
import TextLink from './TextLink';

import './NewWorkModal.css';
import CustomDate, { addDays } from './CustomDate';
import CustomTextArea from './CustomTextArea';

type Props = {
  images: {
    aspectRatio: number;
    src: string;
    srcSet: string;
    sizes: string;
    originalImg: string;
    name: string;
    label: string;
  }[];
  type: number;
  okButtonCb: (type: number, date: Date, desc: string) => void;
  startingValues?: {
    deadline: Date;
    description: string;
  };
};

const WorkDetails = ({
  images,
  type,
  okButtonCb,
  startingValues = { deadline: addDays(new Date(), 7), description: '' },
}: Props) => {
  const [date, setDate] = useState(startingValues.deadline);
  const [desc, setDesc] = useState(startingValues.description);

  const handleOk = () => okButtonCb(type, date, desc);

  return (
    <Box as={Flex} mt="2" flexDirection={['column', null, 'row']}>
      <Box
        as={Img}
        fluid={images[type]}
        mr={[null, null, 2]}
        css="width: 40%; min-width: 100px; flex-shrink: 0; margin: auto;"
      />
      <Box
        as={Flex}
        flexDirection="column"
        css="flex-grow: 1; align-items: center;"
      >
        <Text mb="1" css="font-weight: bold;">
          Határidő:
        </Text>

        <CustomDate date={date} setDate={setDate} />

        <Text mt="3" mb="1" css="font-weight: bold;">
          Megjegyzés:
        </Text>

        <CustomTextArea
          value={desc}
          onChange={(e: any) => setDesc(e.target.value)}
        />

        <Box
          alignSelf={[null, null, 'flex-end']}
          mt="1"
          css="flex-grow: 1; display:flex; align-items: flex-end;"
        >
          <TextLink onClick={handleOk}>Ok</TextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default WorkDetails;
