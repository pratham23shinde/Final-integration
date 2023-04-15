FROM openjdk:17
EXPOSE 9019
ADD ./target/g3-smtp-mail-service.jar g3-smtp-mail-service.jar
ENTRYPOINT [ "java", "-jar", "/g3-smtp-mail-service" ]