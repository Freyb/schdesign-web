import React, { useState } from 'react';
import { Text } from 'rebass';
import { Box } from 'rebass';
import { Flex } from 'rebass';
import Container from './Container';
import FormInput from './FormInput';

const OrderForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (event: any) => {
    alert(`A name was submitted: ${name}`);
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
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <FormInput
            text="Subject"
            id="subject"
            value={subject}
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
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Container>
        <input type="submit" value="Submit" />
      </Box>
      {name}
      <br />
      {subject}
      <br />
      {email}
    </Container>
  );
};

export default OrderForm;
