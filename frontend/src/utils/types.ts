export type TypographyVariantType =
  | 'h1'
  | 'h2'
  | 'subtitle1'
  | 'body1'
  | 'body2'
  | 'caption2'
  | 'caption1'
  | undefined
  | 'caption3';

export type HeaderVariants = 'Plain' | 'Main' | 'Detailed';
export type ButtonVariants = 'text' | 'contained';
export type CandidateTableDataType = {
  id: number;
  name: string;
  status: ChipLabelVariants;
  adjudication: ChipLabelVariants | '';
  location: string;
  date: Date | string;
};

export type InputTypeVariants = 'text' | 'password';
export type InfoBoxDataType = {
  label: string;
  value: string | number | undefined;
  infoIconSrc: string;
};
export type CourtSearchDataType = {
  id: number;
  violation: string;
  status: CourtStatusVariants;
  completedAt: Date;
  candidateId?: number;
};

export type ChipLabelVariants =
  | 'CLEAR'
  | 'ENGAGE'
  | 'CONSIDER'
  | 'ADVERSE ACTION'
  | 'SCHEDULED';

export type CourtStatusVariants = 'CLEAR' | 'CONSIDER';

export type candidateInformationTableDataType = {
  name: string;
  adjudication: string;
  status: string;
  location: string;
  date: string;
};

export type CandidateDataType = {
  id?: number;
  name: string;
  location: string;
  dateOfBirth: string;
  phone: number;
  zipCode: number;
  socialSecurityNumber: string;
  driverLicense: string;
  createdAt?: string;
  email: string;
  report?: ReportDataType;
  courtSearches?: CourtSearchDataType[];
  userId?:number
};

export type ReportDataType = {
  id: number;
  adjudication: string;
  status: string;
  packageType: string;
  createdAt: string;
  completedAt?: string;
  turnAroundTime?:string;
};

export type FilterObjectType = {
  status: string;
  adjudication: string;
  prevStatusIndex?: number;
  prevAdjudicationIndex?: number;
};

export type PaginationObjectType = {
  pageNumber: number;
  pageLimit: number;
};
export type SignInContentType = 'Signin' | 'Signup';

export type PreAdverseMailSubjectContentType = string[];
export type FilterPopupVariants = 'candidate' | 'preadverseActions';
export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type SignInSignUpContentType = {
  contentTypeText: string;
  textContent: string;
  checkboxText: string;
  buttonClickMethod: () => void;
  subtextContent: string;
  navigateTo: string;
};

export type OTPType = {
  id: number;
  userId: number;
  otp: string;
};

export type ResetPasswordContentType = {
  head: string;
  subtext: string;
  textFieldContent: React.ReactNode;
  buttonText: string;
  buttonDisabledCondition: boolean;
  buttonClickFunction: () => void;
};

export type ResetPasswordDataType = {
  emailInput: string;
  otpInputs: string[];
};

export type ResetPasswordErrorsType = {
  emailErrorMessage: string;
  otpErrorMessage: string;
};

export type SignInSignUpDataType = {
  emailInput: string;
  password: string;
  confirmPassword: string;
};

export type SignInSignUpShowPasswordType = {
  showPassword: boolean;
  showConfirmPassword: boolean;
};

export type SignInSignUpErrorsType = {
  emailErrorMessage: string;
  passwordErrorMessage: string;
  confirmPasswordErrorMessage: string;
  otherErrorMessage: string;
};

export type InfoBoxLabelandIconSrcType = {
  label: string;
  infoIconSrc: string;
};

export type AdverseActionData = {
  id: number;
  name: string;
  status: ChipLabelVariants;
  preNoticeDate: Date;
  postNoticeDate: Date;
};

export type TableType = 'court-search' | 'adverse-action' | 'candidate';
