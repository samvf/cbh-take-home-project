# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1st Ticket -
Create the table for the Agents, with the following fields:
- id (primary key)
- facility_id (foreign key)
- custom_id (string)
- name

Create the table for the Facility, with the following fields:
- id (primary key)
- name

Create the table for the Shifts, with the following fields:
- id (primary key)
- agent_id (foreign key)
- facility_id (foreign key)
- start_time
- end_time

This would take 2 hours to create the tables, migrations and the seeders.
Can be done using Postgres, with Prisma as ORM.

2st Ticket -
Create the basic CRUD for Agent, Facilities and Shifts.
We can use NestJS, so we can quickly create the endpoints and the DTOs to validate the data.
This would take 2 hours to create the endpoints, DTOs and the validations, since we already have the tables created and NestJS can be used to create the endpoints quickly.
And more one hour to create the unit/e2e tests for the endpoints.

3st Ticket -
Create a new endpoint for the desired getShiftsByFacility function, that would return the shifts from a facility.
We can easily create this endpoint querying with Prisma.

We can query the shifts table by the facility id, and join the agents table to get the agent metadata, querying by the current date minus 3 months, to get the shifts from the last 3 months. Assuming that the shifts are saved in UTC and the shift start and finish at the same day, otherwise we would need to query the shifts from the last 3 months and 1 day, to get the shifts that finish in the next day.

It would take 1 hour to create the endpoint, and 1 hour to create the unit/e2e tests.

4st Ticket -
Create a new endpoint for the desired generateReport function, that would return the report from a facility.
Which accepts custom_id as a query param, and returns the shifts from the last 3 months, with the agent metadata, and the total hours worked by the agent.
We can reuse the getShiftsByFacility use-case to get the shifts from the facility, and then create the report using the data from the shifts.
After that, we can create a custom PDF using the library pdf-make using their playground to create the PDF.
After creating the PDF schema in pdf-make, we can use the library to generate the PDF with the data from the shifts.
Then, convert the PDF to base64 and return it to the user to download the PDF and also upload it to S3, saving the link into a documents in the database.

It would take 2 hours to create the endpoint, 1 hour to create the unit/e2e tests and 1 hour to create the PDF schema and generate the PDF.

5st Ticket -
Deploy the application to AWS using ECS, and create the CI/CD pipeline using Github Actions.
For ECS, we can create a cluster, a service and a task definition, and then deploy the application to the cluster.
For the CI/CD pipeline, we can create a Github Action that would run the unit tests, and if they pass, deploy the application to the cluster.
It would take 2 hours to create the CI/CD pipeline, and 1 hour to deploy the application to AWS.





