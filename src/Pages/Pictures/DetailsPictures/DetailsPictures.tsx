import axios, { AxiosResponse } from 'axios';
import FormPictures from 'Components/Forms/Pictures/FormPictures';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPicture } from 'Services/Redux/Features/pictureSlice';
import URL from 'Services/Utils/Constants/url';
import { IPictures, IPictureState } from 'Services/Utils/Interfaces';

export default function DetailsPictures(): JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();
  const pictureData: IPictures = useSelector((state: IPictureState) => state.picture).picture;

  const getPicture = async (): Promise<void> => {
    try {
      const id: string = location.pathname.slice(16);
      const response: AxiosResponse = await axios.get(URL + 'pictures/' + id);
      dispatch(setPicture(response.data));
    } catch (error: any) {
      throw new error(error);
    }
  };
  useEffect(() => {
    getPicture();
  }, []);
  return <FormPictures isEdit={true} picture={pictureData} />;
}
