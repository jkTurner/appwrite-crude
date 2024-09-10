"use client"

import { useEffect, useState } from "react";
import EditButton from "./components/ui/EditButton";
import DeleteButton from "./components/ui/DeleteButton";

interface postType {
  $id: string;
  topic: string;
  details: string;
}

export default function Home() {

  const [posts, setPost] = useState<postType[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPost(data.documents);
        
      } catch (error) {
        console.log("Error: ", error);
        setError("Failed to load posts, please try reloading the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      setPost((prevPosts) => prevPosts?.filter((i) => i.$id !== id));
    } catch (error) {
        setError("Failed ot delete the post, please try again.");
    }
  }

  return (
        <div className="max-w-[100%] flex-grow">
            <div className="max-w-[1280px] mx-auto px-5">

              { error && <p className="text-red-500">{error}</p>}
              { isLoading ? (<p>Loading Posts...</p>) : posts?.length > 0 ? (
                posts?.map((post) => (
                  <div 
                    className="my-2 bg-[var(--bgSub)] px-5 py-3 rounded-lg flex flex-col gap-2 shadow-md"
                    key={post.$id}
                  >
                    <h2>{post.topic}</h2>
                    <p className="text-sm font-light">{post.details}</p>
                    <div className="flex flex-row gap-2 w-[100%] justify-end items-center">
                      <EditButton id={post.$id} />
                      <DeleteButton handleDelete={() => handleDelete(post.$id)} />
                    </div>
                  </div>
                ))

              ) : <p>No posts found</p>
            } 

            </div>
        </div>
  );
}
