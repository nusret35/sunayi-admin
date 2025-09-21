import UploadFileResponse from "@/types/uploadFileResponse";
import GetPostResponse from "@/types/getPostResponse";
import { authApi } from "./authApi";

const postApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/post/upload-file",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["post"],
    }),
    getPost: builder.query<GetPostResponse, string>({
      query: (id) => {
        return {
          url: `/post/${id}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    getPosts: builder.query<GetPostResponse[], number>({
      query: (param) => {
        return {
          url: `/post/all?offset=${param}`,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
    getRecentPosts: builder.query<GetPostResponse[], void>({
      query: () => {
        return {
          url: "/post/recent",
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useLazyGetRecentPostsQuery,
  useGetRecentPostsQuery,
} = postApi;
