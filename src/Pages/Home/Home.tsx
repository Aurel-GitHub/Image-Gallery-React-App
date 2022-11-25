import axios, { AxiosError, AxiosResponse } from 'axios';
import Container from 'Components/Container/Container';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPictures } from 'Services/Redux/Features/picturesSlice';
import URL from 'Services/Utils/Constants/url';
import { IPicturesState } from 'Services/Utils/Interfaces';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const picturesData = useSelector((state: IPicturesState) => state.pictures).pictures;

  const getPictures = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.get(URL + 'pictures');
      dispatch(setPictures(response.data));
      console.log('log pic', picturesData);
    } catch (error: AxiosError | any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <Container>
      <h1>work in progress.. {isLoading}</h1>
      {/* <>{!isLoading && picturesData?.length > 0  && typeof picturesData  !== 'undefined ' ? picturesData. : <Spinner />}</> */}
    </Container>
  );
}
