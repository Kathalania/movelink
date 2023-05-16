package de.neuefische.backend.move;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/moves")
public class MoveController {
    private final MoveService moveService;

    @PostMapping("/add")
    public Move addMove(@RequestBody Move moveToAdd){
        return moveService.addMove(moveToAdd);
    }

    @GetMapping
    public List<Move> getAllMoves (){
        return moveService.getAllMoves();
    }

    @GetMapping("{id}")
    public Move getMoveById(@PathVariable String id){
        return moveService.getMoveById(id);
    }

    @DeleteMapping("{id}")
    public void deleteMove(@PathVariable String id){
        moveService.deleteMove(id);
    }

    @PutMapping(path = {"/{id}/edit", "{id}"})
    public Move editMove(@PathVariable String id, @RequestBody Move moveToEdit){
        if (!moveToEdit.id().equals(id)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Move does not exist");
        }
        return moveService.editMove(moveToEdit);
    }

}
