import axios from './axios';
import { FormImputs } from '../interfaces/bucket';

export const getSolution = async (params: FormImputs) => {
  const res = await axios.get('/getSolution', { params });
  return res;
};
