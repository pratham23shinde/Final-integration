FROM openjdk:17
EXPOSE 9015
ADD ./target/g3-gateway-service.jar g3-gateway-service.jar
ENTRYPOINT [ "java", "-jar", "/g3-gateway-service.jar" ]