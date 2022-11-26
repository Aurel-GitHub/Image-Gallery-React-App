import axios, { AxiosResponse } from 'axios';
import FormPictures from 'Components/Forms/Pictures/FormPictures';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import URL from 'Services/Utils/Constants/url';
import { IPictures } from 'Services/Utils/Interfaces';

export default function DetailsPictures(): JSX.Element {
  const location = useLocation();
  const [picture, setPicture] = useState<IPictures | undefined>();

  const getPicture = async (): Promise<void> => {
    try {
      const id: string = location.pathname.slice(16);
      const response: AxiosResponse = await axios.get(URL + 'pictures/' + id);
      setPicture(response.data);
      console.log('res', response);
    } catch (error: any) {
      throw new error(error);
    }
  };
  useEffect(() => {
    getPicture();
  }, []);
  return <FormPictures isEdit={true} picture={picture} />;
}
