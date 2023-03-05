import React from 'react';
import {
  Flex, Heading, Tabs, TabList, Tab, VStack, Image, SimpleGrid,
} from '@chakra-ui/react';
import IMAGES from '../../../../images';
import PersonCard from './components/PersonCard';

export default function Discover() {
  return (
    <Flex
      as="section"
      padding={{ base: '0.5rem', md: '2 rem' }}
      minW="100%"
      flexDir="column"
    >
      <VStack
        mb="1rem"
      >
        <Heading
          mb="1rem"
        >
          Find Partners
        </Heading>
        <Flex
          as={Tabs}
        >
          <TabList
            as={Flex}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Tab>
              <Image />
              All Languages
              <Image
                ml="4px"
                maxW="20px"
                src={IMAGES.globe}
              />
            </Tab>
            <Tab>
              Japanese
              <Image
                ml="4px"
                maxW="20px"
                src={IMAGES.flags.japan}
              />
            </Tab>
            <Tab>
              French
              <Image
                ml="4px"
                maxW="20px"
                src={IMAGES.flags.france}
              />

            </Tab>
            <Tab>
              English
              <Image
                ml="4px"
                maxW="20px"
                src={IMAGES.flags.england}
              />

            </Tab>
            <Tab>
              Chinese
              <Image
                ml="4px"
                maxW="20px"
                src={IMAGES.flags.china}
              />

            </Tab>
            <Tab>
              Vietnamese
              <Image
                ml="4px"
                maxW="20px"
                src={IMAGES.flags.vietnam}
              />
            </Tab>
          </TabList>
        </Flex>
      </VStack>
      <SimpleGrid
        as="section"
        minChildWidth={{ base: '300px', md: '440px' }}
        gap="1rem"
        overflow="auto"
      >
        <PersonCard />
        <PersonCard />
        <PersonCard />
      </SimpleGrid>
    </Flex>
  );
}
