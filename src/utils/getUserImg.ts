import IMAGES from './images'

const getUserImage = (img: 'default' | string | null | undefined) => {
    if (img === 'default') {
        return IMAGES.defaultImg
    }
    if (!img) {
        return IMAGES.defaultImg
    }
    console.log(img)
    return img
}

export default getUserImage
