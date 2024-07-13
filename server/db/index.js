const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://daehyunj1997:Aa98210518.@jd-md.cmwrcxz.mongodb.net/")
  .then(() => console.log("Connected MongoDB"))
  .catch((e) => console.log(e));
