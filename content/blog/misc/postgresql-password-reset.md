---
title: PostgresQL - Setting up postgres on a local environment
date: "2019-11-24T20:59:03"
description: I will detail a short and easy way to get PostgresQL running on a Ubuntu based machine for local development.
---

## Purpose

Setting up a database for the first time is never any fun. In this short post I will detail how I have come to setup PostgresQL for local development environments.

### Quick Start

#### WARNING:

This will change all instances of /etc/postgresql/\*/main/pg_hba.conf auth options to 'trust' <br>

Proceed with caution:

```bash
git clone https://github.com/ParamagicDev/config-files.git ~/paramagic-config-files
cd ~/paramagic-config-files
./scripts/postgres-setup.sh
./scripts/postgres-pass-reset.sh

psql -U postgres

# This will drop you into a postgres instance as the admin
$ alter user postgres with password 'YOUR SNAZZY PASSWORD';
$ \q

# This will make postgres require a password in order
# to be instantiated
./scripts/postgres-md5-require.sh
```

### Explanation

Okay, I'm assuming you read the quick start, saw the warnings, and decided
to read a little more about whats happening in these scripts.

#### Installation scripts

##### [My PostgresQL scripts](https://github.com/ParamagicDev/config-files/tree/master/scripts)

The contents of these scripts was partially stolen from the [Official PostgresQL Dockerfile](https://github.com/docker-library/postgres/blob/4a82eb932030788572b637c8e138abb94401640c/12/Dockerfile)

So what does this script do?

Well first let me show you the contents.

```
#!/bin/bash

# postgres-setup.sh
pg_user="postgres"
pg_dir="/var/lib/postgresql"
pg_data="/var/lib/postgresql/data"

# Installs postgresql
sudo apt update && sudo apt install \
  postgresql postgresql-contrib postgresql-common libpq-dev -y

# Creates the postgres user and postgres group
sudo groupadd "$pg_user"
sudo useradd -r -g "$pg_user" --home-dir="$pg_dir" --shell=/bin/bash "$pg_user"

sudo mkdir -p "$pg_dir"
sudo chown -R "$pg_user":"$pg_user" "$pg_dir"

sudo mkdir -p "$pg_dir" && sudo chown -R "$pg_user":"$pg_user" "$pg_dir" && \
  sudo chmod 2777 /var/run/postgresql


# this 777 will be replaced by 700 at runtime (allows semi-arbitrary "--user" values)
sudo mkdir -p "$pg_data" \
  && sudo chown -R "$pg_user":"$pg_user" "$pg_data" \
  && sudo chmod 777 "$pg_data"bash
```

Basically, this script says:<br>

1. Download postgres from the apt repository (default debian based package manager)
   <br>

2. Then after downloading postgres, create a user for the postgres database named "postgres"
   <br>

3. Create the appropriate directories and change the read / write / execute properties of each directory based on the offical PostgresQL Dockerfile.
   <br>

In a nutshell, thats all that the script does.

Now, you can try logging into the database from the command line.

```bash
psql -U postgres
```

This probably will not work due to permissions set in a file called `pg_hba.conf`

For me, this file was located on my Ubuntu 18.10 & 19.04 machines in the location:

`/etc/postgresql/<version-number>/main/pg_hba.conf`

So heres where things get tricky. You may have previously setup a password youve forgotten, maybe theres something weird going on and you cant get into the database, anythings possible.

If you checked out the `pg_hba.conf file` you'll see a setup similar to this:

```conf
# Database administrative login by Unix domain socket
local   all             postgres                                trust

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
# IPv6 local connections:
host    all             all             ::1/128                 trust
# Allow replication connections from localhost, by a user with the
# replication privilege.
#local   replication     postgres                                trust
#host    replication     postgres        127.0.0.1/32            trust
#host    replication     postgres        ::1/128                 trust
```

### Links

#### [My config-files repo with postgres scripts](https://github.com/ParamagicDev/config-files/tree/master/scripts)

[PostgresQL Homepage](https://www.postgresql.org/)
[PostgresQL Dockerfile](https://github.com/docker-library/postgres/blob/4a82eb932030788572b637c8e138abb94401640c/12/Dockerfile)

[Where I found the sed scripts](https://enterprise.arcgis.com/en/server/10.3/cloud/amazon/change-default-database-passwords-on-linux.htm)

[How I figured out how to put multiple directories into a bash array](https://stackoverflow.com/questions/4494336/how-do-you-store-a-list-of-directories-into-an-array-in-bash-and-then-print-the)
