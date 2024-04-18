# NoteApp


### Overview
Fullstack application that allow users to create, edit and delete notes
Notes belong to the user that created it, users can register new account, then after email verfication they can log in to their account

Technology used:
  * Java
  * Typescript
  * Spring boot
  * Angular

Backend server authorizies api requests with JWT token that have a subject of authenticated user

### Instalation

To install project on your own machine you have to install docker, and docker-compose
then you have to create .env file and specify enviroment variables described in .env-template file

to run project run
$ docker-compose -f docker-compose-production.yml up -d


