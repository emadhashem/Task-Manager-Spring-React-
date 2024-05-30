FROM openjdk:17
VOLUME /tmp
EXPOSE 8088
ADD target/TaskManager-0.0.1-SNAPSHOT.jar appTM.jar

ENTRYPOINT ["java", "-jar", "appTM.jar"]