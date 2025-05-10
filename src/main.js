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
  (resposta) => {
    if (resposta === "5") {
      r1.close();
    } else {
      outraPergunta(resposta);
    }
  }
);

function outraPergunta(resposta) {
  rl.question("Qual seria a sua busca? --> ", (resposta2) => {
    switch (resposta) {
      case "1":
        MercadoLivre(resposta2);
        break;
    }
  });
}
