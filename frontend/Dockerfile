FROM node:16.17.0 as build-stage
WORKDIR /var/jenkins_home/workspace/deploy-test/frontend
COPY package*.json /var/jenkins_home/workspace/deploy-test/frontend/
RUN npm install
COPY ./ /var/jenkins_home/workspace/deploy-test/frontend/
RUN npm run build
# RUN npm install -g serve
# RUN mkdir ./build
# COPY ./build ./build
# ENTRYPOINT ["serve", "-s", "build"]

FROM nginx:stable-alpine
COPY --from=build-stage /var/jenkins_home/workspace/deploy-test/frontend/build /usr/share/nginx/html
COPY --from=build-stage /var/jenkins_home/workspace/deploy-test/frontend/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
