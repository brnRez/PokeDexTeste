package com.brunao.PokeDexTeste.repository;
import com.brunao.PokeDexTeste.model.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PokemonRepository extends JpaRepository <Pokemon, Long>{
      
}
