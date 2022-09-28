FROM openjdk:11
RUN pwd
RUN ls -al
WORKDIR /var/jenkins_home/workspace/deploy-test/backend/NG
RUN chmod +x gradlew
RUN ./gradlew clean build
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} ng_springboot.jar
ENTRYPOINT ["java", "-jar", "/ng_springboot.jar"]