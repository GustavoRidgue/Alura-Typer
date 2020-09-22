var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//qnd a pág estiver carregada, chama oq tá dentro:
//um atalho é vc tirar o "(document).ready" e deixar apenas "(function(){...});"
$(document).ready(function(){
	atualizaTamahoFrase();
	inicializaContadores();
	inicializaCronometro();
	$("#botao-reiniciar").click(reiniciaJogo);
	inicializaMarcadores();

});

function atualizaTamahoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanhoDaFrase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
	campo.on("input", function(){
		var conteudo = campo.val();
		//o que ta dentro do split é uma expressão regular para buscar qlqr espaço vazio
		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}

function inicializaCronometro() {
	var tempoRestante = $("#tempo-digitacao").text();
	//one fa com q a func aconteca apenas 1 vez, para q
	// caso o usuario saia e volte no text area nao de erro
	campo.one("focus", function(){
		$("#botao-reiniciar").attr("disabled",true);
		var cronometroID =  setInterval(function(){
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if (tempoRestante < 1) {
				//todo setInterval tem um id. isso limpa o text digitado
				clearInterval(cronometroID);
				finalizaJogo();
			}
		}, 1000)
	});
}

function finalizaJogo() {
	campo.attr("disabled", true);
	$("#botao-reiniciar").attr("disabled", false);
	// campo.css("background-color", "lightgray");
	//se tiver com a class, retira, se não coloca
	campo.toggleClass("campo-desativado");
	inserePlacar();
}

function inicializaMarcadores() {
	var frase = $(".frase").text();
	campo.on("input", function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);
		// console.log("Digitado: " + digitado);
		// console.log("Frase C.: " + comparavel);

		if (digitado == comparavel) {
			campo.addClass("borda-correto");
			campo.removeClass("borda-errado");
		} else {
			campo.addClass("borda-errado");
			campo.removeClass("borda-correto");
		}
	});
}

function reiniciaJogo(){
	campo.removeAttr("disabled");
		campo.val("");
		$("#contador-palavras").text(0);
		$("#contador-caracteres").text(0);
		$("#tempo-digitacao").text(tempoInicial);
		inicializaCronometro();
		campo.toggleClass("campo-desativado");
		campo.removeClass("borda-correto");
		campo.removeClass("borda-errado");
}
