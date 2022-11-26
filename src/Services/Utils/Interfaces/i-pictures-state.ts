import { IPictures } from './i-pictures';

export interface IPicturesState {
  pictures: { pictures: IPictures[] };
}

export interface IPictureState {
  picture: { picture: IPictures };
}
