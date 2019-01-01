import React, { useState } from 'react';
import { Heading, Text } from 'rebass';
import Modal from 'react-responsive-modal';
import Container from './Container';
import Section, { Props } from './Section';
import OrderModal from './OrderModal';
import Paragraph from './Paragraph';

const OrderSection = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <Section {...props}>
      <Container as={Text} textAlign="left">
        <Heading id="order" textAlign="center" my={4}>
          Megrendelés
        </Heading>
        <Paragraph>Lorem ipsum</Paragraph>
        <button type="button" onClick={openModal}>
          Szabályzat
        </button>
        {/* There is a bug with the scrolling. Probably will be fixed soon */}
        <Modal open={modalIsOpen} onClose={closeModal} center>
          <OrderModal />
        </Modal>
      </Container>
    </Section>
  );
};

export default OrderSection;
