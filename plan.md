# Microservices

- each of these service should include

## Lottery Service

- the responsibilies are,

  - handles results, associate results with specific templates
  - provide filtered results
  - handles checkers
  - handle checker executions agains given lottery data. each checker has template for the return results data type.

- talks with the api gateway and orchestrator

## Template Service

- the responsibilities are,

  - handle all template savings
  - handle the rendring of html templates for pdf, checker results, and raw results
  - render based on the given data.
  - use rendring engine to render

- talks with the api gateway and orchestrator

## Render Service

- the responsiblities are,

  - takes the html page and generate the output as png or pdf
  - process the png to double side and A4 size and return

- talks with the api gateway and orchestrator

## Auth Service

- the responsibilities are,
  - responsible for user registration, and login based on role
  - issuing the jwt token with role embeded
  - add password hashing
  - work as the identity provider for the api gateway
  - also verify the token. this functionality mainly used by the api gateway
  - act as the identity provider for the api gateway
- talks with the api gateway and orchestrator service
- the database should be a mysql database.

## Analytics Service

- the responsibilies are,

  - generate statistical reports
  - most frequent winning numbers
  - seller performance
  - dashboard visualization

- mainly handled by the orchestrator service

## Api Gateway Service

- the responsibilities are,

  - single public entrypoint
  - route requests to internal services (to orchestrator or individual services)
  - validates the JWT tokens using the auth service
  - role-based access control
  - cors, logging, security headers

- talks with authservice, orchestrator and safe microservice endpoints
- can use tools like NGINX + Node.js

## Seller Service

- the responsibilites are,

  - manage lottery sellers with there name, nic, etc
  - manage there orders for given date
  - handles saving of each seller daily exchanges
  - every seller has a bill with exchanged lotteries, paied price and for what lottery order. each order has set of lottery arrangements
  - every bill changed lotteries has barcode, additional data, win prize

- talks with the api gateway and orchestrator service
- uses relational dbms

## Orchestration Service

- the responsibilities are,

  - handles business workflows using saga
  - coordinates multi-service calls
  - implements the orchestrated saga pattern

- talks with auth service and other services. auth service may used for role validation
- handles the authentication of the requests based on the role of the user

## QR Service

- the responsibilites are,

  - stores the regex for entier qr. each qr has id. so front-end can fetch each qr regex and check weather the today lottery match with that qr or not.
  - each regex has js script that parse that qr data and creates the lottery object for that.
  - create record has created date, description about that regex and what is the object structure of lottery
  - each raw should have a field for lotteryId and name to identity which for which

- talks with the api gateway and orchestrator service
- uses mongodb database or redis like simple database

## Lottery Supplier (to be)
