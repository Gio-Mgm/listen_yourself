# Listen Yourself
## Prerequesites
## Setup
### local developpement
+ Clone the repository
+ Setup environment :
  + at the root of the repository :
    ```bash
    conda env create -p ./env python==3.8.5
    conda init bash
    ```
    > Closing the terminal and opening a new one can be necessary here
    ```bash
    conda activate ./env
    conda install -c anaconda opencv # Faced lot of issues with the opencv-python package from pip
    pip install -r requirements.txt
    ```
+ Docker deployement:
  + create external volume :
  ```bash
  docker volume create --driver local --opt device=$HOME/db_data --opt o=bind db_data --opt type=none
  ```
  + docker compose up --build