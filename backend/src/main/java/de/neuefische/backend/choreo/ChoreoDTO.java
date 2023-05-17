package de.neuefische.backend.choreo;

import de.neuefische.backend.move.Move;

import java.util.List;

public record ChoreoDTO (
        String id,
        String name,
        List<Move> choreoMoves

) {
}
