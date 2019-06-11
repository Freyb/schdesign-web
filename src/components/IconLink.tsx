import React from 'react';
import { Box } from 'rebass';
import { StyledIcon } from 'styled-icons/types';

interface Props {
  icon: StyledIcon;
  as?: string;
  href?: string;
  title?: string;
  [propName: string]: any; // TODO: Extend type of `Box`
}

const IconLink = ({ icon: Icon, as, title, ...props }: Props) => (
  <Box
    as={as || 'a'}
    {...props}
    css={`
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      :hover {
        color: ${({ theme }: any) => theme.colors.red};
      }
    `}
  >
    <Icon title={title} size="1em" />
  </Box>
);

export default IconLink;
