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

    public ChoreoDTO createChoreoDTO(Choreo choreo) {
        List<Move> moves = new ArrayList<>();

        for (String moveId : choreo.moveIds()) {
            Move move = moveService.getMoveById(moveId);
            moves.add(move);
        }
        return new ChoreoDTO(choreo.id(), choreo.name(), moves);
    }

    public List<ChoreoDTO> getAllChoreoDTOsByAllChoreos() {
        List<Choreo> choreos = choreoRepo.findAll();
        List<ChoreoDTO> choreoDTOList = new ArrayList<>();

        for (Choreo choreo : choreos) {
            ChoreoDTO choreoDTO = createChoreoDTO(choreo);
            choreoDTOList.add(choreoDTO);
        }
        return choreoDTOList;
    }

    public ChoreoDTO getChoreoDTOByChoreoId(String id) {
        Choreo choreo = choreoRepo.findById(id).orElseThrow(()
                -> new NoSuchElementException("Choreo with id " + id + " not found!"));

        return createChoreoDTO(choreo);
    }


    public Choreo editChoreo(ChoreoDTO choreoToEdit) {
        Choreo existingChoreo = new Choreo(choreoToEdit.id(), choreoToEdit.name(), choreoToEdit.choreoMoves().stream()
                .map(Move::id)
                .toList());
        return choreoRepo.save(existingChoreo);
    }

    public void deleteChoreo(ChoreoDTO choreoToDelete){
        Choreo existingChoreo = new Choreo(choreoToDelete.id(), choreoToDelete.name(), choreoToDelete.choreoMoves().stream()
                .map(Move::id)
                .toList());

        choreoRepo.delete(existingChoreo);
    }

    public Choreo addChoreoByChoreoDTO(ChoreoDTO choreoDTO){
        List<String> moveIds = new ArrayList<>(choreoDTO.choreoMoves().size());
        for (Move move : choreoDTO.choreoMoves()) {
            moveIds.add(move.id());
        }
        Choreo choreoFromDTO = new Choreo(choreoDTO.id(), choreoDTO.name(), moveIds);

        return choreoRepo.save(choreoFromDTO);
    }
}
