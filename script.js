function calcular() {
    // Obtendo os valores numéricos do formulário
    const altura = parseFloat(document.getElementById('altura').value);
    const largura = parseFloat(document.getElementById('largura').value);
    const profundidade = parseFloat(document.getElementById('profundidade').value);

    // Obtendo os valores das seleções
    const tipoFundo = document.getElementById('tipofundo').value;
    const tipoBase = document.getElementById('tipobase').value;
    const qtdPortas = document.getElementById('qtdportas').value;

    // Definição da espessura da base
    let baseEspessura = tipoBase === "base25" ? "25" : "30";

    // Definição dos componentes
    const lateralEsquerda = `${profundidade} x ${altura}`;
    const lateralDireita = `${profundidade} x ${altura}`;
    const baseTopo = `${largura - 50} x ${profundidade} x ${baseEspessura}`;
    let fundo = `${largura - 36} x ${altura - 68.6}`;
    const prateleira = `${largura - 52} x ${profundidade - 42}`;

    // Ajuste do Fundo para MDF 6mm
    if (tipoFundo === "fundomdf6") {
        fundo = `${largura - 31.5} x ${altura - 68.6}`;
    }

    // Cálculo da largura das portas
    let larguraPorta = qtdPortas === "1porta" ? largura - 27 : (largura - 29) / 2;

    // Exibindo os resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
      <strong>Componentes do Armário:</strong><br>
      - Lateral Esquerda Milano: ${lateralEsquerda} mm<br>
      - Lateral Direita Milano: ${lateralDireita} mm<br>
      - Base e Topo MDF: ${baseTopo} mm<br>
      - Fundo Milano: ${fundo} mm<br>
      - Prateleira Milano: ${prateleira} mm<br>
      - ${qtdPortas === "1porta" ? "Porta" : "Portas"}: ${larguraPorta.toFixed(1)} mm x ${(altura - 36).toFixed(1)} mm<br>
    `;
    resultadoDiv.style.display = 'block';
}
