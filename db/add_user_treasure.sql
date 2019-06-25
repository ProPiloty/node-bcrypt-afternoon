INSERT INTO treasures
(image_url, user_id)
VALUES
(${treasureURL}, ${id});

SELECT * FROM treasures
WHERE user_id = ${id};