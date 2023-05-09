package de.neuefische.backend.move;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MoveInterface extends MongoRepository<Move, String> {
}
