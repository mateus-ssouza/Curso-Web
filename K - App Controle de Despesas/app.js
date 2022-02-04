class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(dado) {
    let id = this.getProximoId();
    localStorage.setItem(id, JSON.stringify(dado));
    localStorage.setItem("id", id);
  }

  recuperarTodosRegistros() {
    let id = localStorage.getItem("id");
    let despesas = Array();

    // Recuperar todas as despesas cadastradas em localStage
    for (let i = 1; i <= id; i++) {
      // Recuperar a despesa
      let despesa = JSON.parse(localStorage.getItem(i));

      if (despesa === null) {
        continue;
      }
      despesa.id = i;
      despesas.push(despesa);
    }

    return despesas;
  }

  pesquisar(despesa) {
    let despesasFiltradas = Array();

    despesasFiltradas = this.recuperarTodosRegistros();

    // Ano
    if (despesa.ano != "") {
      console.log("Filtro ano");
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }

    // Mes
    if (despesa.mes != "") {
      console.log("Filtro mes");
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }

    // Dia
    if (despesa.dia != "") {
      console.log("Filtro dia");
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }

    // Tipo
    if (despesa.tipo != "") {
      console.log("Filtro tipo");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }

    // Descricao
    if (despesa.descricao != "") {
      console.log("Filtro descricao");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }

    // Valor
    if (despesa.valor != "") {
      console.log("Filtro valor");
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }

    return despesasFiltradas;
  }

  remover(id) {
    localStorage.removeItem(id);
  }
}

let bd = new Bd();

function limparCampos() {
  document.getElementById("ano").value = "";
  document.getElementById("mes").value = "";
  document.getElementById("dia").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
}

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    bd.gravar(despesa);

    document.getElementById("text-title-modal").innerHTML =
      "Registro inserido com sucesso";

    document.getElementById("modal-conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso!";

    document.getElementById("modal-title-div").className =
      "modal-header text-success";

    document.getElementById("modal-btn").className = "btn btn-success";

    document.getElementById("modal-btn").innerHTML = "Voltar";

    // Dialog de sucesso
    $("#modalRegistraDespesa").modal("show");

    // Limpar os campos de entrada de dados
    limparCampos();
  } else {
    document.getElementById("text-title-modal").innerHTML =
      "Erro na gravação do item inserido";

    document.getElementById("modal-conteudo").innerHTML =
      "Existem campos obrigatórios que não foram preenchidos.";

    document.getElementById("modal-title-div").className =
      "modal-header text-danger";

    document.getElementById("modal-btn").className = "btn btn-danger";

    document.getElementById("modal-btn").innerHTML = "Voltar e corrigir";

    // Dialog de erro
    $("#modalRegistraDespesa").modal("show");
  }
}

function carregarListaDespesas(despesas = Array(), filtro = false) {
  if (despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistros();
  }
  // Selecionando o elemento tbody da tabela
  let listaDespesas = document.getElementById("listaDespesas");

  // Limpando a lista, caso seja utilizado do filtro/pesquisa
  listaDespesas.innerHTML = "";

  // Percorrer o array despesas, listando cada despesas de forma dinâmica
  despesas.forEach(function (despesa) {
    // Criando a linha (tr)
    let linha = listaDespesas.insertRow();

    // Criando as colunas (td)
    linha.insertCell(
      0
    ).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`;
    // Ajustar o tipo
    switch (despesa.tipo) {
      case "1":
        despesa.tipo = "Alimentação";
        break;
      case "2":
        despesa.tipo = "Educação";
        break;
      case "3":
        despesa.tipo = "Lazer";
        break;
      case "4":
        despesa.tipo = "Saúde";
        break;
      case "5":
        despesa.tipo = "Transporte";
        break;
      default:
        break;
    }
    linha.insertCell(1).innerHTML = `${despesa.tipo}`;
    linha.insertCell(2).innerHTML = `${despesa.descricao}`;
    linha.insertCell(3).innerHTML = `${despesa.valor}`;

    // Criar o botão de exclusão
    let btn = document.createElement("button");
    btn.className = "btn btn-danger";
    btn.innerHTML = '<i class="fas fa-times"></i>';
    btn.id = `id_despesa_${despesa.id}`;
    btn.onclick = function () {
      // Remover despesa
      let id = this.id.replace("id_despesa_", "");
      bd.remover(id);
      window.location.reload();
    };
    linha.insertCell(4).append(btn);

    console.log(despesa);
  });
}

function pesquisarDespesa() {
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  let despesas = bd.pesquisar(despesa);

  carregarListaDespesas(despesas, true);
}
