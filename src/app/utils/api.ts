export const getAllNotifications = async () => {
  let data = await fetch("http://localhost:8081/notification/all");
  return await data.json();
};
