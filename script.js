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
    let baseTopo;
    let fundo = `${largura - 36} x ${altura - 68.6}`;
    let prateleira = `${largura - 52} x ${profundidade - 42}`;
    let divisoria = "Nenhuma";
    let tipoPorta = "Slow";
    let alturaPorta = `${altura - 36}`;

    // Ajuste do Fundo para MDF 6mm
    if (tipoFundo === "fundomdf6") {
        fundo = `${largura - 31.5} x ${altura - 68.6}`;
    }

    // Ajuste da largura da Base e Topo conforme a necessidade de divisória
    if (largura > 1430) {
        divisoria = `${profundidade} x ${altura}`;
        baseTopo = `${(largura / 2) - 25 - 12.5} x ${profundidade} x ${baseEspessura}`;
        prateleira = `${(largura / 2) - 25 - 12.5 - 2} x ${profundidade - 42}`;
    } else {
        baseTopo = `${largura - 50} x ${profundidade} x ${baseEspessura}`;
    }

    // Cálculo da largura das portas
    let larguraPorta = qtdPortas === "1porta" ? largura - 27 : (largura - 29) / 2;

    // Verificação da restrição de largura das portas
    if (larguraPorta >= 750) {
        alert("Erro: A largura de uma das portas ultrapassa 750mm. Ajuste as dimensões.");
        return; // Impede a execução do restante do código
    } else if (larguraPorta <= 200) {
        alert("Erro: A largura de uma das portas é inferior a 200mm. Ajuste as dimensões.");
        return; // Impede a execução do restante do código
    }

    // Tipologia de portas
    if (larguraPorta >= 600 || alturaPorta >= 2300) {
        tipoPorta = "Slow Grandes Vãos";
    }

    // Usinagens indicadas para MDF
    let usinagem = "";

    const usinagensBase25 = {
        fundovidro: { normal: "USIMIL006-B", grande: "USIMIL014-B" },
        fundomdf6: { normal: "USIMIL011-B", grande: "USIMIL016-B" },
        fundomdfx: { normal: "USIMIL009-B", grande: "USIMIL015-B" }
    };

    const usinagensBase30 = {
        fundovidro: { normal: "USIMIL017-B", grande: "USIMIL020-B" },
        fundomdf6: { normal: "USIMIL018-B", grande: "USIMIL021-B" },
        fundomdfx: { normal: "USIMIL019-B", grande: "USIMIL022-B" }
    };

    // Determinação da usinagem correta
    const tipoUsinagem = (larguraPorta >= 600 || alturaPorta >= 2300) ? "grande" : "normal";

    if (tipoBase === "base25") {
        usinagem = usinagensBase25[tipoFundo][tipoUsinagem];
    } else if (tipoBase === "base30") {
        usinagem = usinagensBase30[tipoFundo][tipoUsinagem];
    }

    // Restição Altura Armário
    if (altura >= 3000) {
        alert("A altura do armário ultrapassa 3000mm.");
        return; // Impede a execução do restante do código
    }

    // Exibindo os resultados
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
      <strong>Componentes do Armário:</strong><br>
      - Lateral Esquerda Milano: ${lateralEsquerda} mm<br>
      - Lateral Direita Milano: ${lateralDireita} mm<br>
      - Base e Topo MDF: ${baseTopo} mm<br>
      - Fundo Milano: ${fundo} mm<br>
      - Prateleira Milano: ${prateleira} mm<br>
      - Divisória: ${divisoria}<br>
      - ${qtdPortas === "1porta" ? "Porta " : "Portas "} ${tipoPorta}: ${larguraPorta} x ${alturaPorta} mm<br>
      - Usinagem da Base: ${usinagem}<br>
    `;
    resultadoDiv.style.display = 'block';

}
