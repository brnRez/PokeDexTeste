document.addEventListener("DOMContentLoaded", () =>{
    carregarPokemons();
});


//Inclusão de novos pokemons na lista
document.getElementById("pokemonForm").addEventListener("submit", function(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const nivel = document.getElementById("nivel").value;

    const pokemon = { nome, tipo, nivel};

    fetch("http://localhost:8080/",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(pokemon)
    })
    .then(response => response.json())
    .then(() => {
        carregarPokemons(); //Para Atualizar a Tabela
        document.getElementById("pokemonForm").reset();
    })
    .catch(error => console.error("Erro ao adicionar Pokémon:". error));
});


//Pesquisa de Pokemons
document.getElementById("search-form").addEventListener("submit", function(event){
    event.preventDefault();

    let searchId = document.getElementById("search-id").value;

    fetch(`http://localhost:8080/${searchId}`)
        .then(response => {
            if (!response.ok){
                throw new Error("Pokemon não encontrado!");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("search-result").innerHTML = 
            `<strong>ID:</strong> ${data.id} <br>
             <strong>Nome:</strong> ${data.nome} <br>
             <strong>Tipo:</strong> ${data.tipo} <br>
             <strong>Nível:</strong> ${data.nivel} <br>`;
        })
        .catch(error => {
            document.getElementById("search-result").innerHTML = `<span style="color: red;">${error.message}</span>`;
        });
})

//Função para Editar Pokemons
function editarPokemon(){
    const id = document.getElementById("edit-id").value;
    const nome = document.getElementById("edit-nome").value;
    const tipo = document.getElementById("edit-tipo").value;
    const nivel = document.getElementById("edit-nivel").value;

    if (!id){
        alert("Por favor, insira um ID válido para editar.");
        return;
    }
    
    const pokemon = {
        nome: nome,
        tipo: tipo,
        nivel: parseInt(nivel)
    };

    fetch(`http://localhost:8080/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemon)
    })
    .then(response => response.json())
    .then (data => {
        alert("Pokemon atualizado com sucesso!");
        console.log("Pokémon atualizado:", data);
        carregarPokemons();
    })
    .catch(error => console.error("Erro ao atualizar Pokémon:"));
}

//Para Excluir os Pokemons
function deletarPokemon() {
    const id = document.getElementById("delete-id").value;

    if (!id) {
        alert("Por favor, insira um ID válido para deletar.");
        return;
    }

    fetch(`http://localhost:8080/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Pokémon deletado com sucesso!");
            console.log(`Pokémon com ID ${id} removido.`);
        } else {
            alert("Erro ao deletar Pokémon. Verifique se o ID está correto.");
        }
    })
    .catch(error => console.error("Erro ao deletar Pokémon:", error));
}


//Função para atualizar a lista
function carregarPokemons (){
    fetch ("http://localhost:8080/")
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById("pokemonTable");
            tabela.innerHTML = "";
            data.forEach(pokemon =>{
                tabela.innerHTML += `<tr>
                <td>${pokemon.nome}</td>
                <td>${pokemon.tipo}</td>
                <td>${pokemon.nivel}</td>
                </tr>`;
            });
        })
        .catch(error => console.error("Erro ao carregar Pokémons:", error));
}