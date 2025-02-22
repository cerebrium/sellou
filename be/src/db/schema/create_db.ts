const enable_foreign_keys = `
    PRAGMA foreign_keys = ON
`;

const create_users = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  )`;

const posts = `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;

const comments = `
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
  )
`;

const add_users = `
  -- Insert users
  INSERT INTO users (name, email) VALUES
  ('Alice Johnson', 'alice@gmail.com'),
  ('Bob Smith', 'bob@gmail.com'),
  ('Charlie Brown', 'charlie@gmail.com'),
  ('Main User', 'main_user@gmail.com');
`;

const add_posts = `
 -- Insert posts
  INSERT INTO posts (user_id, title, content) VALUES
  (1, 'Alice Post', 'This is a first post content.'),
  (2, 'Bob Shares an Update', 'Bob has some interesting news to share.'),
  (3, 'Charlie Rants About Something', 'Charlie is ranting again!'),
  (4, 'The moon is made of cheese', 'Everyone knows the moon is made of cheese, that is why people want to vacation there');
`;

const add_comments = `
-- Insert comments
  INSERT INTO comments (user_id, post_id, comment) VALUES
  (2, 1, 'Nice post, Alice!'),
  (3, 1, 'Interesting thoughts.'),
  (1, 2, 'Great update, Bob!'),
  (3, 2, 'Looking forward to more.'),
  (1, 3, 'Haha, classic Charlie!'),
  (1, 4, 'Grommit is an undervalued member of society');

`;

export const scripts = [
  enable_foreign_keys,
  create_users,
  posts,
  comments,
  add_users,
  add_posts,
  add_comments,
];
