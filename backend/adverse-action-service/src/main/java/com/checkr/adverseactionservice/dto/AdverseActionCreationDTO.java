package com.checkr.adverseactionservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import static com.checkr.adverseactionservice.constants.AdverseActionConstants.AdverseActionStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdverseActionCreationDTO {
    private AdverseActionStatus status;
    private int candidateId;
}
