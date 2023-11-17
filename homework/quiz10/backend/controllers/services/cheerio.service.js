import cheerio from "cheerio";
import axios from "axios";

export class CheerioService {
  prefer;
  constructor(prefer) {
    this.prefer = prefer;
  }
  getOG = async () => {
    const ogObj = {};
    const result = await axios.get(this.prefer);
    const $ = cheerio.load(result.data);

    $("meta").each((index, el) => {
      if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
        const key = $(el).attr("property");
        const value = $(el).attr("content");
        ogObj[key] = value;
      }
    });
    return ogObj;
  };
}
