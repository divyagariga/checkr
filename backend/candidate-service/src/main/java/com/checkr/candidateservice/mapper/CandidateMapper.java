package com.checkr.candidateservice.mapper;

import com.checkr.candidateservice.dto.CandidateDTO;
import com.checkr.candidateservice.entity.Candidate;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CandidateMapper {

    private final ModelMapper modelMapper;

    public CandidateMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CandidateDTO convertCandidateEntityToDTO(Candidate candidate) {
        return modelMapper.map(candidate, CandidateDTO.class);
    }

    public Candidate convertCandidateDTOtoEntity(CandidateDTO candidateDTO) {
        return modelMapper.map(candidateDTO, Candidate.class);
    }

    public List<CandidateDTO> convertCandidateEntitiesToDTOs(List<Candidate> candidatePage) {
        return candidatePage
                .stream()
                .map(candidate -> modelMapper.map(candidate, CandidateDTO.class))
                .collect(Collectors.toList());
    }
}
