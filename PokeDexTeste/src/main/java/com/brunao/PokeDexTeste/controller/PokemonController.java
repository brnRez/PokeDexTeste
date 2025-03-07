package com.brunao.PokeDexTeste.controller;


import org.springframework.web.bind.annotation.*;

import com.brunao.PokeDexTeste.model.Pokemon;
import com.brunao.PokeDexTeste.service.PokemonService;

import java.util.List;

@RestController
@RequestMapping
public class PokemonController{
    private final PokemonService service;
    public PokemonController(PokemonService service){
        this.service = service;
    }

    @GetMapping
    public List<Pokemon> listarTodos(){
        return service.listarTodos();
    }
    @GetMapping("/{id}")
    public Pokemon buscarPorId(@PathVariable Long id){
        return service.buscarPorId(id);
    }
    @PostMapping
    public Pokemon salvar(@RequestBody Pokemon pokemon){
        return service.salvar(pokemon);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
