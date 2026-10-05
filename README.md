# Verificar Aprovação

Função em JavaScript que informa se um aluno está **Aprovado**, em **Recuperação** ou **Reprovado**, com base na **média** e na **frequência**. O projeto também reúne a suíte de testes automatizados que valida essas regras.

## Regras de negócio

| Condição | Resultado |
|---|---|
| frequência < 75 | Reprovado |
| média < 4 | Reprovado |
| média >= 7 e frequência >= 75 | Aprovado |
| média >= 4 e < 7 e frequência >= 75 | Recuperação |

> A frequência mínima de 75% é eliminatória: abaixo dela o aluno é reprovado, independentemente da média.

## Tecnologias

- [Node.js](https://nodejs.org/) 20.19 ou superior (ou 22.12+)
- [Mocha](https://mochajs.org/) como framework de testes
- `node:assert` (módulo nativo do Node.js) para as asserções

## Estrutura do projeto

```
verificarAprovacao/
├── source/
│   └── verificarAprovacao.js        # função que implementa a regra
├── test/
│   └── verificarAprovacao.test.js   # testes automatizados
├── package.json
└── README.md
```

## Como executar

**Pré-requisito:** ter o [Node.js](https://nodejs.org/) instalado (versão 20.19 ou superior, ou 22.12+).

```bash
# 1. Clone o repositório
git clone https://github.com/tai-diasl/verificarAprovacao.git
cd verificarAprovacao

# 2. Instale as dependências
npm install

# 3. Execute os testes
npm test
```

Saída esperada:

```
  verificarAprovacao
    Tabela de Decisão
      ✔ deve retornar "Aprovado" quando média >= 7 e frequência >= 75
      ✔ deve retornar "Reprovado" quando média >= 7, mas frequência < 75
      ✔ deve retornar "Recuperação" quando média >= 4 e < 7, e frequência >= 75
      ✔ deve retornar "Reprovado" quando média >= 4 e < 7, mas frequência < 75
      ✔ deve retornar "Reprovado" quando média < 4 e frequência >= 75
      ✔ deve retornar "Reprovado" quando média < 4 e frequência < 75
    Análise de Valor Limite
      ✔ deve retornar "Reprovado" quando média imediatamente abaixo de 4 (3.9) e frequência imediatamente abaixo de 75 (74)
      ✔ deve retornar "Reprovado" quando média imediatamente abaixo de 4 (3.9) e frequência >= 75
      ✔ deve retornar "Reprovado" quando média = 4 e frequência imediatamente abaixo de 75 (74)
      ✔ deve retornar "Recuperação" quando média = 4 e frequência >= 75
      ✔ deve retornar "Reprovado" quando média imediatamente abaixo de 7 (6.9) e frequência imediatamente abaixo de 75 (74)
      ✔ deve retornar "Recuperação" quando média imediatamente abaixo de 7 (6.9) e frequência >= 75
      ✔ deve retornar "Reprovado" quando média = 7 e frequência imediatamente abaixo de 75 (74)
      ✔ deve retornar "Aprovado" quando média = 7 e frequência >= 75

  14 passing
```

## Uso da função

```javascript
import { verificarAprovacao } from './source/verificarAprovacao.js'

verificarAprovacao(8, 76) // "Aprovado"
verificarAprovacao(5, 76) // "Recuperação"
verificarAprovacao(8, 60) // "Reprovado"
```

## Estratégia de testes

Os testes foram projetados com duas técnicas de teste de caixa-preta e estão organizados em dois grupos (`describe`) dentro da suíte `verificarAprovacao`, totalizando 14 casos de teste.

### 1. Tabela de Decisão

Como há duas entradas relacionadas (média e frequência), foram combinadas as classes de cada uma (média < 4, de 4 a < 7 e >= 7; frequência < 75 e >= 75), resultando em 6 cenários.

| | R1 | R2 | R3 | R4 | R5 | R6 |
|---|---|---|---|---|---|---|
| **Média** | >= 7 | >= 7 | >= 4 e < 7 | >= 4 e < 7 | < 4 | < 4 |
| **Frequência** | >= 75 | < 75 | >= 75 | < 75 | >= 75 | < 75 |
| **Resultado** | Aprovado | Reprovado | Recuperação | Reprovado | Reprovado | Reprovado |
| **Entrada usada** | (8, 76) | (8, 50) | (5, 76) | (5, 62) | (3, 76) | (3, 62) |

### 2. Análise de Valor Limite

Os erros costumam aparecer nas fronteiras das faixas. Por isso, foram identificados os valores de fronteira de cada entrada e todos eles foram combinados entre si:

- **Média:** 3.9 (logo abaixo de 4), 4, 6.9 (logo abaixo de 7) e 7.
- **Frequência:** 74 (logo abaixo de 75) e 75.

Isso resulta em 4 × 2 = 8 combinações:

| Média | Frequência | Resultado esperado | O que verifica |
|---|---|---|---|
| 3.9 | 74 | Reprovado | média e frequência logo abaixo dos limites |
| 3.9 | 75 | Reprovado | média logo abaixo de 4, com frequência no limite |
| 4 | 74 | Reprovado | média no limite de 4, com frequência logo abaixo de 75 |
| 4 | 75 | Recuperação | média e frequência exatamente nos limites mínimos |
| 6.9 | 74 | Reprovado | média logo abaixo de 7, com frequência logo abaixo de 75 |
| 6.9 | 75 | Recuperação | média logo abaixo de 7, com frequência no limite |
| 7 | 74 | Reprovado | média no limite de 7, com frequência logo abaixo de 75 |
| 7 | 75 | Aprovado | média e frequência exatamente nos limites para aprovação |

## Convenções adotadas

- **Nome da suíte (`describe`):** nome da função testada, com um `describe` interno para cada técnica de teste.
- **Nome dos casos (`it`):** descrevem o comportamento esperado no formato *"deve retornar X quando Y"*.
- **Estrutura dos testes:** padrão *Arrange, Act, Assert* (preparar, executar, verificar). O primeiro teste traz os comentários que identificam cada etapa, e os demais seguem a mesma estrutura.

## Autoria

**Taís Dias**
- GitHub: [@tai-diasl](https://github.com/tai-diasl)
- LinkedIn: [@Taís Dias](https://www.linkedin.com/in/taisadiasl/)
