# Use the official Python image from the Docker Hub
FROM python:3.10

# Make a directory for our application
WORKDIR /app

# Install required system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        gcc \
        g++ \
        libgl1-mesa-glx \
        libglib2.0-0 \
        procps \
        && rm -rf /var/lib/apt/lists/*

RUN pip install torch torchvision
RUN pip install 'git+https://github.com/facebookresearch/detectron2.git'

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install required python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory into the container
COPY FootABC /app
# COPY hkaa/static /app/hkaa/static
# COPY hkaa/templates /app/hkaa/templates
# COPY hkaa/images /app/hkaa/images
# COPY hkaa/js/index.js /app/hkaa/js/index.js
# COPY hkaa/css/index.css /app/hkaa/css/index.css
# COPY hkaa_server/columns /app/columns

# Make port 9000 available to the world outside this container
EXPOSE 9000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9000"]

