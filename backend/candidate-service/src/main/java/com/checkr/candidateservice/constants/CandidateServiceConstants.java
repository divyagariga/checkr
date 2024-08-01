package com.checkr.candidateservice.constants;

public class CandidateServiceConstants {
    private CandidateServiceConstants() {

    }
    public static final String SEARCH_TYPE_CLEAR = "CLEAR";
    public static final String SEARCH_TYPE_CONSIDER = "CONSIDER";
    public static final String INVALID_PAGINATION_PAGE_SIZE_EXCEPTION = "Invalid pagination parameters: Page size must be non-negative.";
    public static final String INVALID_PAGINATION_PAGE_NUMBER_EXCEPTION = "Invalid pagination parameters: Page number must be non-negative.";
    public static final String[] COURT_SEARCH_VIOLATIONS = {"SSN Verification", "Sex Offender", "SSN Verification", "Federal Criminal", "Country Criminal"};
    public static final String[] COURT_SEARCH_STATUS = {SEARCH_TYPE_CLEAR,SEARCH_TYPE_CONSIDER,SEARCH_TYPE_CLEAR,SEARCH_TYPE_CLEAR,SEARCH_TYPE_CLEAR};
    public static final String SENT_MAIL = "Sent mail";
    public static final String SUBJECT = "Pre-adverse action notice - checkr-bpo";
    public static final String BODY =  "Dear %s,\n\n" +
            "You recently authorized %s (“the company”) to obtain consumer reports and/or investigate consumer reports about you from a consumer reporting agency. The Company is considering taking action in whole or in part on information in such report(s), including the following specific items identified in the report prepared by Checkr, Inc:\n\n" +
            "%s\n\n" +
            "If you wish to dispute the accuracy of the information in the report directly with the consumer reporting agency (i.e., the source of the information contained in the report), you should contact the agency identified above directly.\n\n" +
            "Sincerely,\n" +
            "%s";
    public static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";

}
