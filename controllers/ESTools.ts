import { response } from "express";

var elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    trace: "trace",
    apiVersion: '7.1', // use the same version of your Elasticsearch instance
});

var findAll = async(index: string)   => {
    const response = await client.search({
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

var findById = async(index: string, id: string)  => {
    const response = await client.search({
        index: index,
        body: {
            query: {
               match: {
                   _id: id
               }
            }
        }
    })

    if (response.hits.total.value > 0) {
        return response.hits.hits;
    }
}

var add = async(index: string, data: Object)  =>  {
    const response = await client.index({
        index: index,
        body: {
            data
        }
    });

    return response;
}

var updateById = async(index: string, id: string, data: Object)  => {
    const reponse = await client.update({
        id: id,
        index: index,
        body: {
            data
        }
    })

    return response;
}

var remove = async(index: string, id: string)  => {
    const reponse = await client.delete({
        id: id,
        index: index
    });

    return response;
}
module.exports = {
    findAll: findAll,
    findById: findById,
    add: add,
    updateById: updateById,
    remove: remove
};