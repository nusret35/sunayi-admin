import { Post, SheetMetalCuttingPost, SheetMetalPost } from "./post";

interface GetPostResponse {
  post: Post | SheetMetalCuttingPost | SheetMetalPost;
  type: string;
}

export default GetPostResponse;
