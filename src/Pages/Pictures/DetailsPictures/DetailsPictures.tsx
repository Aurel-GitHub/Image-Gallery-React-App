import axios, { AxiosResponse } from 'axios';
import FormPictures from 'Components/Forms/Pictures/FormPictures';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setPicture } from 'Services/Redux/Features/pictureSlice';
import URL from 'Services/Utils/Constants/url';
// import { IPictures } from 'Services/Utils/Interfaces';

export default function DetailsPictures(): JSX.Element {
  const location = useLocation();
  const dispatch = useDispatch();
  // const [picture, setPicture] = useState<IPictures | undefined>();

  const getPicture = async (): Promise<void> => {
    try {
      const id: string = location.pathname.slice(16);
      const response: AxiosResponse = await axios.get(URL + 'pictures/' + id);
      console.log('resdata', response.data);
      dispatch(setPicture(response.data));
      // setPicture(response.data);
    } catch (error: any) {
      throw new error(error);
    }
  };
  useEffect(() => {
    getPicture();
  }, []);
  return <FormPictures isEdit={true} />;
}
