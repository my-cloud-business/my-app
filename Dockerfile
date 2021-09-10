FROM openjdk:16-alpine
ARG MAIN_JAR
ARG MAIN_CLASS
ARG MAIN_JAR_TYPE
ENV MAIN_JAR $MAIN_JAR
ENV MAIN_JAR_TYPE $MAIN_JAR_TYPE
ENV MAIN_CLASS $MAIN_CLASS

EXPOSE 8080
RUN apk update && apk upgrade && addgroup --system java && adduser --system java && adduser java java
USER java:java
COPY ./target/$MAIN_JAR.$MAIN_JAR_TYPE main.jar

CMD ["main.jar"]

