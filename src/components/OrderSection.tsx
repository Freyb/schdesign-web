import React, { useState } from 'react';
import { Heading, Text } from 'rebass';
import Modal from 'react-responsive-modal';
import Container from './Container';
import Section, { Props } from './Section';
import OrderModal from './OrderModal';
import Paragraph from './Paragraph';
import TextLink from './TextLink';

const OrderSection = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <Section {...props}>
      <Container as={Text} textAylign="left">
        <Heading id="order" textAlign="center" my={4}>
          Megrendelés
        </Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et elit
          quis orci maximus porttitor. Pellentesque ac enim euismod, fermentum
          quam sit amet, lacinia justo.{' '}
          <TextLink onClick={openModal}>Szabályzat</TextLink> Aenean ultrices
          auctor mauris, id rhoncus ante vestibulum eget. Donec vulputate nisi
          sed enim lobortis imperdiet. Morbi sit amet ultricies arcu.
        </Paragraph>
        {/* There is a bug with the scrolling. Probably will be fixed soon */}
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          center
          styles={{
            modal: {
              maxWidth: '1000px',
            },
          }}
        >
          <OrderModal />
        </Modal>
      </Container>
    </Section>
  );
};

export default OrderSection;
