import Icons from '../res';

export default (icons = Icons) => (image) => {
    if (typeof image == 'string') {
        return icons[image];
    }
    return image;
}