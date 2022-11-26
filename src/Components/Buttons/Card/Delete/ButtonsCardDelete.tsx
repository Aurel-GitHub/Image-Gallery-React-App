import axios, { AxiosError } from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deletePicture } from 'Services/Redux/Features/picturesSlice';
import URL from 'Services/Utils/Constants/url';
import { ButtonDelete } from 'Services/Utils/Types/ButtonDelete';

export default function ButtonsCardDelete({ id }: ButtonDelete): JSX.Element {
  const dispatch = useDispatch();

  const handleDelete = async (): Promise<void> => {
    try {
      await axios(URL + 'pictures' + id);
      dispatch(deletePicture(id));
    } catch (error: AxiosError | any) {
      throw new error(error);
    }
  };
  return <AiOutlineDelete onClick={() => handleDelete} />;
}
