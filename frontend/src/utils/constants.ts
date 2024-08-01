import {
  InfoBoxDataType,
  CandidateTableDataType,
  CourtSearchDataType,
  AdverseActionData,
} from './types';
import User from '../../public/assets/icons/user.svg';
import Email from '../../public/assets/icons/email.svg';
import Security from '../../public/assets/icons/security.svg';
import Zipcode from '../../public/assets/icons/zipcode.svg';
import Calendar from '../../public/assets/icons/calendar.svg';
import License from '../../public/assets/icons/license.svg';
import Phone from '../../public/assets/icons/phone.svg';
import Clear from '../../public/assets/icons/clear.svg';
import Hammer from '../../public/assets/icons/hammer.svg';
import Package from '../../public/assets/icons/package.svg';
import Clock from '../../public/assets/icons/clock.svg';
import CalenderCompleted from '../../public/assets/icons/calendarInfo.svg';
import Home from '../../public/assets/icons/home.svg';
import Candidate from '../../public/assets/icons/candidates.svg';
import Logs from '../../public/assets/icons/logs.svg';
import Analytics from '../../public/assets/icons/analytics.svg';
import Account from '../../public/assets/icons/account.svg';
import Screenings from '../../public/assets/icons/screenings.svg';

export const CHECKBOX_CLICKED = 'checkbox clicked';
export const UNCHECKED_ICON_ALT = 'uncheckedIcon';
export const CHECKED_ICON_ALT = 'checkedIcon';
export const BUTTON_CLICKED = 'button clicked';
export const PREVIEW_NOTICE = 'Preview Notice';
export const MANUAL_ORDER = 'Create Candidate';
export const SIGNUP = 'Sign up';
export const PREADVERSE_ACTION = 'Pre-Adverse Action';
export const GOOGLE_SIGNIN_TEXT = 'Sign in with Google';
export const GITHUB_SIGNIN_TEXT = 'Sign in with GitHub';
export const AVATAR_ALT_TEXT = 'user avatar image';
export const BACK_BUTTON_ALT_TEXT = 'back button';
export const EXPORT = 'Export';
export const ENGAGE = 'Engage';
export const PAGE_HEADINGS = {
  CANDIDATE: 'Candidates',
  ADVERSE_ACTION: 'Adverse Actions',
  PRE_ADVERSE_ACTION: 'Pre-Adverse Action Notice',
};
export const RECRUIT = 'RECRUIT';
export const LOGOUT = 'logout';
export const FUNCTIONAL_NAVITEMS_COUNT = 2;
export const INITIAL_NAV_ITEMS = [true, false];
export const SIDE_NAV_DATA = [
  {
    id: 2,
    iconSrc: Home,
    label: 'Home',
  },
  {
    id: 0,
    iconSrc: Candidate,
    label: 'Candidates',
  },
  {
    id: 1,
    iconSrc: Hammer,
    label: 'Adverse Actions',
  },
  // {
  //   id: 3,
  //   iconSrc: Logs,
  //   label: 'Logs',
  // },
  // {
  //   id: 4,
  //   iconSrc: Analytics,
  //   label: 'Analytics',
  // },
  // {
  //   id: 5,
  //   iconSrc: Account,
  //   label: 'Account',
  // },
  // {
  //   id: 6,
  //   iconSrc: Screenings,
  //   label: 'Screenings',
  // },
];
export const USER_NAME = 'James Rodriguez';
export const USER_EMAIL = 'James.co';

export const CANDIDATE_TABLE_HEAD = [
  'NAME',
  'ADJUDICATION',
  'STATUS',
  'LOCATION',
  'DATE',
];

export const COURT_SEARCH_HEAD = ['SEARCH', 'STATUS', 'DATE'];

export const COURT_SEARCH_DATA: CourtSearchDataType[] = [
  {
    searchCategory: 'SSN Verification',
    status: 'CLEAR',
    date: new Date(),
    id: 1,
    candidateId: 2,
  },
  {
    searchCategory: 'Sex Offender',
    status: 'CLEAR',
    date: new Date(),
    id: 1,
    candidateId: 2,
  },
  {
    searchCategory: 'Global Watchlist',
    status: 'CONSIDER',
    date: new Date(),
    id: 1,
    candidateId: 2,
  },
  {
    searchCategory: 'Federal Criminal',
    status: 'CLEAR',
    date: new Date(),
    id: 1,
    candidateId: 2,
  },
  {
    searchCategory: 'Country Criminal',
    status: 'CLEAR',
    date: new Date(),
    id: 1,
    candidateId: 2,
  },
];

