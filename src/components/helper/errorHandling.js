import toast from "react-hot-toast";
import { kickUser } from ".";

export const errorHandler = async (error) => {
  let status_code = error && error[0];
  let message = error && error[1].message;

  switch (status_code) {
    case 401:
      await kickUser();
      return toast.error(message || "Access Denied.!!!");

    case 403:
      await kickUser();
      return toast.error(message || "Access Denied.!!!");

    case 404:
      return toast.error(message || "Not Found.!!!");

    case 422:
      return toast.error(error[1].data ? error[1].data[0] : error[1].message);

    case 429:
      return toast.error(message || "Too Many Request.!!!");

    case 400:
      return toast.error(message || "Bad Request.!!!");

    case 500:
      return toast.error(message || "Internal Server Error.!!!");

    case 502:
      return toast.error(message || "Could not fetch data from remote.!!!");

    default:
      return toast.error("Something is not right.!!");
  }
};
