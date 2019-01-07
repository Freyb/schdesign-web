import { graphql, StaticQuery } from 'gatsby';
import React, { useState } from 'react';
import { Heading, Text } from 'rebass';
import Modal from 'react-responsive-modal';
import Container from './Container';
import Section, { Props } from './Section';
import OrderModal from './OrderModal';
import Paragraph from './Paragraph';
import TextLink from './TextLink';
import OrderForm from './OrderForm';

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
        <Paragraph textAlign="center">
          Kérjük, hogy mielőtt leadsz egy rendelést, figyelmesen olvasd el a{' '}
          <TextLink onClick={openModal}>szabályzatot</TextLink>. Köszönjük!
        </Paragraph>

        <StaticQuery
          query={graphql`
            {
              allWorktypesYaml {
                edges {
                  node {
                    name
                    label
                    image {
                      childImageSharp {
                        fluid {
                          ...GatsbyImageSharpFluid
                          originalImg
                        }
                      }
                    }
                  }
                }
              }
            }
          `}
          render={data => (
            <OrderForm
              /* images={data.allWorktypesYaml.edges.reduce(
                (acc: any, curr: any) => {
                  acc[curr.node.name] = {
                    ...curr.node.image.childImageSharp.fluid,
                    label: curr.node.label,
                  };
                  return acc;
                },
                {},
              )} */
              images={data.allWorktypesYaml.edges.map(({ node }: any) => ({
                ...node.image.childImageSharp.fluid,
                name: node.name,
                label: node.label,
              }))}
            />
          )}
        />

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
