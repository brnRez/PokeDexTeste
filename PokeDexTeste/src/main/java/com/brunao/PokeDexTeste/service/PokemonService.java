package com.brunao.PokeDexTeste.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.brunao.PokeDexTeste.model.Pokemon;
import com.brunao.PokeDexTeste.repository.PokemonRepository;

import java.util.List;

@Service

public class PokemonService {
    private final PokemonRepository repository;

    public PokemonService(PokemonRepository repository){
        this.repository = repository;
    }
    
    public List<Pokemon> listarTodos(){
        return repository.findAll();
    }

    public Pokemon buscarPorId(Long id){
        return repository.findById(id).orElse(null);
    }

    public Pokemon salvar(Pokemon pokemon){
        return repository.save(pokemon);
    }
   
    public Pokemon atualizar(Long id, Pokemon pokemon){
        return repository.save(pokemon);
}
    
    public void deletar(Long id) {
        repository.deleteById(id);
    }
    
}
