$(".botaoRemover").click(removeLinha);
$("#botaoSync").click(sincronizaPlacar);

function inserirPlacar() {
	var corpoTabela = $(".placar").find("tbody");
	var usuario = $("#usuarios").val();
	var numPalavras = $("#contadorPalavras").text();
	var linha = novaLinha(usuario, numPalavras);
	linha.find(".botaoRemover").click(removeLinha);
	corpoTabela.append(linha);

	$(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;
    debugger;
    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, numPalavras) {
	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(numPalavras);
	var colunaRemover = $("<td>");

	var link = $("<a>").attr("href", "#").addClass("botaoRemover");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);
	colunaRemover.append(link);

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover)

	return linha;
}

function removeLinha() {
	event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function() {
        linha.remove();
    }, 1000);
}

$("#botaoPlacar").click(mostrarPlacar)

function mostrarPlacar() {
	$(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(argument) {
	var placar = [];
	var linhas = $("tbody>tr");

	linhas.each(function(){
		var usuario = $(this).find("td:nth-child(1)").text();
		var palavras = $(this).find("td:nth-child(2)").text();

		score = {
			usuario: usuario,
			pontos: palavras
		};

		placar.push(score);
	});

	var dados = {
		placar: placar
	};

	$.post("http://localhost:3000/placar", dados, function(){
        console.log("Placar sincronizado com sucesso");
        $(".tooltip").tooltipster("open"); 
		}).fail(function(){
		    $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
		}).always(function(){ 
		    setTimeout(function() {
		    $(".tooltip").tooltipster("close"); 
		}, 1200);
    });
}

function atualizaPlacar(){
	$.get("http://localhost:3000/placar", function(data) {
		$(data).each(function(){
			var linha = novaLinha(this.usuario,this.pontos);

			linha.find(".botaoRemover").click(removeLinha);

			$("tbody").append(linha);
		});
	});
}