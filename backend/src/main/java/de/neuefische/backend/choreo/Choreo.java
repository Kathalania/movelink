package de.neuefische.backend.choreo;

import org.springframework.data.annotation.Id;

import java.util.List;

public record Choreo(
        @Id
        String id,
        String name,
        List<String> moveIds

        ) {
}
