FROM openjdk:17
EXPOSE 9013
ADD ./target/g3-auth0-service.jar g3-auth0-service.jar
ENTRYPOINT [ "java", "-jar", "/g3-auth0-service.jar" ]