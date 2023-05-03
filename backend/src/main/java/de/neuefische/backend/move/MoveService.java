package de.neuefische.backend.move;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class MoveService {
    private final MoveInterface moveInterface;

    public Move addMove(Move move){
        return moveInterface.save(move);
    }
}
