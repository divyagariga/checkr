package com.checkr.candidateservice.mapper;

import com.checkr.candidateservice.dto.CourtSearchDTO;
import com.checkr.candidateservice.entity.CourtSearch;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CourtSearchMapper {
    private final ModelMapper modelMapper;

    public CourtSearchMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public List<CourtSearchDTO> convertToCourtSearchDTOS(List<CourtSearch> courtSearches) {
        return courtSearches.stream()
                .map(courtSearch -> modelMapper.map(courtSearch, CourtSearchDTO.class))
                .collect(Collectors.toList());
    }

}
