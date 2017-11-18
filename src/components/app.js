import React from 'react';
import {
  View,
  Text,
} from 'blocks';

const Wrapper = view`
  display: flex;
`;

const Text = text`
  flex: 1;
`;

export default () => (
  <Wrapper>
    <Text>Hello</Text>
  </Wrapper>
);
