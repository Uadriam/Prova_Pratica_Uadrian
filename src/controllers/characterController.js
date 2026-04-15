const getCharacterByName = async (req, res) => {
  try {
    const { nome } = req.params;

    if (!nome || typeof nome !== 'string') {
      return res.status(400).json({ error: 'Parâmetro nome inválido ou não fornecido.' });
    }

    const apiUrl = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nome)}`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Personagem não encontrado.' });
      }
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const data = await response.json();
    
    // A API retorna um array de resultados. Pegamos o primeiro que corresponde.
    if (data.results && data.results.length > 0) {
      const character = data.results[0];
      
      const characterData = {
        nome: character.name,
        status: character.status,
        especie: character.species,
        origem: character.origin.name
      };
      
      return res.status(200).json(characterData);
    } else {
      return res.status(404).json({ error: 'Personagem não encontrado.' });
    }

  } catch (error) {
    console.error('Erro ao buscar personagem:', error);
    return res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
  }
};

module.exports = {
  getCharacterByName
};
