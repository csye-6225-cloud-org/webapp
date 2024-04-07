#!/bin/bash

cd /home/pkr-gcp-user/webapp
jq '.HOST = $newHos' --arg newHos 'DBHOSTTOREPLACE'  app/config/db.config.json > tmp.$$.json && mv tmp.$$.json app/config/db.config.json
jq '.PASSWORD = $newPas' --arg newPas 'DBPASSTOREPLACE'  app/config/db.config.json > tmp.$$.json && mv tmp.$$.json app/config/db.config.json
jq '.USER = $newUse' --arg newUse 'DBUSERTOREPLACE'  app/config/db.config.json > tmp.$$.json && mv tmp.$$.json app/config/db.config.json
jq '.DB = $newDb' --arg newDb 'DBDBTOREPLACE'  app/config/db.config.json > tmp.$$.json && mv tmp.$$.json app/config/db.config.json
jq '.project = $newProj' --arg newProj 'csye-6225-project-dev'  app/config/gcp.config.json > tmp.$$.json && mv tmp.$$.json app/config/gcp.config.json
jq '.topic = $newTopic' --arg newTopic 'verify_email'  app/config/gcp.config.json > tmp.$$.json && mv tmp.$$.json app/config/gcp.config.json
sudo systemctl restart csye6225
