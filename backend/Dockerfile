FROM python:3.8

WORKDIR /backend

COPY ./requirements.txt /requirements.txt

RUN pip install --no-cache-dir --upgrade -r /requirements.txt

COPY . .

# CMD ["python", "main.py"]
CMD [ "python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]