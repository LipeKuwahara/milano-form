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
    if (larguraPorta > 750) {
        alert("Erro: A largura de uma das portas ultrapassa 750mm. Ajuste as dimensões.");
        return; // Impede a execução do restante do código
    } else if (larguraPorta < 200) {
        alert("Erro: A largura de uma das portas é inferior a 200mm. Ajuste as dimensões.");
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
      - ${qtdPortas === "1porta" ? "Porta" : "Portas"}: ${larguraPorta.toFixed(1)} mm x ${(altura - 36).toFixed(1)} mm<br>
    `;
    resultadoDiv.style.display = 'block';

    // Renderizar visualização 3D
    //renderizarArmario3D(largura, altura, profundidade, divisoria !== "Nenhuma");
}

/*function renderizarArmario3D(largura, altura, profundidade, temDivisoria) {
    // Limpa a visualização anterior
    document.getElementById('visualizacao3D').innerHTML = "";

    // Configuração do Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer(); THREE.
        renderer.setSize(400, 400);
    document.getElementById('visualizacao3D').appendChild(renderer.domElement);

    // Criando material e armário
    const material = new THREE.MeshBasicMaterial({ color: 0x8B4513, wireframe: true });
    const armarioGeo = new THREE.BoxGeometry(largura / 100, altura / 100, profundidade / 100);
    const armarioMesh = new THREE.Mesh(armarioGeo, material);
    scene.add(armarioMesh);

    // Adicionando divisória se necessário
    if (temDivisoria) {
        const divisoriaGeo = new THREE.BoxGeometry(2 / 100, altura / 100, profundidade / 100);
        const divisoriaMesh = new THREE.Mesh(divisoriaGeo, material);
        divisoriaMesh.position.x = 0;
        scene.add(divisoriaMesh);
    }

    // Posicionando a câmera corretamente
    camera.position.set(0, 0, 5);

    // Renderizando a cena
    function animate() {
        requestAnimationFrame(animate);
        armarioMesh.rotation.y += 0.01; // Rotação leve para melhor visualização
        renderer.render(scene, camera);
    }
    animate();
}*/
