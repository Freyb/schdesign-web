import React, { useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import Modal from 'react-responsive-modal';
import { PlusCircle, ShareSquare, TrashAlt } from 'styled-icons/fa-solid';
import Container from './Container';
import FormInput from './FormInput';
import List from './List';
import FormListItem, { dateToString } from './FormListItem';
import IconLink from './IconLink';
import NewWorkModal from './NewWorkModal';
import EditWorkModal from './EditWorkModal';
import ResponseModal from './ResponseModal';

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
  const [newModalState, setNewModalState] = useState(false);
  const [editModalState, setEditModalState] = useState({
    node: -1,
    open: false,
  });
  const [resModalState, setResModalState] = useState({
    status: 0,
    open: false,
  });

  /* Open / Close Modal */
  const closeNewModal = () => setNewModalState(false);
  const openNewModal = () => setNewModalState(true);
  const closeEditModal = () =>
    setEditModalState({ ...editModalState, open: false });
  const openEditModal = (i: number) =>
    setEditModalState({ node: i, open: true });
  const closeResModal = () =>
    setResModalState({ ...resModalState, open: false });
  const openResModal = (s: number) =>
    setResModalState({ status: s, open: true });

  /* Add new work */
  const increaseId = () => setId(ids + 1);
  const addWork = (renderType: number, date: Date, desc: string) => {
    setWork([
      ...works,
      { id: ids, type: renderType, deadline: date, description: desc },
    ]);
    increaseId();
    closeNewModal();
  };

  /* Modify / Delete work */
  const changeDate = (date: any, index: number) => {
    const newMarkers = works.map((el: Work) =>
      el.id === works[index].id ? { ...el, deadline: date } : el,
    );
    setWork(newMarkers);
  };
  const changeDesc = (value: any, index: number) => {
    const newMarkers = works.map((el: Work) =>
      el.id === works[index].id ? { ...el, description: value } : el,
    );
    setWork(newMarkers);
  };
  const editWork = (renderType: number, date: Date, desc: string) => {
    const newMarkers = works.map((el: Work) =>
      el.id === works[editModalState.node].id
        ? { ...el, deadline: date, description: desc }
        : el,
    );
    setWork(newMarkers);
    closeEditModal();
  };
  const deleteCb = (index: number) => {
    /* const newMarkers = works.filter((el: Work) => el.id !== node.id); */
    const newWorks = [...works];
    newWorks.splice(index, 1);
    setWork(newWorks);
  };
  const deleteAll = () => {
    setWork([]);
  };

  /* Submit */
  const handleSubmit = (event: any) => {
    const data = works.reduce((acc: any, curr: Work) => {
      const ret = [
        ...acc,
        {
          type: images[curr.type].label,
          deadline: dateToString(curr.deadline),
          description: curr.description,
        },
      ];
      return ret;
    }, []);
    const req = {
      name: formName,
      subject: formSubject,
      email: formEmail,
      works: data,
    };
    fetch('http://localhost:8100/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
      .then(() => {
        openResModal(1);
      })
      .catch(() => {
        openResModal(0);
      });
    event.preventDefault();
  };

  const test = () => {
    addWork(
      Math.floor(Math.random() * 6),
      new Date(),
      Math.random()
        .toString(36)
        .substring(7),
    );
  };

  return (
    <Container as={Text} textAylign="left" px={null}>
      <Box
        as="form"
        onSubmit={handleSubmit}
        css={`
          margin: auto;
          @media (min-width: 600px) {
            width: 80%;
          }
        `}
      >
        <Box as={Flex} flexDirection={['column', 'row']} my={[null, 2]}>
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
        </Box>

        <Box as={Flex} flexDirection={['column', 'row']} my={[null, 2]}>
          <FormInput
            text="Email"
            id="email"
            value={formEmail}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Box>

        <Box as={Flex} css="font-size: 2rem;" my={[null, 2]}>
          <IconLink
            as="button"
            type="submit"
            icon={ShareSquare}
            title="Submit"
          />
          <Box as={Flex} css="flex-grow: 1; justify-content: flex-end;">
            <IconLink
              as="button"
              type="button"
              icon={PlusCircle}
              title="Add work"
              onClick={openNewModal}
              mr="2"
            />
            <IconLink
              as="button"
              type="button"
              icon={TrashAlt}
              title="Delete all"
              onClick={deleteAll}
            />
          </Box>
        </Box>

        <List px={0} m={0}>
          {works.map((node: Work, index: number) => (
            <FormListItem
              key={node.id}
              fluid={images[node.type]}
              date={node.deadline}
              setDate={(date: any) => changeDate(date, index)}
              desc={node.description}
              setDesc={(e: any) => changeDesc(e.target.value, index)}
              editCb={() => openEditModal(index)}
              deleteCb={() => deleteCb(index)}
            />
          ))}
        </List>
      </Box>

      <Modal
        open={newModalState}
        onClose={closeNewModal}
        center
        styles={{
          modal: {
            maxWidth: '1000px',
            width: '70%',
          },
        }}
      >
        <NewWorkModal images={images} okButtonCb={addWork} />
      </Modal>

      <Modal
        open={editModalState.open}
        onClose={closeEditModal}
        center
        styles={{
          modal: {
            maxWidth: '1000px',
            width: '70%',
          },
        }}
      >
        <EditWorkModal
          images={images}
          node={works[editModalState.node]}
          okButtonCb={editWork}
        />
      </Modal>

      <Modal
        open={resModalState.open}
        onClose={closeResModal}
        center
        styles={{
          modal: {
            maxWidth: '1000px',
            width: '70%',
          },
        }}
      >
        <ResponseModal status={resModalState.status} />
      </Modal>

      <input type="button" value="Test" onClick={test} />
    </Container>
  );
};

export default OrderForm;
