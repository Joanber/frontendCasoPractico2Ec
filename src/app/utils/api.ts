import { notificationByReceptorId } from "./../constants";

export const getGeneralNotifications = async () => {
  let data = await fetch(`${notificationByReceptorId}ALL`);

  return await data.json();
};

export const getNotificationsOfUser = async () => {
  const loggedUser = JSON.parse(localStorage.getItem("usuario"));
  let data = await fetch(`${notificationByReceptorId}${loggedUser.username}`);

  return await data.json();
};
