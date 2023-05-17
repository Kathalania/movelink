package de.neuefische.backend.choreo;

import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class ChoreoService {

    private final ChoreoRepo choreoRepo;
    private final MoveService moveService;

    public List<ChoreoDTO> getAllChoreos() {
        List<Choreo> choreos = choreoRepo.findAll();
        List<ChoreoDTO> choreoDTOList = new ArrayList<>();

        for (Choreo choreo : choreos) {
            ChoreoDTO choreoDTO = getChoreoById(choreo.id());
            choreoDTOList.add(choreoDTO);
        }
        return choreoDTOList;
    }

    public ChoreoDTO getChoreoById(String id) {
        Choreo choreo = choreoRepo.findById(id).orElseThrow(()
                -> new NoSuchElementException("Choreo with id " + id + " not found!"));
        List<Move> moveList = new ArrayList<>();

        for (int i = 0; i < choreo.moveIds().size(); i++) {
            Move move = moveService.getMoveById(choreo.moveIds().get(i));
            moveList.add(move);
        }
        return new ChoreoDTO(choreo.id(), choreo.name(), moveList);
    }
}
