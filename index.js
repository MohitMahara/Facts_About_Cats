import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8000;
const date = new Date();
let pageNo = "";
const factsPerPage = 5;

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong!");
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
    try {
        const response = await axios.get(`https://cat-fact.herokuapp.com/facts`);
        const result = response.data;
        const factsToShow = result.slice(0, factsPerPage);

        res.render("index.ejs", {
            year: date.getFullYear(),
            fact1: factsToShow[0].text,
            fact2: factsToShow[1].text,
            fact3: factsToShow[2].text,
            fact4: factsToShow[3].text,
            fact5: factsToShow[4].text,
        })

    } catch (error) {
        next(error);
    }
});

app.get("/nextPage", async (req, res, next) => {
    try {
        pageNo += 1;
        const response = await axios.get(
            `https://catfact.ninja/facts?page=${pageNo}`
        );
        const nextPageresult = response.data.data;
        const factsToShow = nextPageresult.slice(0, factsPerPage);

        res.render("index.ejs", {
            year: date.getFullYear(),
            fact1: factsToShow[0].fact,
            fact2: factsToShow[1].fact,
            fact3: factsToShow[2].fact,
            fact4: factsToShow[3].fact,
            fact5: factsToShow[4].fact,
        });
    } catch (error) {
        next(error);
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs", {
        year: date.getFullYear(),
    });
});

app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
});