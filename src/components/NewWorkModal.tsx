import Img from 'gatsby-image';
import React, { useState } from 'react';
import { Box, Heading, Text } from 'rebass';
import DatePicker from 'react-datepicker';
import Container from './Container';
import List from './List';
import Paragraph from './Paragraph';

import 'react-datepicker/dist/react-datepicker.css';

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
  newWorkCb: (renderType: number, date: Date, desc: string) => void;
};

const NewWorkModal = ({ images, newWorkCb }: Props) => (
  <Container as={Text} textAlign="left">
    <Heading id="order" textAlign="center" mb={4}>
      Új Munka
    </Heading>
    <List px={0} css="display: flex; flex-wrap: wrap;">
      {images.map((node: any, index: number) => (
        <Box
          as="li"
          key={node.name}
          flex={['50%', '33%']}
          px={1}
          py={1}
          css="display: flex; align-items: center; border: solid 0px red;"
          onClick={() => newWorkCb(index)}
        >
          <Box as="div" css="width: 100%; border: solid 1px black;">
            <Box as={Img} fluid={node} m={1} />
            <Paragraph>{node.label}</Paragraph>
          </Box>
        </Box>
      ))}
    </List>
    )
  </Container>
);

export default NewWorkModal;
