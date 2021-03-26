const express = require('express')
const app = express()
const esTools = require('../controllers/ESTools');
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/jobIdByName/:jobName', async function (req: any, res: any) {
  var es = new esTools();
  res.send({res: await es.findJobIdByName(req.params.jobName)});
})

app.get('/:index', async function (req: any, res: any) {
    var result = await esTools.findAll(req.params.index);
    res.send({result: result});
})

app.post('/job', async function (req: any, res: any) {
    var es = new esTools();
    var data = req.body;
    
    await es.addJob(data);
})
 
app.listen(3000)