FROM node:8.11.1

# ENV NODE_PATH=/usr/local/lib/node_modules/
RUN npm install -g mocha



#WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install

# Bundle app source
#COPY ./ ./

# Maybe we could construct the images needes inside the container
# from this file. All we need to provide is the Dockerfiles.

# Define exposed port
#EXPOSE 3000

# CMD ["node", "src/app.js"]
CMD ["/bin/bash"]
