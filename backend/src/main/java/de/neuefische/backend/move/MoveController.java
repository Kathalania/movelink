package de.neuefische.backend.move;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/moves")
public class MoveController {
    private final MoveService moveService;

    @PostMapping
    public Move addMove(@RequestBody Move moveToAdd){
        return moveService.addMove(moveToAdd);
    }
}
