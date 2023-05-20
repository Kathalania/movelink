package de.neuefische.backend.choreo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChoreoRepo extends MongoRepository<Choreo, String> {
}
