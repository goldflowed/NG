FROM openjdk:11
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} ng_springboot.jar
ENTRYPOINT ["java", "-jar", "/ng_springboot.jar"]
