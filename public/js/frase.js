$("#botaoFrase").click(fraseAleatoria);
$("#botaoFraseId").click(buscaFrase);

function fraseAleatoria(){

	$("#spinner").toggle();

	$.get("http://localhost:3001/frases", trocaFrase)
	.fail(function(){
        $("#erro").toggle(); //ao falhar mostra a mensagem de erro
        setTimeout(function() {
        	$("#erro").toggle();
        },2000);
    })
    .always(function(){
    	$("#spinner").toggle();
    });
}

function trocaFrase(data) {
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);

	frase.text(data[numeroAleatorio].texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}


function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
	$("#tempoDigitacao").text(tempo);
}

function buscaFrase() {

	$("#spinner").toggle();
	var fraseId = $("#fraseId").val();

	var dados = {id: fraseId};

	$.get("http://localhost:3000/frases", dados,trocaFraseId)
	.fail(function() {
		$("#erro").toggle();
		setTimeout(function() {
			$("#erro").toggle();
		},2000);
	})
	.always(function() {
		$("#spinner").toggle();
	});
}

function trocaFraseId(data) {
	console.log(data);

	var frase = $(".frase");
	frase.text(data.texto);
	atualizaTamanhoFrase();
	atualizaTempoInicial(data.tempo);
}