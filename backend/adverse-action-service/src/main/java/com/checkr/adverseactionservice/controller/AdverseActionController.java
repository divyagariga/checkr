package com.checkr.adverseactionservice.controller;

import com.checkr.adverseactionservice.dto.AdverseActionCreationDTO;
import com.checkr.adverseactionservice.entity.AdverseAction;
import com.checkr.adverseactionservice.mapper.AdverseActionMapper;
import com.checkr.adverseactionservice.service.AdverseActionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/adverse-actions")
public class AdverseActionController {
    private final AdverseActionService adverseActionService;
    private final AdverseActionMapper adverseActionMapper;

    public AdverseActionController(AdverseActionService adverseActionService, AdverseActionMapper adverseActionMapper) {
        this.adverseActionService = adverseActionService;
        this.adverseActionMapper  = adverseActionMapper;
    }

    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<AdverseAction>> getAllAdverseActions() {
        return new ResponseEntity<>(adverseActionService.getAllAdverseActions(), HttpStatus.OK);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<AdverseActionCreationDTO> addAdverseAction(@Valid @RequestBody AdverseActionCreationDTO adverseAction) {
        AdverseAction adverseActionCreationResponse = adverseActionService.addAdverseAction(adverseAction);
        AdverseActionCreationDTO adverseActionCreationDTO = adverseActionMapper.convertEntityToDto(adverseActionCreationResponse);
        return new ResponseEntity<>(adverseActionCreationDTO, HttpStatus.CREATED);
    }
}
