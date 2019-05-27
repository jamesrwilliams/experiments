# Redis 

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams.

https://redis.io/

## Useful Redis commands

- `SET` - Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type. Any previous time to live associated with the key is discarded on successful SET operation. E.g. `SET connections 10`
- `DEL` - Delete a key value pair (including it's associated data).
- `INCR` - Increment the key value if it's a number.
- `SETNX` - Only set if key does not exist already.

## Help

- Try Redis (old but works) http://try.redis.io/
- Node Redis - https://github.com/NodeRedis/node_redis
