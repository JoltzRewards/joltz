POST http://localhost:5001/trubit-341013/us-central1/deploy
{
	"name": "Big Axe",
	"slug": "big-axe",
	"image": "https://example.com",
	"description": "a Big Axe"
}

HTTP/1.1 200
[Asserts]
jsonpath "$.txid" exists
jsonpath "$.nonce" exists
jsonpath "$.contract" exists

[Captures]
nonce: jsonpath "$.nonce"

GET http://localhost:5001/trubit-341013/us-central1/metadata?id={{nonce}}

HTTP/1.1 200
[Asserts]
jsonpath "$.external_url" == "https://trubit.tech/external/{{nonce}}"
jsonpath "$.image" == "https://example.com"
jsonpath "$.contract_type" == "default"
jsonpath "$.name" == "Big Axe"
jsonpath "$.description" == "a Big Axe"
jsonpath "$.collection" == "Big Axe"