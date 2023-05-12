package de.neuefische.backend.move;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class MoveService {
    private final MoveInterface moveInterface;

    public Move addMove(Move move) {
        return moveInterface.save(move);
    }

    public List<Move> getAllMoves() {
        return moveInterface.findAll();
    }

    public Move getMoveById(String id) {
        return moveInterface.findById(id).orElseThrow(()
                -> new NoSuchElementException("Move with id " + id + " not found!"));
    }

    public void deleteMove(String id) {
        moveInterface.deleteById(id);
    }
}
