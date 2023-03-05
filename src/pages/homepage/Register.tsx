import { Flex, Box, Input } from '@chakra-ui/react';
import React from 'react';
import RegisterForm from './components/RegisterForm';

export default function Register() {
  return (
    <Flex
      as="main"
    >
      <Flex
        minW="30%"
        minH="100%"
        color="blackAlpha.100"
      />
      <RegisterForm />
    </Flex>
  );
}
