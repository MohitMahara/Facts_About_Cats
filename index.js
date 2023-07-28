import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8000;
const date = new Date();
let pageNo = 1;


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));


app.get("/", async (req, res) => {

    try {
           const response = await axios.get(`https://cat-fact.herokuapp.com/facts`);
           const result = response.data;

        res.render("index.ejs", {
            year: date.getFullYear(),
            fact1 : result[0].text,
            fact2 : result[1].text,
            fact3 : result[2].text,
            fact4 : result[3].text,
            fact5 : result[4].text,
        });


    } catch(error){
       console.log(error);
        }
});

app.get("/nextPage",async (req, res) =>{

    try {
        pageNo += 1;
        const response = await axios.get(`https://catfact.ninja/facts?page=${pageNo}`);
        const nextPageresult = response.data.data;
        // console.log(nextPageresult);

     res.render("index.ejs", {
         year: date.getFullYear(),
         fact1 : nextPageresult[0].fact,
         fact2 : nextPageresult[1].fact,
         fact3 : nextPageresult[2].fact,
         fact4 : nextPageresult[3].fact,
         fact5 : nextPageresult[4].fact,
     });


 } catch(error){
    console.log(error);
     }

})


app.get("/about", (req, res) =>{
    res.render("about.ejs", {
        year: date.getFullYear(),
    });
})


app.listen(PORT, () => {
    console.log(`listening to the port ${PORT}`);
})