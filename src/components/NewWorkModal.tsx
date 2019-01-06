import Img from 'gatsby-image';
import React, { useState } from 'react';
import { Box, Flex, Heading, Text } from 'rebass';
import Container from './Container';
import List from './List';
import Paragraph from './Paragraph';

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
  newWorkCb: (renderType: number, date: Date, desc: string) => void;
};

const NewWorkModal = ({ images, newWorkCb }: Props) => {
  const [renderType, setRender] = useState(-1);
  const [date, setDate] = useState(addDays(new Date(), 7));
  const [desc, setDesc] = useState('');

  const handleOk = () => newWorkCb(renderType, date, desc);

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
              <Box as="div" css="width: 100%; border: solid 1px black;">
                <Box as={Img} fluid={node} m={1} />
                <Paragraph>{node.label}</Paragraph>
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
          <Box as={Flex} mt="2" flexDirection={['column', null, 'row']}>
            <Box
              as={Img}
              fluid={images[renderType]}
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
        </Box>
      )}
    </Container>
  );
};

export default NewWorkModal;
