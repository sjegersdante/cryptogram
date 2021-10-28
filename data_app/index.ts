const express = require("express");
const app = express();
const ejs = require("ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("port", 3000);
// id = dante1
//paswoord = VMkGCIaEYD8A24F4
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://dante1:VMkGCIaEYD8A24F4@cluster0.t1dzq.mongodb.net";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/*client.connect(() => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});*/

app.get("/cryptos", (req: any, res: any) => {
  res.render("cryptos", {});
});

const dbName = "sample_training";

interface Data {
  _id?: number;
  name: string;
}

var opgaven_array: Array<string>;
opgaven_array = [];

const cryptos: Array<Data> = [
  { name: "het effect van het eerste glas wijn" },
  { name: "doordacht en steekhoudend" },
  { name: "zoetebek" },
  { name: "dubbele schroef, fosburyflop, salto" },
  { name: "Vroeger, toen de fietsen nog van …" },
];

(async () => {
  try {
    await client.connect();
    let list = await client.db().admin().listDatabases();

    //console.log(list);
    //await client.db(dbName).collection("crypto").deleteMany({});
    //await client.db(dbName).collection("crypto").insertMany(cryptos);
    var opgave: string = "";

    let result: Data[] = await client
      .db(dbName)
      .collection("crypto")
      .find({ "oud fruit": String })
      .toArray();
    for (let i = 0; i < result.length; i++) {
      opgave += [result[i]];
      opgaven_array.push(result[i].name.toString());
      // console.log(result[i]);
    }

    cryptos.push(opgave.toString);
    for (let i = 0; i < result.length; i++) {
      //  console.log(opgaven_array[i]);
      //console.log(result[i]);
      // console.log(cryptos[i]);
      console.log(opgaven_array[i]);
    }
    console.log(opgaven_array);
    console.log("-------");
    //console.log(opgave);
  } catch (e) {
    //console.log(e);
  } finally {
    await client.close();
  }
})();

app.get("/", (req: any, res: any) => {
  res.render("landingPage", { cryptos });
});

app.get("/cryptos", (req: any, res: any) => {
  res.render("cryptos", { cryptos });
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);
