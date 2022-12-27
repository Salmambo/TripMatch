import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const updateImgApi = createApi({
  reducerPath: "updateImgApi",
  tagTypes: ["updateImgApi"],
  baseQuery: axiosBaseQuery({
    baseUrl: "https://api.cloudinary.com/v1_1/dk9scwone/image/",
  }),
  endpoints: (builder) => ({
    updateImg: builder.mutation<object, FormData>({
      query: (formData) => ({
        url: "upload",
        method: "POST",
        data: formData,
      }),
    }),
  }),
});

export const { useUpdateImgMutation } = updateImgApi;
