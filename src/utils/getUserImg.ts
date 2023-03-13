import IMAGES from './images'

const getUserImage = (img: 'default' | string | null | undefined) => {
    if (img === 'default') {
        return IMAGES.defaultImg
    }
    if (!img) {
        return IMAGES.defaultImg
    }
    if(img === undefined) {
        return IMAGES.defaultImg
    }
    return img
}

export default getUserImage
