import { getLocalData } from 'rnprototype/src/storage';
import { LocalStorageKeys } from 'rnprototype/src/storage/keys';
import axiosClient from '../api';
import { PATHS } from './shared/paths';

export const registerNotificationService = async (token: string) => {
  const { creatorId } = await getLocalData(LocalStorageKeys.USER);
  try {
    await axiosClient.post('/device_token', {
      creator_id: creatorId,
      device_token: token,
    });
    return {};
  } catch (e) {
    console.log(e);
  }
};

export const getCreatorCarousel = async () => {
  const { creatorId } = await getLocalData(LocalStorageKeys.USER);
  try {
    const result = await axiosClient.get(
      `/${PATHS.getCreatorCarousel}?creator_id=${creatorId}`,
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCreatorIntroText = async () => {
  const { creatorId } = await getLocalData(LocalStorageKeys.USER);
  try {
    const result = await axiosClient.get(
      `/${PATHS.getCreatorOverview}?creator_id=${creatorId}`,
    );
    if (result?.data?.text) {
      const { text } = result.data;
      const updatedStr = text
        .split('\n')
        .map(item => item.trim())
        .join('\n');
      return { text: updatedStr };
    }
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
