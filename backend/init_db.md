# Initializing the database

## 1. Create external volume
> Creating the target folder may be necessary
```bash
docker volume create --opt device=$HOME/db_data --opt o=bind db_data --opt type=none
```
## 2. Build containers

```bash
docker compose up --build
```

## 3. Enter into the db container

```bash
docker exec -it db bash
```

## 4. Connect to the database

```bash
mysql -u$MYSQL_USER -p$MYSQL_PASSWORD
```

## 5. Initialize the database

```bash
python database.py
```