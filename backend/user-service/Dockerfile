FROM openjdk:17

WORKDIR /micro-service



COPY target/*.jar app.jar

EXPOSE 9001

CMD [ "java","-jar","app.jar" ]