export const CANDIDATE_TABLE_DATA: CandidateTableDataType[] = [
  {
    id: 1,
    name: 'John Smith',
    adjudication: 'ENGAGE',
    status: 'CLEAR',
    location: 'Barollile',
    date: new Date(),
  },
  {
    id: 2,
    name: 'Serene',
    adjudication: '',
    status: 'CLEAR',
    location: 'Vanersborg',
    date: new Date(),
  },
  {
    id: 3,
    name: 'Walsh',
    adjudication: '',
    status: 'CONSIDER',
    location: 'Sukamanah',
    date: new Date(),
  },
  {
    id: 4,
    name: 'Maurizia',
    adjudication: '',
    status: 'CLEAR',
    location: 'Sukamanah',
    date: new Date(),
  },
  {
    id: 5,
    name: 'Kendre',
    adjudication: '',
    status: 'CLEAR',
    location: 'Beutong Ateuh',
    date: new Date(),
  },
  {
    id: 6,
    name: 'Erastus',
    adjudication: '',
    status: 'CLEAR',
    location: 'Höviyn Am',
    date: new Date(),
  },
  {
    id: 7,
    name: 'Jereme',
    adjudication: '',
    status: 'CONSIDER',
    location: 'Sharïngol',
    date: new Date(),
  },
  {
    id: 8,
    name: 'John Smith',
    adjudication: '',
    status: 'CONSIDER',
    location: 'Lianyun',
    date: new Date(),
  },
  {
    id: 9,
    name: 'Cari',
    adjudication: '',
    status: 'CLEAR',
    location: 'Taboão da Serra',
    date: new Date(),
  },
  {
    id: 10,
    name: 'Kimble',
    adjudication: '',
    status: 'CONSIDER',
    location: 'Veselí nad Moravou',
    date: new Date(),
  },
];
export const NUMBER_OF_RECORDS_PER_PAGE = '10 per page';
export const OTP_SUCCESS_MESSAGE = 'OTP has been sent to your email!';
export const MAIL_SENT_SUCCESS_MESSAGE =
  'Pre-Advance Action notice successfully sent';
