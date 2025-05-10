const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";
const search = "pc gamer montado com rx6600";

const execute = async () => {
  const browser = await pup.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(url);

  await page.waitForSelector("#cb1-edit");

  await page.type("#cb1-edit", search);

  await Promise.all([page.waitForNavigation(), page.click(".nav-search-btn")]);

  const links = await page.$$eval(".poly-component__title-wrapper > a", (el) =>
    el.map((link) => link.href)
  );

  console.log("Encontrados:", links.length);

  await browsePages(links, page);

  await browser.close();
};

async function browsePages(links, page) {
  for (const link of links) {
    await page.goto(link);
    await page.waitForSelector(".ui-pdp-title");

    const title = await page.$eval(".ui-pdp-title", (title) => title.innerText);
    const price = await page.$eval(
      ".andes-money-amount__fraction",
      (price) => price.innerText
    );
    const infosProduct = await page.$$eval(
      ".ui-pdp-variations__title span",
      (spans) => {
        const result = [];
        for (let i = 0; i < spans.length; i += 2) {
          const label = spans[i].innerText.trim();
          const value = spans[i + 1] ? spans[i + 1].innerText.trim() : "";
          result.push({ [label]: value });
        }
        return result;
      }
    );
    const vendedor = await page.evaluate(() => {
      const el = document.querySelector(".ui-pdp-seller span:nth-of-type(2)");
      if (!el) return null;
      return el.innerText;
    });

    const obj = {
      title,
      price,
      infosProduct,
      link,
      vendedor: vendedor || "Não informado",
    };

    console.log(obj);
  }
}

execute();
