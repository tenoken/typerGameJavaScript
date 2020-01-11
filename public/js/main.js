var tempoInicial = $("#tempoDigitacao").text();
var campo = $(".campoDigitacao");
$('#usuarios').selectize({
	create: true,
	sorField: 'text'
});

$(function() {
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores()
	$("#botaoReiniciar").click(reiniciaJogo);
	atualizaPlacar();
});

$(".tooltip").tooltipster({
    trigger: "custom"
});

function atualizaTamanhoFrase() {

	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanhoFrase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
	
	campo.on('input', function() {

		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contadorPalavras").text(qtdPalavras);

		var conteudoSemEspaco = conteudo.replace(/\s+/g,'');

		var qtdCaracteres = conteudo.length;
		$("#contadorCaracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	 
	campo.one('focus', function() {	
		var tempoRestante = $("#tempoDigitacao").text();
		$("#botaoReiniciar").attr("disabled", true);	
		var cronometroID = setInterval(function() {
			tempoRestante--;
			console.log(tempoRestante);
			$("#tempoDigitacao").text(tempoRestante);

			if(tempoRestante < 1) {	
				clearInterval(cronometroID);
				//$("#botaoReiniciar").attr("disabled", false);
				finalizaJogo();
			}
		},1000);
	});
}

function finalizaJogo() {
	campo.attr("disabled", true);
	campo.addClass("campoDesativado");
	inserirPlacar();
}

function reiniciaJogo() {
	
	campo.attr('disabled', false);
	campo.val("");
	$("#contadorPalavras").text("0");
	$("#contadorCaracteres").text("0");
	$("#tempoDigitacao").text(tempoInicial);
	inicializaCronometro();
	campo.removeClass("campoDesativado");
	campo.removeClass("bordaVermelha");
	campo.removeClass("bordaVerde");
}

function inicializaMarcadores() {
	campo.on("input",function () {
		// body...
		var frase = $(".frase").text();
		campo.on("input", function() {
		var digitado = campo.val();
		var comparavel = frase.substr(0, digitado.length);
		if (digitado == comparavel) {
			campo.addClass("bordaVerde");
			campo.removeClass("bordaVermelha");
		} else {
			campo.addClass("bordaVermelha");
			campo.removeClass("bordaVerde");
		}
		})
	});
}

