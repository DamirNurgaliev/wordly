import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const fetchTitles = async () => {
  const russianAlphabet = ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "и", "к", "л", "м", "н", "о",
    "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "э", "ю", "я"
  ]

  const file = fs.createWriteStream("test.txt");

  for (const letter of russianAlphabet) {
    const response = await axios.get(`https://lexicography.online/explanatory/ozhegov/${letter}/`);

    const html = response.data;
    const htmlData = cheerio.load(html);

    htmlData("section.a-list li").each((_id, el) => {
      if (htmlData(el).text().length === 5 && htmlData(el).text().slice(-1) !== "…") {
        file.write(htmlData(el).text() + "\n")
      }
    });
  }
};

// Print all tags in the console
fetchTitles()