import axiosClient from '../api';
import { PATHS } from './shared/paths';

export const getCreatorId = async (email: string) => {
  try {
    const result = await axiosClient.get(
      `/${PATHS.getCreatorID}?email=${email}`,
    );
    if (result?.data?.creator_id) {
      return { creatorId: result.data.creator_id };
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};
