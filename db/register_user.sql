INSERT INTO users
(is_admin, username, hash)
VALUES
(${isAdmin}, ${username}, ${hash})
RETURNING id, is_admin, username;