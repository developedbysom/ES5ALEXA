const express = require("express");
const bodyParser = require("body-parser");
const nodefetch = require("node-fetch");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`
    <form action='/supplier' method="POST">
    <p>Enter Supplier and Field Name</p>
    <input name="supplier" autocomplete="off">
    <input name="fldName" autocomplete="off">
    <button>Submit</button>
    </form>
    `);
});
app.post("/supplier", async (req, res) => {
  var supplier = req.body.supplier;
  var fldName = req.body.fldName;

  switch (supplier) {
    case "sap":
      supplier = "SAP";
      break;
    case "talpa":
      supplier = "Talpa";
      break;
    case "panorama studios":
      supplier = "Panorama Studios";
      break;
    case "panoramastudios":
      supplier = "Panorama Studios";
      break;
  }
  switch (fldName) {
    case "webaddress":
      fldName = "WebAddress";
      break;
    case "phone":
      fldName = "Phone";
      break;
    case "email":
      fldName = "Email";
      break;
  }

  const results = dotenv.config();

  var username = results.parsed.userid;
  var passw = results.parsed.password;

  const SuppliersList = async function (supplier) {
    var url =
      "https://sapes5.sapdevcenter.com/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/Suppliers?$filter=(Name%20eq%20%27" +
      supplier +
      "%27)";
    const result = await nodefetch(url, {
      method: "GET",

      headers: {
        Authorization:
          "Basic " + new Buffer.from(username + ":" + passw).toString("base64"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const output = await result.json();

    const myJson = output.d.results[0];
    console.log(myJson);
    return myJson[fldName];
  };

  res.send({
    replies: [
      {
        type: "text",
        content:
          "The " +
          fldName +
          " of Supplier " +
          supplier +
          " is " +
          (await SuppliersList(supplier)),
      },
    ],
    conversation: {
      memory: { key: "value" },
    },
  });
});
app.listen(port, () => console.log("Listenning to Port" + port));
