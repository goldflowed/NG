FROM openjdk:11
RUN pwd
RUN ls -al
WORKDIR /var/jenkins_home/workspace/deploy-test/backend/NG
COPY ./ /var/jenkins_home/workspace/deploy-test/backend/NG
RUN ls -al
RUN chmod +x gradlew
RUN ./gradlew clean build
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} ng_springboot.jar
RUN ls -al
ENTRYPOINT ["java", "-jar", "/ng_springboot.jar"]