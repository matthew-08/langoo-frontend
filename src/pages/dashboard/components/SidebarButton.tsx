import { IconButton, Image } from '@chakra-ui/react'
import IMAGES from '../../../utils/images'
import whiteFilter from '../../../utils/whiteFilter'

type ViewOptions = 'chat' | 'discover' | 'settings'
interface Props {
    switchView: (view: ViewOptions) => void
    activeView: ViewOptions
    buttonType: ViewOptions
}
function SidebarButton({ switchView, activeView, buttonType }: Props) {
    let imageSrc
    if (buttonType === 'chat') {
        imageSrc = IMAGES.chat3
    }
    if (buttonType === 'discover') {
        imageSrc = IMAGES.chat2
    }
    if (buttonType === 'settings') {
        imageSrc = IMAGES.settings
    }
    return (
        <IconButton
            aria-label="discover-cion"
            px={{ base: '0.6rem', md: '1rem' }}
            py={{ base: '1rem', md: '2rem' }}
            border="none"
            _focus={{
                borderColor: '#4299e1',
            }}
            onClick={() => switchView(buttonType)}
            backgroundColor={
                activeView === buttonType ? 'whiteAlpha.100' : 'transparent'
            }
            icon={<Image src={imageSrc} width="30px" filter={whiteFilter} />}
        />
    )
}

export default SidebarButton
