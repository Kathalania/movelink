package de.neuefische.backend.choreo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/choreo")
public class ChoreoController {

    private final ChoreoService choreoService;

    @GetMapping("/all")
    public List<Choreo> getAllChoreos(){
        return choreoService.getAllChoreos();
    }

    @GetMapping("{id}")
    public Choreo getChoreoById (@PathVariable String id){
        return choreoService.getChoreoById(id);
    }

}
