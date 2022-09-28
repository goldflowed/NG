FROM openjdk:11
WORKDIR /var/jenkins_home/workspace/deploy-test/backend/NG
RUN pwd
RUN ls -al
RUN chmod +x gradlew
RUN ./gradlew clean build
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} ng_springboot.jar
ENTRYPOINT ["java", "-jar", "/ng_springboot.jar"]