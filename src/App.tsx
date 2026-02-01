import { useEffect, useState } from "react";
import { get } from "./services/http";
import type { BlogPost } from "./components/BlogPosts";

import fetchingDataImage from "./assets/data-fetching.png";
import BlogPosts from "./components/BlogPosts";
import ErrorMessage from "./components/ErrorMessage";

export type RawDataBlogPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function App() {
  const [posts, setPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts",
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = data.map?.((post) => ({
          id: post.id,
          title: post.title,
          text: post.body,
        }));

        setPosts(blogPosts);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  return (
    <main>
      <img
        src={fetchingDataImage}
        alt="Abstract illustration image depicting data fetching process."
      />

      {isFetching && <p id="loading-fallback">Fetching posts...</p>}
      {!isFetching && posts && <BlogPosts posts={posts} />}
      {!isFetching && error && <ErrorMessage text={error} />}
    </main>
  );
}

export default App;
