from mysql.connector import connect, Error
from mysql.connector.connection import MySQLConnection

# TODO Refactor code into SQLAlchemy for filling database
class Database:
    conn = None

    def __init__(self, host, user_name, user_pass, db):
        self.host = host
        self.user_name = user_name
        self.user_pass = user_pass
        self.db = db

    def db_connection(self) -> MySQLConnection:
        try:
            self.conn = connect(
                host=self.host,
                user=self.user_name,
                password=self.user_pass
            )
            print("MySQL Database connection successful")
        except Error as err:
            print(f'Error : {err}')

        return self.conn

    def create_database(self):
        """
        Create a database if it doesn't exist yet
        The db name is retrieved from a config file as well
        """
        query = f"CREATE DATABASE IF NOT EXISTS {self.db} DEFAULT CHARACTER SET 'utf8'"
        try:
            self.conn.cursor().execute(query)
            print('DB created !!!')
        except Error as err:
            print("Failed creating database: {}".format(err))
            exit(1)

    def fill_database(self, table_name, table_args, data):
        cursor = self.conn.cursor()
        use_query = f"USE {self.db}"
        create_table_args = ", ".join([" ".join(arg) for arg in table_args.items()])
        col_names = ", ".join(table_args.keys())
        create_table_query = f' CREATE TABLE IF NOT EXISTS {table_name} ({create_table_args})'
        try:
            cursor.execute(use_query)
            cursor.execute(create_table_query)
            for row in data.itertuples():
                values = ", ".join(row)
                print(row)
                cursor.execute(
                    f"INSERT INTO {table_name} ({col_names}) VALUES ({values})"
                )
                self.conn.commit()
        except Error as err:
            print("Failed populating the database: {}".format(err))
            exit(1)

    def add_foreign_key(self, table, fk, ref_table, ref_col):
        cursor = self.conn().cursor()
        query = (
            f"ALTER TABLE {table} ADD FOREIGN KEY ({fk}) REFERENCES {ref_table}({ref_col})"
        )
        try:
            cursor.execute(query)
            self.conn.commit()
        except Error as err:
            print("Failed adding the foreign key: {}".format(err))
            exit(1)

    def disconnect_db(self):
        """
        Close the database connection
        """
        self.conn.close()
        print('Succesfully disconnected.')
