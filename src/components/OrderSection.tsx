import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Box, Heading, Text } from 'rebass';
import Container from './Container';
import Section, { Props } from './Section';

const OrderSection = (props: Props) => (
  <Section {...props}>
    <Container as={Text} textAlign="left">
      <Heading id="order" textAlign="center" my={4}>
        Megrendelés
      </Heading>

      <Box
        as="ul"
        {...props}
        css="
          display: flex;
          flex-wrap: wrap;
          padding: 0;
          list-style: none;
        "
      >
        <StaticQuery
          query={graphql`
            {
              allRulesYaml {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          `}
          render={data =>
            data.allRulesYaml.edges.map(({ node }: any, index: number) => (
              <Box
                as="li"
                key={node.id}
                css={`
                  flex-basis: 100%;
                  margin-bottom: 1.5rem;
                  @media (min-width: 1024px) {
                    flex-basis: 50%;
                    padding: 0 1rem;
                  }
                  display: flex;
                `}
              >
                <Text
                  as="div"
                  css="
                      flex: 0 0 4rem;
                      margin-right: 0.5rem;
                    "
                >
                  <Text
                    as="div"
                    css="
                      width: 4rem;
                      height: 4rem;
                      font-size: 3rem;
                      font-family: 'Roboto Mono, monospace';
                      line-height: 4rem;
                      text-align: center;
                      background-color: #f8485e;
                      border-radius: 250px;
                    "
                  >{`${index < 9 ? `0` : ``}${index + 1}`}</Text>
                </Text>
                <Text
                  css={`
                    align-self: center;
                    @media (min-width: 1024px) {
                      align-self: flex-start;
                    }
                  `}
                >
                  {node.name}
                </Text>
              </Box>
            ))
          }
        />
      </Box>
    </Container>
  </Section>
);

export default OrderSection;
