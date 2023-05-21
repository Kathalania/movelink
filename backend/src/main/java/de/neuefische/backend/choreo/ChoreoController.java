package de.neuefische.backend.choreo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public Choreo addChoreoByChoreoDTO(@RequestBody ChoreoDTO choreoDTO){
        return choreoService.addChoreoByChoreoDTO(choreoDTO);
    }

}
