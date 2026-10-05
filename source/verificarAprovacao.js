export function verificarAprovacao(media, frequencia) {
  if (media < 4 || frequencia < 75) {
    return  "Reprovado"
  } else if (media >= 7) {
    return "Aprovado"
  } else {
    return "Recuperação"
  }
}