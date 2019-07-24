## Get database size in MB

Run the following script to get the size of your databases in MB.

```sql
SELECT table_schema "DB Name",
     ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "DB Size in MB" 
FROM information_schema.tables 
GROUP BY table_schema; 
```
