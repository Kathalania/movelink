package de.neuefische.backend.move;

import org.springframework.data.annotation.Id;

public record Move(
        @Id
        String id,
        String name,
        String description,
        String style,
        String count,
        String start,
        String end
) {
}
