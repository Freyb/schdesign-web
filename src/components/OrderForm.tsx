import React, { useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import Container from './Container';
import FormInput from './FormInput';
import List from './List';
import FormListItem from './FormListItem';

const OrderForm = () => {
  const [formName, setName] = useState('');
  const [formSubject, setSubject] = useState('');
  const [formEmail, setEmail] = useState('');
  const [ids, setId] = useState(0);
  const [works, setWork] = useState([]);

  const increaseId = () => setId(ids + 1);

  const addWork = (name: string, description: string) => {
    setWork([{ id: ids, name, description }, ...works]);
    increaseId();
  };

  const handleSubmit = (event: any) => {
    addWork(formName, formSubject);
    event.preventDefault();
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
        <List px={0}>
          {works.map((node: any) => (
            <FormListItem
              key={node.id}
              type="fb"
              name={node.name}
              description={node.description}
            />
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default OrderForm;
