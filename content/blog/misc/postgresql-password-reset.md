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

### Links

#### [My config-files repo with postgres scripts](https://github.com/ParamagicDev/config-files/tree/master/scripts)

[PostgresQL Homepage](https://www.postgresql.org/)
[PostgresQL Dockerfile](https://github.com/docker-library/postgres/blob/4a82eb932030788572b637c8e138abb94401640c/12/Dockerfile)

[Where I found the sed scripts](https://enterprise.arcgis.com/en/server/10.3/cloud/amazon/change-default-database-passwords-on-linux.htm)

[How I figured out how to put multiple directories into a bash array](https://stackoverflow.com/questions/4494336/how-do-you-store-a-list-of-directories-into-an-array-in-bash-and-then-print-the)
