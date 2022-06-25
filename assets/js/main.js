const input_tarefa = document.querySelector('.input-tarefa');
const btn_tarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

input_tarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!input_tarefa.value) return;
        criaTarefa(input_tarefa.value);
    }
});

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    // botaoApagar.classList.add('apagar');
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Delete this task');
    li.appendChild(botaoApagar);
}

function limpaInput() {
    input_tarefa.value = '';
    input_tarefa.focus();
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btn_tarefa.addEventListener('click', function() {
    if (!input_tarefa.value) return;
    criaTarefa(input_tarefa.value);
});

document.addEventListener('click', function(event) {
    const elemento = event.target;
    if (elemento.classList.contains('apagar')) {
        elemento.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listadeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listadeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listadeTarefas); // Ele converte um elemento javascript para uma string no formato JSON.

    localStorage.setItem('tarefas', tarefasJSON); // Ele é global do navegador, então você usá-lo em qualquer lugar do sistema.
}

function adicionaTarefasSalvas() { /*Vamos obter as tarefas do LocalStorage*/
    const tarefas = localStorage.getItem('tarefas');
    const listaTarefas = JSON.parse(tarefas); // Convertemos as nossas tarefas de volta para um array, quando fazemos isso nós estamos convertendo de volta para um objeto javascript.

    for (let tarefa of listaTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();
