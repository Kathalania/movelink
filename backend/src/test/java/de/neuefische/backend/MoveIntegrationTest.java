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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    @Test
    @DirtiesContext
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


}