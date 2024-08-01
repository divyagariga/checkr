import styled from '@emotion/styled';

interface AnimationProps {
  src: string;
  alt: string;
}

const StyledAnimation = styled('img')({
  width: '200px',
  height: '200px',
});

const Animation = ({ src, alt }: AnimationProps) => {
  return <StyledAnimation src={src} alt={alt} />;
};

export default Animation;
