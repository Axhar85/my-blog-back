const express = require("express");
const bodyparser = require("body-parser");
const {MongoClient} = require("mongodb")

const app = express();
app.use(bodyparser.json());

const withDB = async(operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        const db = client.db("my-data");
            operations(db);
            client.close();
        } catch(error) {
            res.status(500).json({message: 'Error connecting to db', error});
        }
}

app.get('/api/articles/:name', async(req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
    
    const articlesInfo = await db.collection('articles')
    .findOne({name : articleName})
        res.status(200).json(articlesInfo);
    }, res);
     
});

app.post("/api/articles/:name/add-comments", (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
})


app.listen(8000, () => console.log("Listening on port 8000"));