export const EXPORT_SUCCESS_MESSAGE = 'Report has downloaded successfully';
export const CREATED_CANDIDATE_SUCCESS_MESSAGE = 'Candidate is created successfully';
export const EXPORT_CANDIDATE_POPUP_HEAD = 'Export Candidate Reports CSV';
export const EXPORT_BUTTON = 'Export Report';
export const CONFIRM_LOGOUT_HEADER = 'Confirm Logout';
export const LOGOUT_CONFIRMATION_MESSAGE = 'Are you sure you want to logout?';
export const LOGOUT_BUTTON = 'Logout';
export const CANCEL_BUTTON = 'Cancel';
export const REPORTS_FROM = 'Reports From';
export const REPORTS_TO = 'Reports To';
export const CONFIRM_LOGOUT = 'Confirm Logout';
export const LOGOUT_WARNING = 'Are you sure you want to logout?';
export const LOGOUT_BUTTON_CLICKED = 'logout button clicked';
export const CLOSE_MODAL_CLICKED = 'close modal clicked';
export const CLICKED_PAGINATION_ICONS = 'clicked pagination icons';
export const EMAIL_PLACEHOLDER = 'abc@gmail.com';
export const PASSWORD_PLACEHOLDER = '********';
export const SEARCH_BAR_PLACEHOLDER = 'Search any candidate';
export const USER_INFO_CARD_LABEL = 'Name';
export const USER_INFO_CARD_VALUE = 'John Smith';
export const EMAIL_INFO_CARD_LABEL = 'Email';
export const EMAIL_INFO_CARD_VALUE = 'John.smith@checkr.com';
export const CREATED_DATE_INFO_CARD_LABEL = 'Created At ';
export const CREATED_DATE_INFO_CARD_VALUE = 'Nov 29,2016 11:05:57 AM';
export const TEST_TEXTFIELD_PLACEHOLDER = 'Test Placeholder';
export const TEST_TEXTFIELD_VALUE = 'Test Value';
export const TEST_TEXTFIELD_PASSWORD = 'Password';
export const MOCK_CANDIDATE_INFO_DATA: InfoBoxDataType[] = [
  { label: 'Name', value: 'John Smith', infoIconSrc: User },
  { label: 'Email', value: 'John.smith@checkr.com', infoIconSrc: Email },
  { label: 'DOB', value: '1990-09-10 (26)', infoIconSrc: License },
  { label: 'Phone', value: '(555) 555-5555', infoIconSrc: Phone },
  { label: 'Zipcode', value: '94158', infoIconSrc: Zipcode },
  { label: 'Social Security', value: 'XXX-XX-6789', infoIconSrc: Security },
  { label: 'Drivers License', value: 'FTEST1111 (CA)', infoIconSrc: License },
  {
    label: 'Created At',
    value: 'Nov 29,2016 11:05:57 AM',
    infoIconSrc: Calendar,
  },
];
export const MOCK_REPORT_INFO_DATA: InfoBoxDataType[] = [
  { label: 'Status', value: 'Clear', infoIconSrc: Clear },
  {
    label: 'Adjudication ',
    value: '-',
    infoIconSrc: Hammer,
  },
  { label: 'Package', value: 'Employee pro', infoIconSrc: Package },
  {
    label: 'Created At',
    value: 'Dec 1, 2016 12:00:00 PM',
    infoIconSrc: Calendar,
  },
  {
    label: 'Completed Date',
    value: 'Dec 4, 2016 12:00:00 PM',
    infoIconSrc: CalenderCompleted,
  },
  {
    label: 'Turn Around Time ',
    value: '1 Day , 14 hours',
    infoIconSrc: Clock,
  },
];
export const CANDIDATE_ACCORDION_HEADING = 'Candidate Information';
export const REPORT_ACCORDION_HEADING = 'Report Information';
export const ICON_CLICKED = 'icon clicked';
export const EXPORT_BUTTON_TEXT = 'Export';
export const SIGNIN = 'Sign in';
export const SIGNIN_TEXT_CONTENT = 'Please enter your login credentials';
export const SIGNUP_TEXT_CONTENT =
  'Please sign up to start exploring the platform';
