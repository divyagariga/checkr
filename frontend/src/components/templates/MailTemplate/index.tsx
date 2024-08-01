import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../Theme/theme';
import {
  ATTACHMENTS,
  ATTACH_DOC_NAMES,
  AUTO_SEND_DAYS_COUNT,
  AUTO_SEND_MESSAGE,
  CHECKER_BPO,
  DAYS,
  HIGHLIGHTED_MAIL_CONTENT as WARNING_MAIL_CONTENT,
  MAIL_USER_MESSAGE_BOTTOM_TEXT,
  MAIL_USER_MESSAGE_TOP_TEXT,
  PREADVERSE_ACTION_SUBJECT_TEXTS,
  PREVIEW_NOTICE,
  SINCERELY,
  SUBMIT_NOTICE,
} from '../../../utils/constants';
import { generateEmailGreeting } from '../../../utils/helperFunctions';
import {
  TypographyVariantType,
  PreAdverseMailSubjectContentType,
} from '../../../utils/types';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import AttachIcon from '../../../../public/assets/icons/attachicon.svg';
import React, { useMemo } from 'react';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';

interface IMailTemplateProps extends IMailSubjectProps {
  candidateName: string;
  middleContent: React.ReactNode;
  topTextVariant: TypographyVariantType;
  subjectContent: PreAdverseMailSubjectContentType;
  handleSubmitOrPreviewButtonClick: () => void;
  isDisable?: boolean;
}

interface IMailSubjectProps {
  isModalMail: boolean;
}

const StyledRowBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const StyledColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StyledMainTemplateBox = styled(Box)({
  height: '100%',
});

const StyledMainContainer = styled(StyledColumnBox)(
  ({ isModalMail }: IMailSubjectProps) => ({
    gap: '18px',
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.white.main,
    paddingBottom: '24px',
    paddingTop: isModalMail ? '0px' : '24px',
    borderRadius: isModalMail ? '4px' : '8px',
    height: '92%',
  }),
);

const StyledTextContainer = styled(StyledColumnBox)({
  gap: '18px',
});

const StyledBodyContainer = styled(StyledTextContainer)({
  padding: '0px 16px 16px',
});

const StyledSubjectBox = styled(StyledColumnBox)(
  ({ isModalMail }: IMailSubjectProps) => ({
    gap: '12px',
    width: isModalMail ? '80%' : '100%',
  }),
);

const StyledFromToTextContent = styled(Box)({
  paddingLeft: '16px',
});

const StyledAttachmentsBox = styled(StyledColumnBox)({
  gap: '12px',
  width: '40%',
});

const StyledEachAttachmentBox = styled(StyledRowBox)({
  gap: '8px',
});

const StyledHighlightBox = styled(StyledColumnBox)({
  padding: '16px',
  backgroundColor: theme.palette.accentRed.light,
  borderRadius: '4px',
  marginLeft: '16px',
});

const StyledSubjectSpan = styled('span')({
  color: theme.palette.textEmphasis.dark,
});

const StyledDemarcator = styled(Box)({
  borderTop: `1px solid ${theme.palette.stroke.main}`,
});

const StyledFooterBox = styled(StyledRowBox)(
  ({ isModalMail }: IMailSubjectProps) => ({
    borderTop: `1px solid ${theme.palette.stroke.main}`,
    justifyContent: !isModalMail ? 'space-between' : 'flex-end',
    padding: '16px',
    backgroundColor: theme.palette.white.main,
    height: '8%',
  }),
);

const StyledListOfHighlightedContent = styled('ul')({
  marginLeft: '20px',
  color: theme.palette.accentRed.main,
});

const StyledAutoSendBox = styled(StyledRowBox)({
  gap: '12px',
  alignItems: 'center',
});

