package com.checkr.adverseactionservice.service;

import com.checkr.adverseactionservice.constants.AdverseActionConstants;
import com.checkr.adverseactionservice.dto.AdverseActionCreationDTO;
import com.checkr.adverseactionservice.entity.AdverseAction;
import com.checkr.adverseactionservice.mapper.AdverseActionMapper;
import com.checkr.adverseactionservice.repository.AdverseActionRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdverseActionServiceImplementationTests {

    @Mock
    private AdverseActionRepository adverseActionRepository;

    @Mock
    private AdverseActionMapper adverseActionMapper;

    @InjectMocks
    private AdverseActionServiceImplementation adverseActionService;
    @Test
    void getAllAdverseActions() {
        AdverseAction adverseAction = new AdverseAction();
        List<AdverseAction> adverseActionList = new ArrayList<>();
        adverseActionList.add(adverseAction);
        when(adverseActionRepository.findAll()).thenReturn(adverseActionList);
        assertEquals(adverseActionList, adverseActionService.getAllAdverseActions());
    }

    @Test
    void addAdverseAction() {
        int id=1;
        AdverseActionCreationDTO sampleAdverseActionCreationDTO = new AdverseActionCreationDTO();
        AdverseAction adverseAction = new AdverseAction();
        adverseAction.setCandidateId(1);
        adverseAction.setStatus(AdverseActionConstants.AdverseActionStatus.SCHEDULED);
        when(adverseActionMapper.convertDtoToEntity(sampleAdverseActionCreationDTO)).thenReturn(adverseAction);
        when(adverseActionRepository.save(adverseAction)).thenReturn(adverseAction);
        AdverseAction result = adverseActionService.addAdverseAction(sampleAdverseActionCreationDTO);
        assertEquals(adverseAction, result);
    }
}