
# ElasticSearch Example

## Start  
```bash
docker-compose up
npm run dev
```


## ElasticSearch
http://localhost:9200

## Kibana
http://localhost:5601

## dev tools
http://localhost:5601/app/dev_tools#/console


## Elasticsearch Node.js client
https://github.com/elastic/elasticsearch-js

## ElasticSearch CRUD
https://www.elastic.co/guide/en/elasticsearch/reference/current/full-text-queries.html

POST
```bash
// ドキュメントだけつくる
PUT [:index_name]
```
POST & PUT
```bash
// 自動でIDが生成される
POST [:index_name]/_doc
{
  "field": "value"
}
```
```bash
// 自分でIDを決める。_docは上書きされる
PUT [:index_name]/_doc/[:id]
{
  "field": "value"
}
```

```bash
// _createを使うと上書きされない
PUT [:index_name]/_create/[:id]
{
  "field": "value"
}
```
GET
```bash
GET [:index_name]/_doc/[:id]
```



