FROM node:16.17.0
WORKDIR /var/jenkins_home/workspace/deploy-test/frontend
COPY package*.json /var/jenkins_home/workspace/deploy-test/frontend/
RUN npm install
COPY ./ /var/jenkins_home/workspace/deploy-test/frontend/
RUN npm run build
RUN npm install -g serve
ENTRYPOINT ["serve", "-s", "build"]
