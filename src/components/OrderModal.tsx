import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { Heading, Text } from 'rebass';
import Container from './Container';
import ListItem from './ListItem';
import List from './List';

const OrderModal = () => (
  <Container as={Text} textAlign="left">
    <Heading id="order" textAlign="center" mb={4}>
      Szabályzat
    </Heading>

    <List
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
            <ListItem
              key={node.id}
              css={`
                flex-basis: 100%;
                margin-bottom: 1.5rem;
                @media (min-width: 1440px) {
                  flex-basis: 45%;
                  padding: 0 1rem;
                }
                display: flex;
              `}
            >
              <Text
                as="div"
                css="
                      margin-right: 0.5rem;
                    "
              >
                <Text
                  as="div"
                  css="
                      width: 3rem;
                      height: 3rem;
                      font-size: 2rem;
                      font-family: 'Roboto Mono, monospace';
                      line-height: 3rem;
                      text-align: center;
                      background-color: #f8485e;
                      border-radius: 250px;
                    "
                >{`${index < 9 ? `0` : ``}${index + 1}`}</Text>
              </Text>
              <Text
                css={`
                  align-self: center;
                  white-space: pre-wrap;
                  @media (min-width: 1024px) {
                    align-self: flex-start;
                  }
                `}
              >
                {node.name}
              </Text>
            </ListItem>
          ))
        }
      />
    </List>
  </Container>
);

export default OrderModal;
