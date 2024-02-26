#!/bin/bash

echo "Running scriptbuild.sh"
# yes | sudo yum -y update
# yes | sudo yum -y upgrade
# sudo setenforce 0

# echo "Installing postgres"
# yes | sudo dnf install postgresql-server
# yes | sudo postgresql-setup --initdb
# yes | sudo systemctl start postgresql
# yes | sudo systemctl enable postgresql
# yes | sudo systemctl status postgresql
# yes | sudo -u postgres psql -c "ALTER USER postgres with PASSWORD 'CloudDBPassword@321';"
# sudo sed -i 's/ident/md5/g' /var/lib/pgsql/data/pg_hba.conf
# sudo sed -i 's/peer/md5/g' /var/lib/pgsql/data/pg_hba.conf
# yes | sudo systemctl restart postgresql
# sudo cat /var/lib/pgsql/data/pg_hba.conf

echo "Installing node"
yes | sudo dnf module list nodejs
yes | sudo dnf module enable nodejs:20
yes | sudo dnf install nodejs
yes | sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yes | sudo yum install jq -y

echo "Setting up webapp"
sudo groupadd csye6225
sudo adduser csye6225 -g csye6225 --system --shell /usr/sbin/nologin
yes | sudo yum install unzip
sudo mkdir -m755 webapp
# sudo ls -l
yes | sudo unzip webapp.zip -d webapp
sudo cp webapp/csye6225.service /etc/systemd/system/csye6225.service
sudo chown -R csye6225:csye6225 webapp
cd webapp || exit

echo "Running webapp"
sudo npm ci
sudo systemctl daemon-reload
sudo systemctl start csye6225
sudo systemctl enable csye6225
sudo systemctl status csye6225
