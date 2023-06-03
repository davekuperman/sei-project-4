INSERT INTO users (email, password_hash, first_name, last_name) VALUES ('poop@poop.com', 'password_hash', 'Dave', 'Kuperman');

INSERT INTO recipes (user_id, recipe_name, ingredients, instructions, cooking_time, servings)
VALUES (
  1,
  'Apple Cinnamon Pastry',
  '[
    {"name": "Apples", "quantity": "2", "unit": "medium-sized"},
    {"name": "Sugar", "quantity": "1/4", "unit": "cup"},
    {"name": "Cinnamon", "quantity": "1", "unit": "teaspoon"},
    {"name": "Puff Pastry", "quantity": "1", "unit": "sheet"}
  ]',
  '[
    "Preheat the oven to 375°F (190°C).",
    "Peel and slice the apples.",
    "In a bowl, mix the sliced apples, sugar, and cinnamon.",
    "Roll out the puff pastry sheet and cut it into squares.",
    "Place a spoonful of the apple mixture onto each pastry square.",
    "Fold the pastry over the filling to form a triangle and seal the edges.",
    "Arrange the pastries on a baking sheet and bake for 20-25 minutes or until golden brown.",
    "Allow the pastries to cool before serving."
  ]',
  '40 minutes',
  4
);
