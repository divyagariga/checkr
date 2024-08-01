package com.checkr.adverseactionservice.service;

import com.checkr.adverseactionservice.dto.AdverseActionCreationDTO;
import com.checkr.adverseactionservice.entity.AdverseAction;
import com.checkr.adverseactionservice.mapper.AdverseActionMapper;
import com.checkr.adverseactionservice.repository.AdverseActionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.checkr.adverseactionservice.constants.AdverseActionConstants.ADVERSE_ACTION_NOTICE_PERIOD;

@Service
public class AdverseActionServiceImplementation implements AdverseActionService {
    private static final Logger logger = LoggerFactory.getLogger(AdverseActionServiceImplementation.class);
    private final AdverseActionRepository adverseActionRepository;
    private final AdverseActionMapper adverseActionMapper;

    @Autowired
    public AdverseActionServiceImplementation(AdverseActionMapper adverseActionMapper, AdverseActionRepository adverseActionRepository) {
        this.adverseActionMapper = adverseActionMapper;
        this.adverseActionRepository = adverseActionRepository;
    }

    @Override
    public List<AdverseAction> getAllAdverseActions() {
        logger.info("getting list of all adverse actions");
        return adverseActionRepository.findAll();
    }

    @Override
    public AdverseAction addAdverseAction(AdverseActionCreationDTO adverseActionCreationDTO) {
        logger.info("Adding adverse actions");
        AdverseAction adverseAction = getAdverseActionAfterSettingData(adverseActionCreationDTO);
        return adverseActionRepository.save(adverseAction);
    }

    private AdverseAction getAdverseActionAfterSettingData(AdverseActionCreationDTO adverseActionCreationDTO) {
        AdverseAction theAdverseAction = adverseActionMapper.convertDtoToEntity(adverseActionCreationDTO);
        LocalDateTime preNoticeDate = LocalDateTime.now();
        theAdverseAction.setPostNoticeDate(preNoticeDate.plusDays(ADVERSE_ACTION_NOTICE_PERIOD));
        return theAdverseAction;
    }
}