const StyledTextfield = styled(TextField)({
  width: '15%',
  '& .MuiInputBase-root input': {
    borderRadius: '8px',
    paddingLeft: '0px',
    textAlign: 'center',
    marginTop: '0px',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

const MailTemplate = ({
  candidateName,
  middleContent,
  topTextVariant,
  isModalMail,
  subjectContent,
  isDisable,
  handleSubmitOrPreviewButtonClick,
}: IMailTemplateProps) => {
  return (
    <StyledMainTemplateBox>
      <StyledMainContainer
        data-testid="mail-template"
        isModalMail={isModalMail}
      >
        <StyledSubjectBox isModalMail={isModalMail}>
          <StyledTextContainer>
            {PREADVERSE_ACTION_SUBJECT_TEXTS.map((subjectText, index) => (
              <React.Fragment key={subjectText}>
                <StyledFromToTextContent>
                  <Typography
                    variant={'caption1'}
                    color={theme.palette.textEmphasis.main}
                  >
                    <StyledSubjectSpan>{subjectText}</StyledSubjectSpan>
                    {subjectContent[index]}
                  </Typography>
                </StyledFromToTextContent>
                {!isModalMail && <StyledDemarcator />}
              </React.Fragment>
            ))}
          </StyledTextContainer>
          {isModalMail && (
            <StyledHighlightBox>
              <StyledListOfHighlightedContent>
                {WARNING_MAIL_CONTENT.map((warningContent) => {
                  return (
                    <li key={warningContent}>
                      <Typography
                        variant={'caption2'}
                        color={theme.palette.accentRed.main}
                      >
                        {warningContent}
                      </Typography>
                    </li>
                  );
                })}
              </StyledListOfHighlightedContent>
            </StyledHighlightBox>
          )}
        </StyledSubjectBox>
        <StyledBodyContainer>
          <StyledTextContainer>
            <Typography
              variant={topTextVariant}
              color={theme.palette.textEmphasis.main}
            >
              {useMemo(() => {
                return generateEmailGreeting(candidateName);
              }, [candidateName])}
            </Typography>
            <Typography
              variant={topTextVariant}
              color={theme.palette.textEmphasis.main}
            >
              {MAIL_USER_MESSAGE_TOP_TEXT}
            </Typography>
          </StyledTextContainer>
          <StyledTextContainer>{middleContent}</StyledTextContainer>
          <StyledTextContainer>
            <Typography
              variant={'caption2'}
              color={theme.palette.textEmphasis.main}
            >
              {MAIL_USER_MESSAGE_BOTTOM_TEXT}
            </Typography>
          </StyledTextContainer>
          <StyledTextContainer>
            <Typography
              variant={'caption2'}
              color={theme.palette.textEmphasis.main}
            >
              {SINCERELY}
              <br />
              {CHECKER_BPO}
            </Typography>
          </StyledTextContainer>
          {isModalMail && (
            <StyledAttachmentsBox>
              <Typography
                variant={'caption1'}
                color={theme.palette.textEmphasis.dark}
              >
                {ATTACHMENTS}
              </Typography>
              {ATTACH_DOC_NAMES.map((attachDocument) => (
                <StyledEachAttachmentBox key={attachDocument}>
                  <Icon src={AttachIcon} alt={'attach'} />
                  <Typography
                    variant={'caption2'}
                    color={theme.palette.textEmphasis.main}
                  >
                    {attachDocument}
                  </Typography>
                </StyledEachAttachmentBox>
              ))}
            </StyledAttachmentsBox>
          )}
        </StyledBodyContainer>
      </StyledMainContainer>
      <StyledFooterBox isModalMail={isModalMail}>
        {!isModalMail && (
          <StyledAutoSendBox>
            <Typography
              variant={'body2'}
              color={theme.palette.textEmphasis.main}
            >
              {AUTO_SEND_MESSAGE}
            </Typography>
            <StyledTextfield
              variant={'outlined'}
              value={AUTO_SEND_DAYS_COUNT}
            />
            <Typography
              variant={'body2'}
              color={theme.palette.textEmphasis.main}
            >
              {DAYS}
            </Typography>
          </StyledAutoSendBox>
        )}
        <Button
          variant={'contained'}
          color={'primary500'}
          label={isModalMail ? SUBMIT_NOTICE : PREVIEW_NOTICE}
          labelColor={theme.palette.white.main}
          labelVariant={'body1'}
          disabled={isDisable}
          handleClick={handleSubmitOrPreviewButtonClick}
        />
      </StyledFooterBox>
    </StyledMainTemplateBox>
  );
};

export default React.memo(MailTemplate);
