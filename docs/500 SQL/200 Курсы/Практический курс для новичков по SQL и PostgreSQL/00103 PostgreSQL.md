---
title: PostgreSQL
draft: false
tags:
  - SQL
  - БД
  - СУБД
  - MySQL
info:
---
### PostgreSQL

|                  | Name                          | bytes    | description                          | range                            |
| ---------------- | ----------------------------- | -------- | ------------------------------------ | -------------------------------- |
| Integral Numbers | smallint                      | 2        | small-range integer                  | 2^16                             |
|                  | integer                       | 4        | typical choice for integers          | 2^32                             |
|                  | bigint                        | 8        | large-range integer                  | 2^64                             |
| Real<br>Numbers  | decimal/numeric               | variable | user-specified precision, exat       | +- 3/4 * 10^ 38 to + 3.4 * 10^38 |
|                  | real/float4                   | 4        | user-specified precision, inexact    | 6 decimal digits precision       |
|                  | double precision/float8/float | 8        | user-specified precision, inexact    | 15 decimal digits precision      |
| Integral Numbers | smallserial                   | 2        | autoincrementing small-range integer | 1 to 32.767                      |
|                  | serial                        | 4        | autoincrementing mid-range integer   | 1 to 2.147.483.647               |
|                  | bigserial                     | 8        | autoincrementing large-range integer | 1 to 9.223.372.036.854.775.807   |
| Characters       | char                          | variable | fixed-length character string        | based on encoding                |
|                  | varchar                       | variable | fixed-length character string        | based on encoding                |
|                  | text                          | variable | fixed-length character string        | based on encoding                |
| Logical          | Boolean/bool                  | 1        | used in logic                        | true/false                       |
| Temporal         | date                          | 4        | stores only date                     | 4713 B.C. -> 294.276AD           |
|                  | time                          | 8        | stores only time                     | 00:00:00 -> 24:00:00             |
|                  | timestamp                     | 8        | stores date & time                   | 4713 B.C. - 294.276 AD           |
|                  | interval                      | 16       | stores difference between timestamps | -178.000.000 +178.000.000        |
|                  | timestamptz                   | 8        | stores a timestamp + timezone        | 4713 B.C. 294.276AD + tz         |
PostgreSQL поддерживает и другие типы данных:
- Arrays,
- JSON,
- XML,
- Геометрические типы и др. спец типы,
- Custom-типы,
- Null.