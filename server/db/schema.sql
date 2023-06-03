DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS recipes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    user_id INT,
    recipe_name VARCHAR(255) NOT NULL,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
    cooking_time VARCHAR(50),
    servings INTEGER,
    CONSTRAINT fk_recipes_users FOREIGN KEY (user_id) REFERENCES users(id)
);