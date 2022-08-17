# create volume

docker volume create --driver local --opt device=$HOME/db_data --opt o=bind db_data --opt type=none