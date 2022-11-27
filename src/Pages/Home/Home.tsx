import axios, { AxiosError, AxiosResponse } from 'axios';
import Card from 'Components/Card/Card';
import Container from 'Components/Container/Container';
import ErrorMessage from 'Components/ErrorMessage/ErrorMessage';
import Spinner from 'Components/Spinner/Spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPictures } from 'Services/Redux/Features/picturesSlice';
import URL from 'Services/Utils/Constants/url';
import { ICategoryState, IPictures, IPicturesState } from 'Services/Utils/Interfaces';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState<boolean>(false);
  const picturesData: IPictures[] = useSelector((state: IPicturesState) => state.pictures).pictures;
  const category: string = useSelector((state: ICategoryState) => state.category).category;

  const getPictures = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: AxiosResponse = await axios.get(URL + 'pictures');
      if (response.data.length === 0) return;
      if (category && response.data) {
        const pictures: IPictures[] = response.data;
        const picturesFiltred: IPictures[] = pictures.filter((elt) => elt.category === category);
        dispatch(setPictures(picturesFiltred));
      } else {
        dispatch(setPictures(response.data));
      }
    } catch (error: AxiosError | any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPictures();
  }, [category]);

  return (
    <Container>
      <>
        {!picturesData.length && (
          <h1>
            <ErrorMessage message='Data not found' />
          </h1>
        )}
        {!isLoading ? (
          picturesData?.map((picture) => {
            return <Card {...picture} key={picture.id} />;
          })
        ) : (
          <Spinner />
        )}
      </>
    </Container>
  );
}
