import { LanguageChoices } from '../types/types'
import IMAGES from './images'

const getflag = (lang: LanguageChoices | undefined) => {
    switch (lang) {
        case 'chinese':
            return IMAGES.flags.china
        case 'english':
            return IMAGES.flags.england
        case 'french':
            return IMAGES.flags.france
        case 'japanese':
            return IMAGES.flags.japan
        case 'vietnamese':
            return IMAGES.flags.vietnam
        default:
            return IMAGES.flags.england
    }
}

export default getflag
