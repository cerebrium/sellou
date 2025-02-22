import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

type Comment = {
  user_id: number;
  name: string;
  email: string;
  comment: string;
  created_at: string;
};

type Post = {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
};

type PostResponse = [[Post, Comment[]]];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(4);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  const fetchUserData = async () => {
    // Replace with API call

    try {
      const user = await fetch(`http://localhost:3000/users/${currentUser}`);
      const j_user: User = await user.json();

      const posts = await fetch(`http://localhost:3000/posts/${currentUser}`);
      const j_posts: PostResponse = await posts.json();

      // Format the data to fit
      const posts_to_render: Post[] = [];
      for (const [post, comments] of j_posts) {
        const inner_post: Post = {
          ...post,
          comments,
        };

        posts_to_render.push(inner_post);
      }

      setUser(j_user);
      setPosts(posts_to_render);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectUser = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    setCurrentUser(id);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      {user && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="mb-6 p-4 border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-gray-700 mt-2">{post.content}</p>

            <div className="mt-4">
              <h4 className="text-md font-semibold">Comments</h4>
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div
                    key={comment.user_id}
                    className="mt-2 p-2 border rounded-lg"
                  >
                    <p
                      className="text-gray-900 font-medium hover:text-blue-500 cursor-pointer"
                      onClick={(e) => handleSelectUser(e, comment.user_id)}
                    >
                      {comment.name} ({comment.email})
                      <p className="text-gray-600">{comment.comment}</p>
                    </p>
                    <p className="text-xs text-gray-400">
                      {comment.created_at}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts found.</p>
      )}
    </div>
  );
};

export default App;
