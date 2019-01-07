import Img from 'gatsby-image';
import React, { useState } from 'react';
import { Box, Heading, Text } from 'rebass';
import Container from './Container';
import List from './List';

import 'react-datepicker/dist/react-datepicker.css';
import TextLink from './TextLink';

import WorkDetails from './WorkDetails';

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
  okButtonCb: (renderType: number, date: Date, desc: string) => void;
};

const NewWorkModal = ({ images, okButtonCb }: Props) => {
  const [renderType, setRender] = useState(-1);

  return (
    <Container as={Text} textAlign="left">
      <Heading id="order" textAlign="center" mb={4}>
        Új {`${renderType < 0 ? `Munka` : images[renderType].label}`}
      </Heading>

      {renderType < 0 && (
        <List px={0} css="display: flex; flex-wrap: wrap;">
          {images.map((node: any, index: number) => (
            <Box
              as="li"
              key={node.name}
              flex={['50%', '33%']}
              px={1}
              py={1}
              css="display: flex; align-items: center; border: solid 0px red;"
              onClick={() => setRender(index)}
            >
              <Box
                as="div"
                css="width: 100%; min-width: 110px; border: solid 1px grey; box-shadow: 1px 1px 5px;"
              >
                <Box
                  as={Img}
                  fluid={node}
                  m={2}
                  css="border: solid 1px black;"
                />
                <Text my={2} css="text-align:center;">
                  {node.label}
                </Text>
              </Box>
            </Box>
          ))}
        </List>
      )}
      {renderType >= 0 && (
        <Box as="div">
          <Box as="div">
            <TextLink onClick={() => setRender(-1)}>Vissza</TextLink>
          </Box>
          <WorkDetails
            images={images}
            type={renderType}
            okButtonCb={okButtonCb}
          />
        </Box>
      )}
    </Container>
  );
};

export default NewWorkModal;
