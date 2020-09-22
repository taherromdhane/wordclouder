# set base image (host OS)
FROM python:3.8

# create working directory
WORKDIR /bundle

# copy files to working directory
COPY . .

# install dependencies
RUN pip install -r requirements.txt

# expose application port 
EXPOSE 5000

# command to run on container start
CMD [ "python", "./run.py" ]