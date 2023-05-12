package de.neuefische.backend;

import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveInterface;
import de.neuefische.backend.move.MoveService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

@SpringBootTest
class MoveServiceUnitTest {


    private final MoveInterface moveInterface = mock(MoveInterface.class);
    private final MoveService moveService = new MoveService(moveInterface);

    @DirtiesContext
    @Test
    void addMove_ShouldReturnAddedMove_WhenMoveAdded() {
        //GIVEN

        Move tuckTurn = new Move("1", "Tuck Turn", "Rotational Rockstep, eindrehen, unter Arm durchdrehen über rechte Schulter", "Lindy Hop",
                "6-count", "geschlossen", "offen");
        when(moveInterface.save(tuckTurn))
                .thenReturn(tuckTurn);
        //WHEN
        Move actual = moveService.addMove(tuckTurn);

        //THEN
        verify(moveInterface).save(tuckTurn);
        assertEquals(actual, tuckTurn);

    }

    @DirtiesContext
    @Test
    void getMoveById_ShouldReturnMoveWithGivenId() {
        //GIVEN
        Move moveWithId = new Move("123", "Move", "", "", "", "", "");
        when(moveInterface.findById("123")).thenReturn(Optional.of(moveWithId));

        //WHEN
        Move actual = moveService.getMoveById("123");

        //THEN
        Move expected = new Move("123", "Move", "", "", "", "", "");
        verify(moveInterface).findById("123");
        assertEquals(actual, expected);
    }

    @Test
    @DirtiesContext
    void getMoveById_shouldReturnException_WhenIdNotFound() {
        //GIVEN
        when(moveInterface.findById("2")).thenThrow(NoSuchElementException.class);

        //WHEN

        Assertions.assertThrows(NoSuchElementException.class, () -> moveService.getMoveById("2"));
    }

    @Test
    @DirtiesContext
    void getMoveById_shouldReturnException_whenIdNotFound_AlternativeTest() {
        //GIVEN
        when(moveInterface.findById("2")).thenThrow(NoSuchElementException.class);

        //WHEN
        try {
            moveService.getMoveById("2");
            fail();

        }
        //THEN
        catch (NoSuchElementException Ignored) {
            verify(moveInterface).findById("2");
        }
    }

    @Test
    @DirtiesContext
    void getAllMoves_shouldReturnListOfAllMoves() {
        //GIVEN
        Move move1 = new Move("5", "", "", "", "", "", "");
        Move move2 = new Move("67", "", "", "", "", "", "");

        List<Move>expectedMoves = Arrays.asList(move1, move2);
        when(moveInterface.findAll()).thenReturn(expectedMoves);

        //WHEN
        List<Move> actualMoves = moveService.getAllMoves();

        //THEN
        assertEquals(actualMoves.size(), expectedMoves.size());
        for (int i = 0; i < expectedMoves.size(); i++) {
            Assertions.assertEquals(expectedMoves.get(i), actualMoves.get(i));
        }
        verify(moveInterface, times(1)).findAll();
    }

    @Test
    @DirtiesContext
    void getAllMoves_shouldReturnEmptyList_whenDatabaseIsEmpty() {
        //GIVEN
        when(moveInterface.findAll()).thenReturn(Collections.emptyList());

        //WHEN
        List<Move> actual = moveService.getAllMoves();
        List<Move> expected = new ArrayList<>();

        //THEN
        verify(moveInterface).findAll();
        assertEquals(actual, expected);
    }

    @Test
    @DirtiesContext
    void deleteMoveById_shouldReturnDeleteSuccessful() {
        //GIVEN
        Move moveToDelete = new Move("16", "Lösch mich", "Rotational Rockstep, eindrehen, unter Arm durchdrehen über rechte Schulter", "Lindy Hop",
                "6-count", "geschlossen", "offen");
        moveInterface.save(moveToDelete);
        //WHEN
        moveService.deleteMove("16");

        //THEN
        verify(moveInterface).deleteById("16");
    }

    @Test
    @DirtiesContext
    void editMove_ShouldReturnEditedMove_whenIdIsValid(){
        //GIVEN
        Move editedMove = new Move("3", "Edit Move", "", "", "4", "", "");
        when(moveInterface.save(editedMove)).thenReturn(editedMove);

        //WHEN
        Move actual = moveService.editMove(editedMove);

        //THEN
        verify(moveInterface).save(editedMove);
        assertEquals(actual, editedMove);

    }

}
