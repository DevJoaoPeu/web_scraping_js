const readline = require("readline");
const { MercadoLivre } = require("./mercado_livre/index.js");
const pup = require("puppeteer");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `Qual deseja rodar?
     1 - Mercado Livre, 
     2 - Amazon, 
     3 - Pichau,
     4 - Kabum,
     5 - Sair ------> `,
  (typeSite) => {
    if (typeSite === "5") {
      r1.close();
    } else {
      paramSeach(typeSite);
    }
  }
);

function paramSeach(typeSite) {
  rl.question("Qual seria a sua busca? --> ", (paramSeach) => {
    quantityOfItems(typeSite, paramSeach);
  });
}

function quantityOfItems(typeSite, paramSeach) {
  rl.question("Quantos itens deseja buscar? --> ", (quantityOfItems) => {
    switch (typeSite) {
      case "1":
        MercadoLivre(paramSeach, quantityOfItems);
        break;
    }
  });
}
