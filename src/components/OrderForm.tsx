import React, { useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import Modal from 'react-responsive-modal';
import { PlusCircle, ShareSquare } from 'styled-icons/fa-solid';
import Container from './Container';
import FormInput from './FormInput';
import List from './List';
import FormListItem from './FormListItem';
import IconLink from './IconLink';
import NewWorkModal from './NewWorkModal';

/* type WorkImage = {
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
}; */

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
};

type Work = {
  id: number;
  type: number;
  deadline: Date;
  description: string;
};

const OrderForm = ({ images }: Props) => {
  /* Form fields */
  const [formName, setName] = useState('');
  const [formSubject, setSubject] = useState('');
  const [formEmail, setEmail] = useState('');

  /* Works */
  const [ids, setId] = useState(0);
  const [works, setWork] = useState([] as Work[]);

  /* Modal */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /* Open / Close Modal */
  const closeModal = () => setModalIsOpen(false);
  const openModal = (event: any) => {
    setModalIsOpen(true);
    event.preventDefault();
  };

  /* Add new work */
  const increaseId = () => setId(ids + 1);
  const addWork = (renderType: number, date: Date, desc: string) => {
    setWork([
      { id: ids, type: renderType, deadline: date, description: desc },
      ...works,
    ]);
    increaseId();
    closeModal();
  };

  /* Modify / Delete work */
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

  /* Submit */
  const handleSubmit = (event: any) => {
    addWork(formSubject);
    event.preventDefault();
  };

  const test = () => {
    console.log(images);
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
        <Container as={Flex} flexDirection={['column', 'row']} my={[null, 2]}>
          <FormInput
            text="Név"
            id="name"
            mr={[null, 2]}
            value={formName}
            onChange={(e: any) => setName(e.target.value)}
          />
          <FormInput
            text="Tárgy"
            id="subject"
            value={formSubject}
            onChange={(e: any) => setSubject(e.target.value)}
          />
        </Container>

        <Container as={Flex} flexDirection={['column', 'row']} my={[null, 2]}>
          <FormInput
            text="Email"
            id="email"
            value={formEmail}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Container>

        <IconLink
          icon={PlusCircle}
          href="#"
          title="New Work"
          onClick={openModal}
        />
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

      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        center
        styles={{
          modal: {
            maxWidth: '1000px',
            width: '80%',
          },
        }}
      >
        <NewWorkModal images={images} newWorkCb={addWork} />
      </Modal>
    </Container>
  );
};

export default OrderForm;
