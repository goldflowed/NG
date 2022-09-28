FROM openjdk:11
RUN ls -al /var/
RUN chmod +x gradlew
RUN ./gradlew bootJar
ARG JAR_FILE=/build/libs/*.jar
COPY ${JAR_FILE} ng_springboot.jar
ENTRYPOINT ["java", "-jar", "/ng_springboot.jar"]