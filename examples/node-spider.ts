import axios from "axios";

(async () => {
  const res = await axios.get("https://preview.pro.ant.design/#");
  console.log(res.data);
})();
