package de.neuefische.backend;

import de.neuefische.backend.choreo.Choreo;
import de.neuefische.backend.choreo.ChoreoDTO;
import de.neuefische.backend.choreo.ChoreoRepo;
import de.neuefische.backend.choreo.ChoreoService;
import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.bson.assertions.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
class ChoreoServiceTest {

    private ChoreoRepo choreoRepo;
    private MoveService moveService;
    private ChoreoService choreoService;

    @BeforeEach
    public void setUp() {
        choreoRepo = mock(ChoreoRepo.class);
        moveService = mock(MoveService.class);
        choreoService = new ChoreoService(choreoRepo, moveService);
    }

    @DirtiesContext
    @Test
    void getAllChoreos_ShouldReturnListOfAllChoreos() {
        //GIVEN
        Choreo choreo1 = new Choreo("1", "Choreo 1", List.of("1", "2", "3"));
        Choreo choreo2 = new Choreo("2", "Choreo 2", List.of("1", "2", "3", "2", "1"));
        List<Choreo> expectedChoreos = Arrays.asList(choreo1, choreo2);

        when(choreoRepo.findAll()).thenReturn(expectedChoreos);
        when(choreoRepo.findById("1")).thenReturn(Optional.of(choreo1));
        when(choreoRepo.findById("2")).thenReturn(Optional.of(choreo2));

        // WHEN
        List<ChoreoDTO> actualChoreos = choreoService.getAllChoreoDTOsByAllChoreos();

        // THEN
        verify(choreoRepo, times(1)).findAll();
        assertEquals(expectedChoreos.size(), actualChoreos.size());
    }

    @DirtiesContext
    @Test
    void getChoreoById_ShouldReturnChoreoDTO_WhenChoreoExists() {
        // GIVEN
        String choreoId = "1";
        Choreo choreo = new Choreo(choreoId, "Choreo 1", List.of("1", "2", "3"));

        Move move1 = new Move("1", "Move 1", "Description 1", "Style 1", "", "", "");
        Move move2 = new Move("2", "Move 2", "Description 2", "Style 2", "", "", "");
        Move move3 = new Move("3", "Move 3", "Description 3", "Style 3", "", "", "");

        when(choreoRepo.findById(choreoId)).thenReturn(Optional.of(choreo));
        when(moveService.getMoveById("1")).thenReturn(move1);
        when(moveService.getMoveById("2")).thenReturn(move2);
        when(moveService.getMoveById("3")).thenReturn(move3);

        ChoreoDTO expectedChoreoDTO = new ChoreoDTO(choreoId, "Choreo 1", List.of(move1, move2, move3));

        // WHEN
        ChoreoDTO actualChoreoDTO = choreoService.getChoreoDTOByChoreoId(choreoId);

        // THEN
        verify(choreoRepo, times(1)).findById(choreoId);
        verify(moveService, times(3)).getMoveById(Mockito.anyString());
        assertEquals(expectedChoreoDTO, actualChoreoDTO);
    }

    @Test
    void getChoreoById_ShouldThrowNoSuchElementException_WhenChoreoDoesNotExist() {
        // GIVEN
        String choreoId = "1";

        when(choreoRepo.findById(choreoId)).thenReturn(Optional.empty());

        // WHEN / THEN
        assertThrows(NoSuchElementException.class, () -> choreoService.getChoreoDTOByChoreoId(choreoId));
        verify(choreoRepo, times(1)).findById(choreoId);
        verify(moveService, never()).getMoveById(Mockito.anyString());
    }

