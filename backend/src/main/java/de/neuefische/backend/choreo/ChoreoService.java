package de.neuefische.backend.choreo;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ChoreoService {

    private final ChoreoRepo choreoRepo;
    public List<Choreo> getAllChoreos(){
        return choreoRepo.findAll();
    }

    public Choreo getChoreoById(String id){
        return choreoRepo.findById(id).orElseThrow(()
        -> new NoSuchElementException("Choreo with id " + id + " not found!"));
    }
}
