import React from 'react';
import {
  GridItem, Box, Image, VStack, HStack, Heading, Text, Circle, Flex,
} from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import IMAGES from '../../../../../images';
import person from '../../../../../assets/person.webp';

export default function PersonCard() {
  return (
    <GridItem
      borderRadius="10px"
      as={Flex}
      background="#2d3055"
      alignItems="center"
      px="0.5rem"
      padding={['0.5rem', '1rem']}
      position="relative"
      maxH="132px"
      boxShadow="lg"
    >
      <Box
        position="relative"
      >
        <Image
          src={person}
          boxSize={['80px', '100px']}
          borderRadius="full"
        />
        <Image
          width={['20px', '30px']}
          position="absolute"
          bottom="5px"
          left="-5px"
          src={IMAGES.flags.france}
        />
      </Box>
      <VStack
        align="flex-start"
        ml="1rem"
      >
        <HStack
          justifyContent="space-between"
          minW="100%"
        >
          <Heading
            fontSize={['1.3rem', '1.7rem']}
            textAlign="left"
          >
            John Doe
          </Heading>
          <Box
            position="absolute"
            right="10px"
            top="10px"
            as={Flex}
            alignItems="center"
            justifyContent="center"
            gap="0.3rem"
          >
            <Text
              fontSize={['0.7rem', '1rem']}
            >
              Online
            </Text>
            <Circle
              size="17px"
              background="green.200"
            />
          </Box>
        </HStack>
        <Text
          fontSize={['0.8rem', '1rem']}
        >
          Programming, excerise, language learning
        </Text>
        <HStack>
          <Text
            fontSize={['0.8rem', '1rem']}
          >
            Learning:
          </Text>
          <Image src={IMAGES.flags.japan} w={['15px', '20px']} />
          <Image src={IMAGES.flags.china} w={['15px', '20px']} />
        </HStack>
      </VStack>
      <ArrowRightIcon
        position="absolute"
        bottom="10px"
        right="10px"
      />
    </GridItem>
  );
}
