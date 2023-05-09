package de.neuefische.backend;

import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveInterface;
import de.neuefische.backend.move.MoveService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class MoveServiceUnitTest {
    @Test
    void addMove_ShouldReturnAddedMove_WhenMoveAdded(){
        //GIVEN
        MoveInterface moveInterface = mock(MoveInterface.class);
        MoveService moveService = new MoveService(moveInterface);

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

    void getMoveById_ShouldReturnMoveWithGivenId(){

    }
}