    @DirtiesContext
    @Test
    void testCreateChoreoDTO() {
        // GIVEN
        List<String> moveIds = List.of("1", "2");
        Choreo choreo = new Choreo("13", "Choreo 13", moveIds);

        List<Move> expectedMoves = List.of(
                new Move("1", "move 1", "Description 1", "Style 1", "", "", ""),
                new Move("2", "move 2", "Description 2", "Style 2", "", "", "")
        );

        Mockito.when(moveService.getMoveById("1")).thenReturn(new Move("1", "move 1", "Description 1", "Style 1", "", "", ""));
        Mockito.when(moveService.getMoveById("2")).thenReturn(new Move("2", "move 2", "Description 2", "Style 2", "", "", ""));

        // WHEN
        ChoreoDTO result = choreoService.createChoreoDTO(choreo);

        // THEN
        Assertions.assertEquals(choreo.id(), result.id());
        Assertions.assertEquals(choreo.name(), result.name());
        Assertions.assertEquals(expectedMoves, result.choreoMoves());
    }

    @DirtiesContext
    @Test
    void deleteChoreoById_withChoreoDTOId_shouldReturnSuccessful_Delete() {
        //GIVEN
        ChoreoDTO choreoDTOToDelete = new ChoreoDTO("1", "Choreo 1", List.of(
                new Move("1", "Move 1", "", "", "", "", ""),
                new Move("2", "Move 2", "", "", "", "", ""),
                new Move("3", "Move 3", "", "", "", "", ""),
                new Move("2", "Move 2", "", "", "", "", "")));

        Choreo choreo = new Choreo("1", "Choreo 1", List.of("1", "2", "3", "2"));
        choreoRepo.save(choreo);

        //WHEN
        choreoService.deleteChoreo(choreoDTOToDelete);

        //THEN
        verify(choreoRepo).delete(choreo);
    }

    @DirtiesContext
    @Test
    void editChoreo_ShouldUpdateChoreo_WhenChoreoExists() {
        // GIVEN
        Choreo editedChoreo = new Choreo("2", "", List.of("3", "4", "5"));
        ChoreoDTO choreoDTO = new ChoreoDTO("2", "", List.of(
                new Move("3", "Updated Move 3", "", "", "", "", ""),
                new Move("4", "Updated Move 4", "", "", "", "", ""),
                new Move("5", "Updated Move 5", "", "", "", "", "")
        ));

        when(choreoRepo.save(editedChoreo)).thenReturn(editedChoreo);

        // WHEN
        choreoService.editChoreo(choreoDTO);

        // THEN
        verify(choreoRepo, times(1)).save(editedChoreo);
        assertEquals("", editedChoreo.name());
        assertEquals(3, editedChoreo.moveIds().size());
    }

    @Test
    void testEditChoreo_ShouldThrowNoSuchElementException_WhenChoreoDoesNotExist() {
        // GIVEN
        when(choreoRepo.findById("999")).thenThrow(NoSuchElementException.class);

        //WHEN

        try {
            choreoService.getChoreoDTOByChoreoId("999");
            fail();
        }
        catch (NoSuchElementException ignored) {
            verify(choreoRepo).findById("999");
        }
    }

    @DirtiesContext
    @Test
    void testAddChoreoDTO() {
        // GIVEN
        List<Move> choreoMoves = new ArrayList<>();
        choreoMoves.add(new Move("3", "Move 3", "", "Charleston", "4", "open", "closed"));
        choreoMoves.add(new Move("1", "Move 1", "", "Lindy Hop", "8", "open", "open"));
        choreoMoves.add(new Move("3", "Move 3", "", "Charleston", "4", "open", "closed"));

        List<String> moveIds = new ArrayList<>();
        moveIds.add("3");
        moveIds.add("1");
        moveIds.add("3");

        ChoreoDTO choreoDTO = new ChoreoDTO("2", "Choreo 2", choreoMoves);
        Choreo expectedChoreo = new Choreo(choreoDTO.id(), choreoDTO.name(), moveIds);

        when(choreoRepo.save(expectedChoreo)).thenReturn(expectedChoreo);

        // WHEN
        Choreo actualChoreo = choreoService.addChoreoByChoreoDTO(choreoDTO);

        // THEN
        verify(choreoRepo, times(1)).save(actualChoreo);
        assertEquals(expectedChoreo.id(), actualChoreo.id());
        assertEquals(expectedChoreo.name(), actualChoreo.name());
        assertEquals(expectedChoreo, actualChoreo);
    }


}