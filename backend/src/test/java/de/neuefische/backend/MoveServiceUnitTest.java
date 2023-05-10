package de.neuefische.backend;

import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveInterface;
import de.neuefische.backend.move.MoveService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
    void getMoveById_ShouldReturnException_WhenIdNotFound() {
        //GIVEN
        when(moveInterface.findById("2")).thenThrow(NoSuchElementException.class);

        //WHEN

        Assertions.assertThrows(NoSuchElementException.class, () -> moveService.getMoveById("2"));
        verify(moveInterface).findById("2");
    }

}
