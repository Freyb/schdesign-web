import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Link, Heading, Text } from 'rebass';
import Container from './Container';

import 'react-datepicker/dist/react-datepicker.css';

import Paragraph from './Paragraph';

type Work = {
  id: number;
  type: number;
  deadline: Date;
  description: string;
};

type Props = {
  status: number;
};

const ResponseModal = ({ status }: Props) => (
  <Container as={Text} textAlign="left">
    <Heading id="order" textAlign="center" mb={4}>
      {`${status ? 'Köszönjük a megrendelést!' : 'Hiba történt!'}`}
    </Heading>

    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              email
            }
          }
        }
      `}
      render={data => (
        <>
          {status === 1 && (
            <Paragraph textAlign="center">
              Hamarosan felvesszük veled a kapcsolatot a megadott elérhetőségen.
            </Paragraph>
          )}
          {status === 0 && (
            <Paragraph textAlign="center">
              Próbáld újra később. <br />
              Ha a hiba továbbra is fennáll, írj egy e-mailt a{' '}
              <Text
                as={Link}
                href={`mailto:${data.site.siteMetadata.email}`}
                fontWeight="bold"
              >
                {data.site.siteMetadata.email}
              </Text>{' '}
              címre.
            </Paragraph>
          )}
        </>
      )}
    />
  </Container>
);

export default ResponseModal;
