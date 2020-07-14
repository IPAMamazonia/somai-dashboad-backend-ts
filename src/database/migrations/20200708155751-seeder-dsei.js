'use strict'

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert({ tableName: 'dsei', schema: 'covid19' }, [
      { name: 'ALTAMIRA', code: 2 },
      { name: 'ALTO RIO JURUÁ', code: 3 },
      { name: 'ALTO RIO NEGRO', code: 4 },
      { name: 'ALTO RIO PURUS', code: 5 },
      { name: 'ALTO RIO SOLIMÕES', code: 6 },
      { name: 'AMAPÁ E NORTE DO PARÁ', code: 7 },
      { name: 'ARAGUAIA', code: 8 },
      { name: 'CUIABÁ', code: 11 },
      { name: 'GUAMÁ-TOCANTINS', code: 12 },
      { name: 'KAIAPÓ DO MATO GROSSO', code: 14 },
      { name: 'KAIAPÓ DO PARÁ', code: 15 },
      { name: 'LESTE DE RORAIMA', code: 16 },
      { name: 'MANAUS', code: 18 },
      { name: 'MARANHÃO', code: 19 },
      { name: 'MÉDIO RIO PURUS', code: 21 },
      { name: 'MÉDIO SOLIMÕES E AFLUENTES', code: 22 },
      { name: 'PARINTINS', code: 24 },
      { name: 'PORTO VELHO', code: 26 },
      { name: 'RIO TAPAJÓS', code: 28 },
      { name: 'TOCANTINS', code: 29 },
      { name: 'VALE DO JAVARI', code: 30 },
      { name: 'VILHENA', code: 31 },
      { name: 'XAVANTE', code: 32 },
      { name: 'XINGU', code: 33 },
      { name: 'YANOMAMI', code: 34 }
    ])
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete(
      { tableName: 'dsei', schema: 'covid19' },
      null,
      {}
    )
  }
}
