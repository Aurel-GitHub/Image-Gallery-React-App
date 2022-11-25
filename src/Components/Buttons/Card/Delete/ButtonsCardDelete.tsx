import axios, { AxiosError } from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { deletePicture } from 'Services/Redux/Features/picturesSlice';
import URL from 'Services/Utils/Constants/url';
import ButtonCardDeleteProps from 'Services/Utils/Types/buttonsCardDeleteProps';

export default function ButtonsCardDelete({ id }: ButtonCardDeleteProps): JSX.Element {
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
