package com.checkr.adverseactionservice.mapper;

import com.checkr.adverseactionservice.dto.AdverseActionCreationDTO;
import com.checkr.adverseactionservice.entity.AdverseAction;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdverseActionMapper {

    private final ModelMapper modelMapper;

    @Autowired
    public AdverseActionMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public AdverseAction convertDtoToEntity(AdverseActionCreationDTO adverseActionCreationDTO) {
        return modelMapper.map(adverseActionCreationDTO, AdverseAction.class);
    }

    public AdverseActionCreationDTO convertEntityToDto(AdverseAction adverseAction) {
        return modelMapper.map(adverseAction, AdverseActionCreationDTO.class);
    }
}
