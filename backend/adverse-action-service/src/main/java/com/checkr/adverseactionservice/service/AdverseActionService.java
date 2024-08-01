package com.checkr.adverseactionservice.service;

import com.checkr.adverseactionservice.dto.AdverseActionCreationDTO;
import com.checkr.adverseactionservice.entity.AdverseAction;

import java.util.List;

/**
 * Service interface for managing adverse actions.
 */
public interface AdverseActionService {
    /**
     * Retrieves a list of all adverse actions.
     *
     * @return List of AdverseAction objects representing all adverse actions.
     */
    List<AdverseAction> getAllAdverseActions();

    /**
     * Adds a new adverse action based on the provided AdverseActionCreationDTO.
     *
     * @param adverseActionCreationDTO The DTO containing information for creating a new adverse action.
     * @return The newly created AdverseAction object.
     */
    AdverseAction addAdverseAction(AdverseActionCreationDTO adverseActionCreationDTO);

}