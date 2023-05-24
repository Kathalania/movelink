package de.neuefische.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.choreo.Choreo;
import de.neuefische.backend.choreo.ChoreoDTO;
import de.neuefische.backend.choreo.ChoreoRepo;
import de.neuefische.backend.move.Move;
import de.neuefische.backend.move.MoveInterface;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ChoreoIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ChoreoRepo choreoRepo;
    @Autowired
    MoveInterface moveInterface;
    @Autowired
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        Move move1 = new Move("1", "a", "", "", "1", "", "");
        moveInterface.save(move1);
        Move move2 = new Move("2", "b", "", "", "2", "", "");
        moveInterface.save(move2);
        Move move3 = new Move("3", "c", "", "", "3", "", "");
        moveInterface.save(move3);
    }

    @DirtiesContext
    @Test
    void getChoreoById_shouldReturnChoreoWithId() throws Exception {
        Choreo choreoWithId = new Choreo("1", "", List.of("1", "2", "3"));
        choreoRepo.save(choreoWithId);

        ChoreoDTO choreoDTO = new ChoreoDTO("1", "", moveInterface.findAll());

        mockMvc.perform(get("/api/choreo/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(choreoDTO)));
    }

    @Test
    void getAllChoreos_shouldReturnAllChoreos() throws Exception {
        Choreo choreo1 = new Choreo("1", "", List.of("1", "2", "3"));
        choreoRepo.save(choreo1);
        Choreo choreo2 = new Choreo("2", "", List.of("2", "3", "3"));
        choreoRepo.save(choreo2);
        Choreo choreo3 = new Choreo("3", "", List.of("1", "3"));
        choreoRepo.save(choreo3);

        Move move1 = new Move("1", "a", "", "", "1", "", "");
        moveInterface.save(move1);
        Move move2 = new Move("2", "b", "", "", "2", "", "");
        moveInterface.save(move2);
        Move move3 = new Move("3", "c", "", "", "3", "", "");
        moveInterface.save(move3);

        ChoreoDTO choreoDTO1 = new ChoreoDTO("1", "", List.of(move1, move2, move3));
        ChoreoDTO choreoDTO2 = new ChoreoDTO("2", "", List.of(move2, move3, move3));
        ChoreoDTO choreoDTO3 = new ChoreoDTO("3", "", List.of(move1, move3));

        List<ChoreoDTO> expectedChoreos = List.of(choreoDTO1, choreoDTO2, choreoDTO3);

        mockMvc.perform(get("/api/choreo"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedChoreos)));
    }

    @DirtiesContext
    @Test
    void getAllChoreos_shouldReturnEmptyList_whenNoChoreos() throws Exception {
        mockMvc.perform(get("/api/choreo"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                []
                                """
                ));
    }

    @DirtiesContext
    @Test
    void deleteChoreo_shouldReturnReducedContent() throws Exception {
        Choreo choreo1 = new Choreo("1", "", List.of("1", "2", "3"));
        choreoRepo.save(choreo1);
        Choreo choreo2 = new Choreo("2", "", List.of("2", "3", "3"));
        choreoRepo.save(choreo2);
        Choreo choreo3 = new Choreo("3", "", List.of("1", "3"));
        choreoRepo.save(choreo3);

        Move move1 = new Move("1", "a", "", "", "1", "", "");
        moveInterface.save(move1);
        Move move2 = new Move("2", "b", "", "", "2", "", "");
        moveInterface.save(move2);
        Move move3 = new Move("3", "c", "", "", "3", "", "");
        moveInterface.save(move3);

        ChoreoDTO choreoDTO1 = new ChoreoDTO("1", "", List.of(move1, move2, move3));
        ChoreoDTO choreoDTO2 = new ChoreoDTO("2", "", List.of(move2, move3, move3));
        ChoreoDTO choreoDTO3 = new ChoreoDTO("3", "", List.of(move1, move3));

        String choreoToDeleteId = choreoDTO1.id();
        List<ChoreoDTO> expectedChoreos = List.of(choreoDTO2, choreoDTO3);

        mockMvc.perform(delete("/api/choreo/" + choreoToDeleteId)
                )
                .andExpect(status().isOk());


        mockMvc.perform(get("/api/choreo"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(expectedChoreos)));
    }

    @DirtiesContext
    @Test
    void editChoreo_ShouldReturnEditedChoreo() throws Exception {
        Choreo choreo1 = new Choreo("1", "Edited Choreo", List.of("1", "2", "3"));
        choreoRepo.save(choreo1);

        Move move1 = new Move("1", "a", "", "", "1", "", "");
        moveInterface.save(move1);
        Move move2 = new Move("2", "b", "", "", "2", "", "");
        moveInterface.save(move2);
        Move move3 = new Move("3", "c", "", "", "3", "", "");
        moveInterface.save(move3);

        ChoreoDTO choreoDTOToEdit = new ChoreoDTO("1", "Edited Choreo", List.of(move1, move2, move3));


        mockMvc.perform(put("/api/choreo/1/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(choreoDTOToEdit)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(choreo1)));
    }

    @DirtiesContext
    @Test
    void editChoreoById_shouldReturnBadRequest_WhenIdDoesntMatch() throws Exception {
        Choreo choreo1 = new Choreo("1", "Edited Choreo", List.of("1", "2", "3"));
        choreoRepo.save(choreo1);

        Move move1 = new Move("1", "a", "", "", "1", "", "");
        moveInterface.save(move1);
        Move move2 = new Move("2", "b", "", "", "2", "", "");
        moveInterface.save(move2);
        Move move3 = new Move("3", "c", "", "", "3", "", "");
        moveInterface.save(move3);

        ChoreoDTO choreoDTOToEdit = new ChoreoDTO("20", "Edited Choreo", List.of(move1, move2, move3));

        mockMvc.perform(put("/api/choreo/1/edit")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(choreoDTOToEdit)))
                .andExpect(status().isBadRequest());
    }
}
