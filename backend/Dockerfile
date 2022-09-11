# Load linux image ( with GPU support) for backend processes
FROM nvidia/cuda:11.0.3-base-ubuntu20.04
# Set working directory
WORKDIR /backend
# Install required linux packages
RUN apt-get update && apt-get install python3 pip -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install ffmpeg libsm6 libxext6  -y
# Copy file with required packages
COPY ./requirements.txt /requirements.txt
# Install required packages
RUN python3 -m pip install --no-cache-dir -r /requirements.txt
# Copy local folder into the working directory
COPY . .
# Run uvicorn server (FastAPI server)
CMD [ "python3", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload" ]
# Expose port to localhost
EXPOSE 8000