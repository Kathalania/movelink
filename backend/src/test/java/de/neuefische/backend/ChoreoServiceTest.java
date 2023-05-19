package de.neuefische.backend;

import de.neuefische.backend.choreo.Choreo;
import de.neuefische.backend.choreo.ChoreoDTO;
import de.neuefische.backend.choreo.ChoreoRepo;
import de.neuefische.backend.choreo.ChoreoService;
import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveInterface;
import de.neuefische.backend.move.MoveService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
class ChoreoServiceTest {

    private ChoreoRepo choreoRepo;
    private MoveInterface moveInterface;
    private ChoreoService choreoService;

    @BeforeEach
    public void setUp() {
        choreoRepo = mock(ChoreoRepo.class);
        moveInterface = mock(MoveInterface.class);
        MoveService moveService = new MoveService(moveInterface);
        choreoService = new ChoreoService(choreoRepo, moveService);
    }

    @DirtiesContext
    @Test
    void getAllChoreos_ShouldReturnListOfAllChoreos() {
        // GIVEN
        Move move1 = new Move("1", "Move 1", "description", "Lindy Hop", "6", "open", "open");
        Move move2 = new Move("2", "Move 2", "description", "Lindy Hop", "4", "open", "open");
        Move move3 = new Move("3", "Move 3", "description", "Lindy Hop", "8", "open", "open");
        List<Move> choreoMoves = List.of(move1, move2, move3);

        Choreo choreo1 = new Choreo("1", "Choreo 1", List.of("1", "2", "3"));
        Choreo choreo2 = new Choreo("2", "Choreo 2", List.of("1", "2", "3", "2", "1"));
        List<Choreo> expectedChoreos = Arrays.asList(choreo1, choreo2);

        when(choreoRepo.findAll()).thenReturn(expectedChoreos);

        // WHEN
        List<ChoreoDTO> actualChoreos = choreoService.getAllChoreos();

        // THEN
        verify(choreoRepo, times(1)).findAll();
        assertEquals(1, actualChoreos.size());
    }

    @DirtiesContext
    @Test
    void getChoreoById_ShouldReturnChoreoWithMoves() {
        // GIVEN
        String choreoId = "1";
        Choreo expectedChoreo = new Choreo(choreoId, "Choreo 1", List.of("1", "2", "3"));
        when(choreoRepo.findById(choreoId)).thenReturn(Optional.of(expectedChoreo));

        List<Move> expectedMoves = new ArrayList<>();
        expectedMoves.add(new Move("1", "Move 1", "description", "Lindy Hop", "6", "open", "open"));
        expectedMoves.add(new Move("2", "Move 2", "description", "Lindy Hop", "4", "open", "open"));
        expectedMoves.add(new Move("3", "Move 3", "description", "Lindy Hop", "8", "open", "open"));

        when(moveInterface.findById("1")).thenReturn(Optional.of(new Move("1", "Move 1", "description", "Lindy Hop", "6", "open", "open")));
        when(moveInterface.findById("2")).thenReturn(Optional.of(new Move("2", "Move 2", "description", "Lindy Hop", "4", "open", "open")));
        when(moveInterface.findById("3")).thenReturn(Optional.of(new Move("3", "Move 3", "description", "Lindy Hop", "8", "open", "open")));

        // WHEN
        ChoreoDTO actualChoreoDTO = choreoService.getChoreoById(choreoId);

        // THEN
        verify(choreoRepo, times(1)).findById(choreoId);
        assertEquals(expectedChoreo.id(), actualChoreoDTO.id());
        assertEquals(expectedChoreo.name(), actualChoreoDTO.name());
        assertEquals(expectedMoves, actualChoreoDTO.choreoMoves());
    }

    @DirtiesContext
    @Test
    void getChoreoById_WithInvalidId_ShouldThrowNoSuchElementException() {
        // GIVEN
        String choreoId = "1";
        when(choreoRepo.findById(choreoId)).thenReturn(Optional.empty());

        // WHEN / THEN
        NoSuchElementException exception = assertThrows(
                NoSuchElementException.class,
                () -> choreoService.getChoreoById(choreoId)
        );
        assertEquals("Choreo with id " + choreoId + " not found!", exception.getMessage());
        verify(choreoRepo, times(1)).findById(choreoId);
    }
}





