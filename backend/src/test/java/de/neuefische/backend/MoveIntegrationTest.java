package de.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveInterface;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MoveIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    MoveInterface moveInterface;
    @Autowired
    ObjectMapper objectMapper;

    @DirtiesContext
    @Test
    void addMove_shouldReturnAddedMove() throws Exception {
        String actual = mockMvc.perform(post("/api/moves/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id": "2",
                                "name": "Send Out",
                                "description": "Follower nach Rockstep rausschicken",
                                "style": "Lindy Hop",
                                "count": "6-count",
                                "start": "closed",
                                "end": "open"
                                }
                                """
                        )
                )
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "id": "2",
                                "name": "Send Out",
                                "description": "Follower nach Rockstep rausschicken",
                                "style": "Lindy Hop",
                                "count": "6-count",
                                "start": "closed",
                                "end": "open"
                                }
                                """
                ))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Move actualMove = objectMapper.readValue(actual, Move.class);
        assertThat(actualMove.id())
                .isNotBlank();
    }

    @DirtiesContext
    @Test
    void getMoveById_shouldReturnMoveWithId() throws Exception {
        Move moveWithId = new Move("1", "", "", "", "", "", "");
        moveInterface.save(moveWithId);

        mockMvc.perform(get("/api/moves/1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                        "id": "1",
                        "name": "",
                        "description": "",
                        "style": "",
                        "count": "",
                        "start": "",
                        "end": ""
                        }
                        """));
    }

    @DirtiesContext
    @Test
    void getAllMoves_shouldReturnAllMovesAdded() throws Exception {
        Move move1 = new Move("5", "a", "", "", "1", "", "");
        moveInterface.save(move1);
        Move move2 = new Move("67", "b", "", "", "2", "", "");
        moveInterface.save(move2);
        Move move3 = new Move("246", "c", "", "", "3", "", "");
        moveInterface.save(move3);

        mockMvc.perform(get("/api/moves"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                [
                                {    "id":"5",
                                     "name":"a",
                                     "description":"",
                                     "style":"",
                                     "count": "1",
                                     "start": "",
                                     "end": ""
                                },
                                {    "id":"67",
                                     "name":"b",
                                     "description":"",
                                     "style":"",
                                     "count": "2",
                                     "start": "",
                                     "end": ""
                                },
                                {    "id":"246",
                                     "name":"c",
                                     "description":"",
                                     "style":"",
                                     "count": "3",
                                     "start": "",
                                     "end": ""
                                }
                                ]
                                """
                ));
    }

    @DirtiesContext
    @Test
    void getAllMoves_shouldReturnAllMoves() throws Exception {
        mockMvc.perform(get("/api/moves"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }

    @DirtiesContext
    @Test
    void deleteMove_shouldReturnReducedContent() throws Exception {
        String saveResult = mockMvc.perform(
                        post("/api/moves/add")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                        "name":"Lösch mich",
                                        "description":"",
                                        "style":"",
                                        "count": "10",
                                        "start": "",
                                        "end": ""
                                        }
                                        """)
                )
                .andReturn()
                .getResponse()
                .getContentAsString();
        Move saveResultMove = objectMapper.readValue(saveResult, Move.class);
        String id = saveResultMove.id();

        mockMvc.perform(delete("/api/moves/" + id)
                )
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/moves"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }

    @DirtiesContext
    @Test
    void editMoveById_ShouldReturnEditedMove() throws Exception {
        mockMvc.perform(put("/api/moves/1234/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id":"1234",
                                "name":"Edited Move",
                                "description":"",
                                "style":"Lindy Hop",
                                "count": "6-count",
                                "start": "open",
                                "end": "open"
                                }
                                """
                        ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                               {
                               "id":"1234",
                               "name":"Edited Move",
                                "description":"",
                                "style":"Lindy Hop",
                                "count": "6-count",
                                "start": "open",
                                "end": "open"
                                }
                               """
                ));
    }

    @DirtiesContext
    @Test
    void editMoveById_shouldReturnBadRequest() throws Exception {
        mockMvc.perform(put("/api/moves/1234/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "id":"13",
                                    "name":"Bad Request",
                                    "description":"",
                                    "style":"Lindy Hop",
                                    "count": "6-count",
                                    "start": "open",
                                    "end": "open"
                                }
                                """))
                .andExpect(status().isBadRequest());
    }
}