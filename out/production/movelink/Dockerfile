FROM openjdk:19

ENV ENVIRONMENT=prod

LABEL maintainer="katharina.stern@gmx.net"

EXPOSE 8080

ADD backend/target/movelink.jar movelink.jar

CMD ["sh", "-c", "java -jar /movelink.jar"]