package de.neuefische.backend.move;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/api/moves")
    public List<Move> getAllMoves (){
        return moveService.getAllMoves();
    }

    @GetMapping("{id}")
    public Move getMoveById(@PathVariable String id){
        return moveService.getMoveById(id);
    }
}