export const EMAIL = 'Email';
export const CONFIRM_PASSWORD = 'Confirm Password';
export const AGREE_TO = 'I agree to the';
export const PRIVACY_POLICY = 'Privacy Policy';
export const REMEMBER_ME = 'Remember me';
export const FORGOT_PASSWORD = 'Forgot password?';
export const ALREADY_MEMBER = 'Already a member?';
export const DONT_HAVE_AN_ACCOUNT = 'Dont have an account?';
export const OR = 'or';
export const EMAIL_REGEX = /[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/;
export const EMAIL_HELPER_TEXT = 'Please enter valid Email';
export const PASSWORD_HELPER_TEXT =
  'Password should contain alpha numerics, atleast one special character and minimum length of 8 characters';
export const CONFIRM_PASSWORD_HELPER_TEXT =
  'Please enter same password in both Password and Confirm Password fields';
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
export const USER_NOT_FOUND = 'User not found';
export const PASSWORD = 'Password';
export const MAIL_USER_MESSAGE_TOP_TEXT =
  'You recently authorized checkr-bpo (“the company”) to obtain consumer reports and/or invistigate consumer reportsabout you from a consumer reporting agency. The Company is considering taking action in whole or in past on information in such report(s) including the following specific items identified in the report prepared by Checkr, Inc.';
export const MAIL_USER_MESSAGE_BOTTOM_TEXT =
  'If you wish to dispute the accuracy of the information in the report directly with the consumer reporting agency (i.e., the source of the informationcontained in the report), you should contact the agency identifield above directly.';
export const SINCERELY = 'Sincerely,';
export const CHECKER_BPO = 'Checkr-bpo';
export const PRE_ADVERSE_ACTION_CHARGES_CAPTION =
  'Select the charges for the pre adverse action';
export const ASSAULT_DOMESTIC_VIOLENCE = 'Assault Domestic Violence';
export const ALL_CHARGES = [
  'Driving while license suspended',
  'Assault Domestic Violence',
  'Unable to verify employment history at Dunder Mifflin',
];
export const ATTACHMENTS = 'Attachments';
export const ATTACH_DOC_NAMES: string[] = [
  'Summary of right under the FCRA',
  'Copy of background report',
];
export const HIGHLIGHTED_MAIL_CONTENT: string[] = [
  'Please carefully review the list of charges (in bold) and your contact information.',
  'Please note that we will send the corresponding post adverse action email automatically after 7 days.',
];
export const PREADVERSE_ACTION_MAIL_SUBJECT =
  'Pre-adverse action notice - checkr-bpo';
export const PREADVERSE_ACTION_SUBJECT_TEXTS: string[] = [
  'From: ',
  'To: ',
  'Subject: ',
];
export const AUTO_SEND_MESSAGE = 'Auto send post adverse action';
export const DAYS = 'Days';
export const AUTO_SEND_DAYS_COUNT = 7;
export const SUBMIT_NOTICE = 'Submit Notice';
export const SAMPLE_FROM_EMAIL = 'kyle@checkr.com';
export const SAMPLE_TO_EMAIL = 'john.smith@checkr.com';
export const SAMPLE_CANDIDATE_NAME = 'John Smith';
export const SUBMIT_CLICKED = 'Submit clicked';
export const PREADVERSE_ACTION_NOTICE = 'Pre-Adverse Action Notice';
export const DRIVING_WHILE_LICENSE_SUSPENDED =
  'Driving while license suspended';
export const UNABLE_TO_VERIFY_EMPLOYMENT_HISTORY =
  'Unable to verify employment history at Dunder Mifflin';
export const FILTER_BUTTON_TEXT = 'Filter';
export const FILTER_POPUP_HEADING = 'Filters';
export const ADJUDICATION = 'Adjudication';
export const CANDIDATES_STATUS_FILTER_OPTIONS = [
  'All Status',
  'Clear',
  'Consider',
];
export const CANDIDATES_STATUS_FILTER_OPTION_VALUES = ['', 'Clear', 'Consider'];
export const CANDIDATES_ADJUDICATION_FILTER_OPTIONS = [
  'All',
  'Engage',
  'Pre adverse action',
];
export const CANDIDATES_ADJUDICATION_FILTER_OPTION_VALUES = [
  '',
  'Engage',
  'Adverse Action',
];
export const PREADVERSE_ACTION_STATUS_FILTER_OPTIONS = [
  'All Status',
  'Pending',
  'Scheduled',
  'Dispute',
  'Canceled',
  'Undeliverable',
];
export const MOCK_CANDIDATE_STATUS_CHECKBOXES = [false, false, false];
export const MOCK_CANDIDATE_ADJUDICATION_CHECKBOXES = [false, false, true];
export const INITIAL_CANDIDATE_STATUS_CHECKBOXES = [true, false, false];
export const INITIAL_PRE_ADVERSE_CHECKBOXES = [
  true,
  false,
  false,
  false,
  false,
  false,
];
export const INITIAL_CANDIDATE_ADJUDICATION_CHECKBOXES = [true, false, false];
export const ALL_UNCHECKED_CHECKBOXES_VALUES = [false, false, false];
export const TABLE_ROWS_KEYS = 'tableRowsKey';
export const TABLE_COLUMNS_KEYS = 'tableColumnsKey';
export const DEFAULT_CANDIDATE_RECORDS_PER_PAGE = 10;
export const RESULTS_FOUND = 'results found';
export const TEST_CANDIDATE_NAME = 'Serene';
export const MOCK_CANDIDATE_DATA: CandidateTableDataType[] = [
  {
    id: 1,
    name: 'John Smith',
    status: 'CLEAR',
    adjudication: 'ENGAGE',
    location: 'Barrouallie',
    date: new Date('7/2/2022'),
  },
  {
    id: 2,
    name: 'Serene',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Vänersborg',
    date: new Date('7/2/2022'),
  },
  {
    id: 3,
    name: 'Walsh',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Sukamanah',
    date: new Date('7/2/2022'),
  },
  {
    id: 4,
    name: 'Maurizia',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Sukamanah',
    date: new Date('7/2/2022'),
  },
  {
    id: 5,
    name: 'Kendre',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Beutong Ateuh',
    date: new Date('7/2/2022'),
  },
  {
    id: 6,
    name: 'Erastus',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Höviyn Am',
    date: new Date('7/2/2022'),
  },
  {
    id: 7,
    name: 'Jereme',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Sharïngol',
    date: new Date('7/2/2022'),
  },
  {
    id: 8,
    name: 'Gaurav Shukla',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Lianyun',
    date: new Date('7/2/2022'),
  },
  {
    id: 9,
    name: 'Cari',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Taboão da Serra',
    date: new Date('7/2/2022'),
  },
  {
    id: 10,
    name: 'mock smith',
    status: 'CONSIDER',
    adjudication: '',
    location: 'Veselí nad Moravou',
    date: new Date('7/2/2022'),
  },
];
export const GO_BACK = 'Go Back';
export const RESET_TEXT = 'No worries, we’ll send you reset instructions';
export const RESET_PASSWORD = 'Reset Password';
export const CONTINUE = 'Continue';
export const OTP_SUBTEXT = 'Didn’t receive the OTP?';
export const RESEND_OTP = 'Resend OTP';
export const OTP_HEAD = 'Please enter OTP';
export const OTP_TEXT = 'OTP has been sent to your email';
export const RESET_EMAIL_PLACEHOLDER = 'Example@gmail.com';
export const OTP_HELPER_TEXT = 'Please enter valid OTP';
export const RESET_CLICKED = 'Reset clicked';
export const OTP_TEXTFIELD_KEY = [
  'OtpTextfield 1',
  'OtpTextfield 2',
  'OtpTextfield 3',
  'OtpTextfield 4',
];
export const COMPONENT = 'component';
export const DATEPICKER_ERROR_MESSAGE =
  'Report To Date should be greater than or equal to Report From Date';
export const EXPORT_CONFIRMATION_TIMEOUT = 3000;
export const OTP_MAX_LENGTH = 1;
export const CANDIDATE_DETAILS_INFOBOX_LABELS_AND_ICONSRC = [
  { label: 'Name', infoIconSrc: User },
  { label: 'Email', infoIconSrc: Email },
  { label: 'DOB', infoIconSrc: License },
  { label: 'Phone', infoIconSrc: Phone },
  { label: 'Zipcode', infoIconSrc: Zipcode },
  { label: 'Social Security', infoIconSrc: Security },
  { label: 'Drivers License', infoIconSrc: License },
  {
    label: 'Created At',
    infoIconSrc: Calendar,
  },
];
export const CANDIDATE_REPORT_INFOBOX_LABELS_AND_ICONSRC = [
  { label: 'Status', infoIconSrc: Clear },
  {
    label: 'Adjudication ',
    infoIconSrc: Hammer,
  },
  { label: 'Package', infoIconSrc: Package },
  {
    label: 'Created At',
    infoIconSrc: Calendar,
  },
  {
    label: 'Completed Date',
    infoIconSrc: CalenderCompleted,
  },
  {
    label: 'Turn Around Time ',
    infoIconSrc: Clock,
  },
];
export const COURT_SEARCH_TABLE_HEADING = 'Court Searches';
export const MOCK_CANDIDATE_DETAILS = {
  id: 1,
  name: 'John Smith',
  location: 'Barrouallie',
  dob: '1990-09-10 (26)',
  phone: 55555555555,
  zipcode: 94158,
  socialSecurityNumber: 'XXX-XX-6789',
  driverLicense: 'FTEST1111 (CA)',
  createdDate: 'Nov 29,2016 11:05:57 AM',
  email: 'John.smith@checkr.com',
};
export const MOCK_CANDIDATE_REPORT_DATA = {
  id: 1,
  candidateId: 1,
  adjudication: 'ENGAGE',
  status: 'CLEAR',
  package: 'Employee pro',
  createdDate: 'Dec 1, 2016 12:00:00 PM',
  completedDate: 'Dec 4, 2016 12:00:00 PM',
};
export const MOCK_CANDIDATE_COURT_SEARCHES = [
  {
    id: 1,
    candidateId: 1,
    searchCategory: 'SSN Verification',
    status: 'CLEAR',
    date: '2/22/2022',
  },
  {
    id: 2,
    candidateId: 1,
    searchCategory: 'Global Watchlist',
    status: 'CLEAR',
    date: '7/2/2022',
  },
  {
    id: 3,
    candidateId: 1,
    searchCategory: 'SSN Verification',
    status: 'CLEAR',
    date: '2/22/2022',
  },
  {
    id: 4,
    candidateId: 1,
    searchCategory: 'Global Watchlist',
    status: 'CLEAR',
    date: '7/2/2022',
  },
  {
    id: 5,
    candidateId: 1,
    searchCategory: 'SSN Verification',
    status: 'CLEAR',
    date: '2/22/2022',
  },
];
export const AUTH_CONTEXT_ERROR = 'useAuth must be used within an AuthProvider';
export const LOGIN_ERROR_MESSAGE = 'Invalid user email or password';
export const TEST_EMAIL = 'test@gmail.com';
export const TEST_PASSWORD = 'Test@123';
export const NUMBER_OF_OTP_TEXTFIELDS = 4;
export const SIGNIN_CONTENT_TYPE = 'Signin';
export const SIGNUP_CONTENT_TYPE = 'Signup';
export const TIMEOUT_RESET_PASSWORD = 3000;
export const ROUTES = {
  CANDIDATE_PAGE: '/',
  PRE_ADVERSE_ACTION_PAGE: '/pre-adverse-action',
  ADVERSE_ACTION_PAGE: '/adverse-actions',
};
export const ADVERSE_ACTION_DATA: AdverseActionData[] = [
  {
    id: 1,
    name: 'John Smith',
    status: 'SCHEDULED',
    preNoticeDate: new Date('2/22/2022'),
    postNoticeDate: new Date('2/22/2022'),
  },
  {
    id: 2,
    name: 'Serene',
    status: 'SCHEDULED',
    preNoticeDate: new Date('3/13/2022'),
    postNoticeDate: new Date('3/13/2022'),
  },
  {
    id: 3,
    name: 'Walsh',
    status: 'SCHEDULED',
    preNoticeDate: new Date('7/2/2022'),
    postNoticeDate: new Date('7/2/2022'),
  },
  {
    id: 4,
    name: 'Maurizia',
    status: 'SCHEDULED',
    preNoticeDate: new Date('2/20/2022'),
    postNoticeDate: new Date('2/20/2022'),
  },
  {
    id: 5,
    name: 'Kendre',
    status: 'SCHEDULED',
    preNoticeDate: new Date('5/19/2022'),
    postNoticeDate: new Date('5/19/2022'),
  },
  {
    id: 6,
    name: 'Erastus',
    status: 'SCHEDULED',
    preNoticeDate: new Date('12/1/2021'),
    postNoticeDate: new Date('12/1/2021'),
  },
  {
    id: 7,
    name: 'Jereme',
    status: 'SCHEDULED',
    preNoticeDate: new Date('7/26/2022'),
    postNoticeDate: new Date('7/26/2022'),
  },
  {
    id: 8,
    name: 'John Smith',
    status: 'SCHEDULED',
    preNoticeDate: new Date('5/28/2022'),
    postNoticeDate: new Date('5/28/2022'),
  },
  {
    id: 9,
    name: 'Cari',
    status: 'SCHEDULED',
    preNoticeDate: new Date('5/23/2022'),
    postNoticeDate: new Date('5/23/2022'),
  },
  {
    id: 10,
    name: 'Kimble',
    status: 'SCHEDULED',
    preNoticeDate: new Date('8/24/2022'),
    postNoticeDate: new Date('8/24/2022'),
  },
];
export const ADVERSE_ACTION_TABLE_HEAD = [
  'NAME',
  'STATUS',
  'PRENOTICEDATE',
  'POSTNOTICEDATE',
];
export const ADVERSE_ACTION_RECORDS_COUNT = 20;
export const ADVERSE_ACTION_PER_PAGE_COUNT = 10;
export const ENGAGE_CANDIDATE_STATUS_TEXT = 'ENGAGE';
