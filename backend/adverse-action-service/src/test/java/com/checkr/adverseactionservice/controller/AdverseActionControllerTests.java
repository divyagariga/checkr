package com.checkr.adverseactionservice.controller;

import com.checkr.adverseactionservice.dto.AdverseActionCreationDTO;
import com.checkr.adverseactionservice.entity.AdverseAction;
import com.checkr.adverseactionservice.mapper.AdverseActionMapper;
import com.checkr.adverseactionservice.service.AdverseActionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static reactor.core.publisher.Mono.when;

@ExtendWith(MockitoExtension.class)
class AdverseActionControllerTests {

    @Mock
    private AdverseActionService adverseActionService;

    @Mock
    private AdverseActionMapper adverseActionMapper;

    @InjectMocks
    private AdverseActionController adverseActionController;

    @Test
    void testGetAllAdverseActions() {
        List<AdverseAction> adverseActionList = new ArrayList<>();
        Mockito.when(adverseActionService.getAllAdverseActions()).thenReturn(adverseActionList);
        ResponseEntity<List<AdverseAction>> response = adverseActionController.getAllAdverseActions();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(adverseActionList, response.getBody());
    }

    @Test
    void testSaveAdverseAction() {
        AdverseActionCreationDTO adverseActionDTO = new AdverseActionCreationDTO();
        AdverseAction adverseAction=new AdverseAction();
        Mockito.when(adverseActionService.addAdverseAction(adverseActionDTO)).thenReturn(adverseAction);
        Mockito.when(adverseActionMapper.convertEntityToDto(any(AdverseAction.class))).thenReturn(adverseActionDTO);
        ResponseEntity<AdverseActionCreationDTO> response = adverseActionController.addAdverseAction(adverseActionDTO);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(response.getBody(), adverseActionDTO);
    }
}
