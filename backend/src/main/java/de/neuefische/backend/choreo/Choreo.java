package de.neuefische.backend.choreo;

import de.neuefische.backend.move.Move;
import org.springframework.data.annotation.Id;

import java.util.Map;

public record Choreo(
        @Id
        String id,
        String name,
        Map<Move, String> choreo

        ) {
}
