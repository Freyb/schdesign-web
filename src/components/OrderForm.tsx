import React, { useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import Container from './Container';
import FormInput from './FormInput';
import List from './List';
import FormListItem from './FormListItem';

type WorkImage = {
  aspectRatio: number;
  src: string;
  srcSet: string;
  sizes: string;
  originalImg: string;
  type: string;
};

type Props = {
  images: {
    [propName: string]: WorkImage;
  };
};

type Work = {
  id: number;
  type: string;
  deadline: Date;
  description: string;
};

const OrderForm = ({ images }: Props) => {
  const [formName, setName] = useState('');
  const [formSubject, setSubject] = useState('');
  const [formEmail, setEmail] = useState('');
  const [ids, setId] = useState(0);
  const [works, setWork] = useState([] as Work[]);

  const increaseId = () => setId(ids + 1);

  const addWork = (description: string) => {
    setWork([
      { id: ids, type: description, deadline: new Date(), description: '' },
      ...works,
    ]);
    increaseId();
  };

  const changeDate = (date: any, node: Work) => {
    const newMarkers = works.map((el: Work) =>
      el.id === node.id ? { ...el, deadline: date } : el,
    );
    setWork(newMarkers);
  };

  const changeDesc = (value: any, node: Work) => {
    const newMarkers = works.map((el: Work) =>
      el.id === node.id ? { ...el, description: value } : el,
    );
    setWork(newMarkers);
  };

  const deleteCb = (node: Work) => {
    const newMarkers = works.filter((el: Work) => el.id !== node.id);
    setWork(newMarkers);
  };

  const handleSubmit = (event: any) => {
    addWork(formSubject);
    event.preventDefault();
  };

  const test = () => {
    console.log(works);
  };

  return (
    <Container as={Text} textAylign="left" px={null}>
      <Box
        as="form"
        onSubmit={handleSubmit}
        css={`
          margin: auto;
          @media (min-width: 1024px) {
            width: 80%;
          }
        `}
      >
        <Container
          as={Flex}
          flexDirection={['column', 'row']}
          px={null}
          my={[null, null, 2]}
        >
          <FormInput
            text="Name"
            id="name"
            mr={[null, 2]}
            value={formName}
            onChange={(e: any) => setName(e.target.value)}
          />
          <FormInput
            text="Subject"
            id="subject"
            value={formSubject}
            onChange={(e: any) => setSubject(e.target.value)}
          />
        </Container>

        <Container
          as={Flex}
          flexDirection={['column', 'row']}
          px={null}
          my={[null, 2]}
        >
          <FormInput
            text="Email"
            id="email"
            value={formEmail}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Container>
        <input type="submit" value="Submit" />
        <input type="button" value="Test" onClick={test} />
        <List px={0}>
          {works.map((node: Work) => (
            <FormListItem
              key={node.id}
              fluid={images[node.type]}
              date={node.deadline}
              setDate={(date: any) => changeDate(date, node)}
              desc={node.description}
              setDesc={(e: any) => changeDesc(e.target.value, node)}
              deleteCb={() => deleteCb(node)}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default OrderForm;
