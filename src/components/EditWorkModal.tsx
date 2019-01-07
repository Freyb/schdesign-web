import React from 'react';
import { Heading, Text } from 'rebass';
import Container from './Container';

import 'react-datepicker/dist/react-datepicker.css';

import WorkDetails from './WorkDetails';

type Work = {
  id: number;
  type: number;
  deadline: Date;
  description: string;
};

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
  node: Work;
  okButtonCb: (type: number, date: Date, desc: string) => void;
};

const EditWorkModal = ({ images, node, okButtonCb }: Props) => (
  <Container as={Text} textAlign="left">
    <Heading id="order" textAlign="center" mb={4}>
      {`${images[node.type].label}`} szerkesztése
    </Heading>

    <WorkDetails
      images={images}
      type={node.type}
      okButtonCb={okButtonCb}
      startingValues={{
        deadline: node.deadline,
        description: node.description,
      }}
    />
  </Container>
);

export default EditWorkModal;
