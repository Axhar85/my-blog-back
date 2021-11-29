const express = require("express");
const bodyparser = require("body-parser");

const articlesInfo = {
    "learn-react": {
        comments: [],
    },
    "learn-node": {
        comments: [],
    },

    "my-thoughts-on-learning-react": {
        comments: [],
    },



}

const app = express();
app.use(bodyparser.json());

app.post("/api/articles/:name/add-comments", (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
})


app.listen(8000, () => console.log("Listening on port 8000"));