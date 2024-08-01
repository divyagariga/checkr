package com.checkr.candidateservice.mapper;

import com.checkr.candidateservice.dto.ReportDTO;
import com.checkr.candidateservice.entity.Report;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReportMapper {
    private final ModelMapper modelMapper;

    public ReportMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ReportDTO convertReportEntityToDTO(Report report) {
        return modelMapper.map(report, ReportDTO.class);
    }
}
