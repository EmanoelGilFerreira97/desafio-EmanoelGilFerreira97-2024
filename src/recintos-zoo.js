class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['macaco'], espacoOcupado: 3 },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [], espacoOcupado: 0 },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['gazela'], espacoOcupado: 2 },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [], espacoOcupado: 0 },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['leao'], espacoOcupado: 3 },
    ];

    this.animais = [
      { especie: 'LEAO', tamanho: 3, biomas: ['savana'], carnivoro: true },
      { especie: 'LEOPARDO', tamanho: 2, biomas: ['savana'], carnivoro: true },
      { especie: 'CROCODILO', tamanho: 3, biomas: ['rio'], carnivoro: true },
      { especie: 'MACACO', tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      { especie: 'GAZELA', tamanho: 2, biomas: ['savana'], carnivoro: false },
      { especie: 'HIPOPOTAMO', tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
    ];
  }

  validarAnimal(especie) {
    return this.animais.find(animal => animal.especie === especie.toUpperCase());
  }

  validarQuantidade(quantidade) {
    return Number.isInteger(quantidade) && quantidade > 0;
  }

  verificarRecintosViaveis(especie, quantidade) {
    const animal = this.validarAnimal(especie);
    if (!animal) return { erro: "Animal inválido" };
    if (!this.validarQuantidade(quantidade)) return { erro: "Quantidade inválida" };

    const recintosViaveis = this.recintos.filter(recinto => {
      // Verifica se o bioma é compatível
      if (!animal.biomas.includes(recinto.bioma) && !(animal.especie === 'HIPOPOTAMO' && recinto.bioma === 'savana e rio')) return false;

      // Verifica se há espaço suficiente
      let espacoNecessario = animal.tamanho * quantidade;
      if (recinto.animais.length > 0) espacoNecessario += 1;  // Considera 1 espaço extra se já houver animais no recinto
      if (recinto.tamanhoTotal - recinto.espacoOcupado < espacoNecessario) return false;

      // Verifica a compatibilidade entre espécies
      if (animal.carnivoro) {
        if (recinto.animais.length > 0 && recinto.animais.some(a => a !== especie.toLowerCase())) return false;
      } else {
        if (recinto.animais.some(a => {
          const especieExistente = this.validarAnimal(a.toUpperCase());
          return especieExistente.carnivoro;
        })) return false;
      }

      return true;
    });

    if (recintosViaveis.length === 0) return { erro: "Não há recinto viável" };

    return {
      recintosViaveis: recintosViaveis.map(recinto => {
        const espacoLivre = recinto.tamanhoTotal - recinto.espacoOcupado - animal.tamanho * quantidade - (recinto.animais.length > 0 ? 1 : 0);
        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
      })
    };
  }

  analisaRecintos(especie, quantidade) {
    return this.verificarRecintosViaveis(especie, quantidade);
  }
}

// Exportando a classe conforme a especificação
export { RecintosZoo as RecintosZoo };
