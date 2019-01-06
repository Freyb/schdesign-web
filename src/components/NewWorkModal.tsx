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

const NewWorkModal = ({ images, newWorkCb }: Props) => {
  const [renderType, setRender] = useState(-1);
  const [date, setDate] = useState(new Date());
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
          <Box as="div" css="width: 100%; border: solid 1px black;">
            <input type="button" value="back" onClick={() => setRender(-1)} />
            <Box as={Img} fluid={images[renderType]} m={1} />
            <Paragraph>{images[renderType].label}</Paragraph>
            <DatePicker selected={date} onChange={setDate} />
            <Box
              as="textarea"
              value={desc}
              onChange={(e: any) => setDesc(e.target.value)}
            />
            <input type="button" value="ok" onClick={handleOk} />
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default NewWorkModal;
