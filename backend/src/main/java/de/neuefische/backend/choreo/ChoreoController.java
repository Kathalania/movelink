package de.neuefische.backend.choreo;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/choreo")
public class ChoreoController {

    private final ChoreoService choreoService;

    @GetMapping
    public List<ChoreoDTO> getAllChoreos(){
        return choreoService.getAllChoreoDTOsByAllChoreos();
    }

    @GetMapping("{id}")
    public ChoreoDTO getChoreoById (@PathVariable String id){
        return choreoService.getChoreoDTOByChoreoId(id);
    }

    @PutMapping(path = {"/{id}/edit","{id}"})
    public Choreo editChoreo(@PathVariable String id, @RequestBody ChoreoDTO choreoToEdit){
        if (!choreoToEdit.id().equals(id)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choreo does not exist");
        }
        return choreoService.editChoreo(choreoToEdit);
    }

    @DeleteMapping("{id}")
    public void deleteChoreo(@PathVariable String id){
        choreoService.deleteChoreo(id);
    }


}
