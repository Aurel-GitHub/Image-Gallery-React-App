// import styles from './PicturesDetails.module.css';

import axios, { AxiosError, AxiosResponse } from 'axios';
import Container from 'Components/Container/Container';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import URL from 'Services/Utils/Constants/url';
import { IPictures } from 'Services/Utils/Interfaces';
import styles from './PictureDetails.module.css';

export default function PictureDetails(): JSX.Element {
  const location = useLocation();
  const [picture, setPicture] = useState<IPictures | null>(null);

  const getPicturesDetails = async () => {
    try {
      const currentID: string = location.pathname.slice(18);
      console.log('cur', currentID);

      const response: AxiosResponse = await axios.get(URL + 'pictures/' + currentID);
      setPicture(response.data);
      console.log('res', picture);
    } catch (error: AxiosError | any) {
      throw new error(error);
    }
  };

  useEffect(() => {
    getPicturesDetails();
  }, []);

  return (
    <Container>
      <>
        <div className={styles.pictureDetailSection}>
          <div className={styles.pictureDescriptionSection}>
            <img alt={picture?.artist + '-' + picture?.category} src={picture?.photo} />
            <span className={styles.spanArtist}> {picture?.artist}</span>
            <span className={styles.spanArtist}> {picture?.artist}</span>
            <span className={styles.spanArtist}> {picture?.artist}</span>
          </div>
        </div>
      </>
    </Container>
  );
}
