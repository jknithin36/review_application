import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const uploadMovie = async (formData) => {
  const token = getToken();
  try {
    const { data } = await client.post("/movie/create", formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMovieForUpdate = async (id) => {
  const token = getToken();
  try {
    const { data } = await client("/movie/for-update/" + id, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getMovies = async (pageNo, limit) => {
  const token = getToken();
  try {
    const { data } = await client(
      `/movie/movies?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const updateMovie = async (id, formData) => {
  const token = getToken();
  try {
    const { data } = await client.patch("/movie/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const deleteMovie = async (id) => {
  const token = getToken();
  try {
    const { data } = await client.delete(`/movie/${id}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchMovieForAdmin = async (title) => {
  const token = getToken();
  try {
    const { data } = await client(`/movie/search?title=${title}`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getTopRatedMovies = async (type, signal) => {
  try {
    let endpoint = "/movie/top-rated";
    if (type) endpoint = endpoint + "?type=" + type;

    const { data } = await client(endpoint, { signal });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getLatestUploads = async (signal) => {
  try {
    const { data } = await client("/movie/latest-uploads", { signal });
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getSingleMovie = async (id) => {
  try {
    const { data } = await client("/movie/single/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const getRelatedMovies = async (id) => {
  try {
    const { data } = await client("/movie/related/" + id);
    return data;
  } catch (error) {
    return catchError(error);
  }
};

export const searchPublicMovies = async (title) => {
  try {
    const { data } = await client("/movie/search-public?title=" + title);
    return data;
  } catch (error) {
    return catchError(error);
  }
};
