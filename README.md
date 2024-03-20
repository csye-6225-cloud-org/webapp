# webapp

## Backend services for CSYE-6225 Network Structures and Cloud Computing assignments

## Prerequisites for building and deploying your application locally-  
1) Node.js v20.11.0 must be installed (https://nodejs.org/en/download)  
2) Postgres v16.1 must be installed (https://www.postgresql.org/download/)  
3) Google Cloud SDK 463.0.0 (gcloud) must be installed to run commands on GCP
4) Packer v1.10.1 must be installed

## Build and Deploy instructions for the web application-
1) Navigate to inside webapp folder
2) Add DB auth details to app/config/db.config.json
3) In cmd, run "npm i"
4) In cmd, run "npm run dev"

## APIs enabled on GCP
1) Compute Engine API
2) OS Login API
3) Service Networking API
4) Cloud Logging API
5) Stackdriver Monitoring API

## Setting up authorization for gcloud
1) Create a service account for the GCP project
2) Grant the service account the roles Compute Engine Instance Admin (v1) and Service Account User
3) Generate json credentials for the service account
4) Move it to the webapp folder and rename it gcp-creds.json

## Packer build  instructions for the web application-
1) Run packer init .
2) Run packer fmt .
3) Run zip -r webapp.zip ./
4) Run packer validate .
5) Run packer build .
