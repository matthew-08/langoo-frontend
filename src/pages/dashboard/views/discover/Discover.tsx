import {
  Flex, Heading, Tabs, TabList, Tab, VStack, Image, SimpleGrid, TabPanels, TabPanel,
} from '@chakra-ui/react';
import IMAGES from '../../../../images';
import PersonCard from './components/PersonCard';
import { useAppSelector } from '../../../../hooks';
import { SetActiveView } from '../../../../types/types';

export default function Discover({ setActiveView }: { setActiveView: SetActiveView }) {
  const loading = useAppSelector((state) => state.usersSlice.loading);
  const usersList = useAppSelector((state) => state.usersSlice.allUsers);
  return (
    <Flex
      as={Tabs}
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
        <Flex>
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
      {
        loading ? <div>Loading...</div>
          : (
            <TabPanels>
              <SimpleGrid
                as={TabPanel}
                minChildWidth={{ base: '270px', md: '440px' }}
                gap="1rem"
                overflow="auto"
                padding="0"
              >
                {usersList.map((user) => (
                  <PersonCard
                    setActiveView={setActiveView}
                    user={user}
                  />
                ))}
              </SimpleGrid>
              <SimpleGrid
                as={TabPanel}
                minChildWidth={{ base: '300px', md: '440px' }}
                gap="1rem"
                overflow="auto"
              />
            </TabPanels>
          )
      }
    </Flex>
  );
}
