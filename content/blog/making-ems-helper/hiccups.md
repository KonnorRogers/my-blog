---
title: Making EMS Helper - Hiccups
date: "2019-12-18T20:48:45"
description: Detailing a few of the issues faced when attempting to populate the database.
---

## Aggregating the data

Unfortunately, as detailed in my [previous post](https://paramagicdev.github.io/my-blog/making-ems-helper/introduction)
populating the database will not be as easy as expected. Upon further inspection,
the database provided at [https://hifld-geoplatform.opendata.arcgis.com/datasets/hospitals/geoservice](https://hifld-geoplatform.opendata.arcgis.com/datasets/hospitals/geoservice) does not have a complete dataset. For example,
it only includes Westerly Hospital and the VA - Medical Center. As a result, I had to rethink
how to aggregate the data.

## Using Wikipedia

Wikipedia appears to have a semi-complete list. May be best to look into this as a means
to populate the database.
