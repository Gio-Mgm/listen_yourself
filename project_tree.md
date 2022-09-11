📦backend \
 ┣ 📂dp_models &rarr; saved models\
 ┣ 📂test pytest\
 ┣ 📜Dockerfile &rarr; for backend container\
 ┣ 📜database.py &rarr; Initialize the database\
 ┣ 📜predict.py &rarr; Functions for predicting\
 ┣ 📜main.py &rarr; API\
 ┣ 📜models.py &rarr; Defines database structure\
 ┣ 📜requirements.txt &rarr; Python required packages\
 ┣ 📜schemas.py &rarr; Pydantic's schemas to communicate with the database\
 ┗ 📜services.py &rarr; Creates queries for the databases\
 📦frontend \
 ┣ node_modules \
 ┣ 📂public &rarr; public assets\
 ┣ 📂src \
 ┃ ┣ 📂components &rarr; Contains custom react components\
 ┃ ┃ ┣ 📂vizualization &rarr; jsChart components\
 ┃ ┣ 📂fonts \
 ┃ ┣ 📂pages &rarr; Main "pages" (still a monopage app)\
 ┃ ┣ 📂utils &rarr; utilities functions for javascript\
 ┃ ┣ 📜App.jsx &rarr; Starting point of the React application\
 ┃ ┣ 📜index.css \
 ┃ ┣ 📜index.html \
 ┃ ┗ 📜index.js \
 ┣ 📜.babelrc \
 ┣ 📜.dockerignore \
 ┣ 📜.env \
 ┣ 📜Dockerfile &rarr; for frontend container \
 ┣ 📜package.json &rarr; js required dependencies \
 ┗ 📜webpack.config.js \
📜.gitignore\
📜docker-compose.yml &rarr; Compose file\
