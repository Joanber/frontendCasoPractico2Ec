import { allNotificationsUrl } from "./../constants";

export const getAllNotifications = async () => {
  let data = await fetch(allNotificationsUrl);
  return await data.json();
};
