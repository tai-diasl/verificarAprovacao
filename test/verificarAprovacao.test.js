import { verificarAprovacao } from "../source/verificarAprovacao.js"
import assert from 'node:assert'

describe('verificarAprovacao', function() {

  describe('Tabela de Decisão', function() {
    it('deve retornar "Aprovado" quando média >= 7 e frequência >= 75', function() {
      // Arrange
      const resultadoEsperado = 'Aprovado'
      // Act
      let resultadoEncontrado = verificarAprovacao(8, 76)
      // Assert
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média >= 7, mas frequência < 75', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(8, 50)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Recuperação" quando média >= 4 e < 7, e frequência >= 75', function() {
      const resultadoEsperado = 'Recuperação'
      let resultadoEncontrado = verificarAprovacao(5, 76)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média >= 4 e < 7, mas frequência < 75', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(5, 62)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média < 4 e frequência >= 75', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(3, 76)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média < 4 e frequência < 75', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(3, 62)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
  })

  describe('Análise de Valor Limite', function() {
    it('deve retornar "Reprovado" quando média imediatamente abaixo de 4 (3.9) e frequência imediatamente abaixo de 75 (74)', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(3.9, 74)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média imediatamente abaixo de 4 (3.9) e frequência >= 75', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(3.9, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média = 4 e frequência imediatamente abaixo de 75 (74)', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(4, 74)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Recuperação" quando média = 4 e frequência >= 75', function() {
      const resultadoEsperado = 'Recuperação'
      let resultadoEncontrado = verificarAprovacao(4, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média imediatamente abaixo de 7 (6.9) e frequência imediatamente abaixo de 75 (74)', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(6.9, 74)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Recuperação" quando média imediatamente abaixo de 7 (6.9) e frequência >= 75', function() {
      const resultadoEsperado = 'Recuperação'
      let resultadoEncontrado = verificarAprovacao(6.9, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Reprovado" quando média = 7 e frequência imediatamente abaixo de 75 (74)', function() {
      const resultadoEsperado = 'Reprovado'
      let resultadoEncontrado = verificarAprovacao(7, 74)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
    it('deve retornar "Aprovado" quando média = 7 e frequência >= 75', function() {
      const resultadoEsperado = 'Aprovado'
      let resultadoEncontrado = verificarAprovacao(7, 75)
      assert.equal(resultadoEncontrado, resultadoEsperado)
    })
  })
})
