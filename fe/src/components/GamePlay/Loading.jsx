import styled, { keyframes } from 'styled-components';
import FlexCenter from 'styles/FlexCenter';

const Loading = () => {
  return (
    <GamePlayHeader>
      <Bar>
        <Indicator />
      </Bar>
      <StyledHeaderLeft>
        <Title>Loading...</Title>
        <GameScoreWrap>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </GameScoreWrap>
      </StyledHeaderLeft>
    </GamePlayHeader>
  );
};

export default Loading;
const SkeletonUI = keyframes`
  0% {
    transform: translateX(0);
    opacity: 0;
  }

  20% {
    opacity: 0.2;
  }

  50% {
    opacity: 0.7;
  }

  80% {
    opacity: 0.4;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const GamePlayHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  background-color: black;
  position: relative;
`;

const StyledHeaderLeft = styled(FlexCenter)`
  display: flex;
  width: 70%;
  height: 100%;
  flex-direction: column;
`;

const Title = styled.div`
  width: 382px;
  height: 42px;
  background-color: #292929;
  font-size: 40px;
  color: #323232;
`;

const GameScoreWrap = styled(FlexCenter)`
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 7rem;

  div {
    position: relative;
    background-color: #292929;

    width: 80px;
    height: 51px;
  }
`;

const Indicator = styled.div`
  width: 0;
  height: 100vh;
  box-shadow: 0 0 300px 500px black;
`;

const Bar = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 2;
  position: absolute;
  animation-name: ${SkeletonUI};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
`;
