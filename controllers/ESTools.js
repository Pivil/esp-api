
var elasticsearch = require('elasticsearch');

class ESTools {
    client;

    constructor() {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
            trace: "trace",
            apiVersion: '7.1', // use the same version of your Elasticsearch instance
        });
    }

    ping() {
        this.client.ping({
            requestTimeout: 1000
        }, function (error) {
            if (error) {
                console.log('Error with ES !');
            } else {
                console.log('Connected to ES');
            }
        })
    }

    async getAll(index) {
        const response = await this.client.search({
            index: index,
            body: {
                query: {
                    match_all: {}
                }
            }
        })

        if (response.hits.total.value > 0) {
            return response.hits.hits;
        }
    }

    async findJobIdByName(job) {
        const response = await this.client.search({
            index: "job",
            _source: [
                "_id",
                "name",
            ],
            body: {
                query: {
                    match: {
                        "name": job
                    }
                }
            }
        })

        if (response.hits.total.value == 1) {
            return response.hits.hits;
        }
    }


    async addJob(data) {
        const response = await this.client.index({
           index: "job",
           body: {
               name: data.name
           }
        });
    }
}

module.exports = ESTools;