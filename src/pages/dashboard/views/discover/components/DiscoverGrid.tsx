import { TabPanel, SimpleGrid } from '@chakra-ui/react'
import { v4 as uuid } from 'uuid'
import PersonCard from './PersonCard'
import { useAppSelector } from '../../../../../utils/hooks'
import { LanguageChoices, SetActiveView } from '../../../../../types/types'

type Language = LanguageChoices | 'all'

type Props = {
    language: Language
    setActiveView: SetActiveView
}

function DiscoverGrid({ language, setActiveView }: Props) {
    const usersList = useAppSelector((state) => state.usersSlice.allUsers)

    let view
    if (language === 'all') {
        view = (
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
                        key={uuid()}
                        user={user}
                    />
                ))}
            </SimpleGrid>
        )
    } else {
        const reducedList = usersList.filter((user) =>
            user.learningLanguages.includes(language)
        )
        view = (
            <SimpleGrid
                as={TabPanel}
                minChildWidth={{ base: '270px', md: '440px' }}
                gap="1rem"
                overflow="auto"
                padding="0"
            >
                {reducedList.map((user) => (
                    <PersonCard
                        setActiveView={setActiveView}
                        user={user}
                        key={uuid()}
                    />
                ))}
            </SimpleGrid>
        )
    }
    return view
}

export default DiscoverGrid
