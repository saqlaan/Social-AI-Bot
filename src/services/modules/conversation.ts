import { getLocalData } from 'rnprototype/src/storage';
import { LocalStorageKeys } from 'rnprototype/src/storage/keys';
import axiosClient from '../api';
import { showErrorMessage } from './error';
import { PATHS } from './shared/paths';

export const getChatHistory = async () => {
  const { creatorId } = await getLocalData(LocalStorageKeys.USER);
  if (!creatorId) {
    return null;
  }
  try {
    const result = await axiosClient.get(
      `/${PATHS.getConversationHistory}?creator_id=${creatorId}&order=desc&limit=50`,
    );
    return result?.data;
  } catch (e) {
    showErrorMessage();
  }
};

export const getInsight = async () => {
  const { creatorId } = await getLocalData(LocalStorageKeys.USER);
  if (!creatorId) {
    return null;
  }
  try {
    const result = await axiosClient.get(
      `/${PATHS.getInsight}?creator_id=${creatorId}&date=${Date.now()}`,
    );
    return result?.data;
  } catch (e) {
    console.log(e);
    showErrorMessage();
  }
};

export const writeMessage = async ({ message, body }: { message: string }) => {
  const { creatorId } = await getLocalData(LocalStorageKeys.USER);
  try {
    const result = await axiosClient.post(`/${PATHS.writeMessage}`, {
      creator_id: creatorId,
      message,
      prompt_id: '',
      role: 'user',
      user_id: '',
      ...body,
    });
    return result?.data;
  } catch (e) {
    console.log(e);
    showErrorMessage();
  }
};
