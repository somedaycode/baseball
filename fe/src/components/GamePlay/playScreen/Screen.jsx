import { useContext, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoIosBaseball } from 'react-icons/io';

import { v4 as uuidv4 } from 'uuid';
import Noel from './Noel';
import { gamePlayContext } from 'components/GamePlay/GamePlay';
import BallCount from 'components/GamePlay/playScreen/BallCount';

const Screen = () => {
  const {
    ballCountState,
    dispatchBallCount,
    round,
    isAttacking,
    dispatchAwayCurrentPlayerState,
    dispatchHomeCurrentPlayerState,
  } = useContext(gamePlayContext);

  const initialAttackState = isAttacking ? ['초', '공격'] : ['초', '수비'];
  const [AttackState, setAttackState] = useState(initialAttackState);
  const currentRound = Math.floor(round / 2 + 1);
  const [isClicked, setIsClicked] = useState(false);
  const changeAttackState = ([first, attack]) => {
    const _first = first === '초' ? '말' : '초';
    const _attack = attack === '공격' ? '수비' : '공격';
    return [_first, _attack];
  };
  const [base, setBase] = useState([false, false, false, false]);
  const chooseNumber = () => Math.floor(Math.random() * 4);

  const getAction = (number) => {
    return {
      0: 'strike',
      1: 'ball',
      2: 'out',
      3: 'hit',
    }[number];
  };
  const num = base.filter((v) => v).length;

  const runForward = (number) => {
    if (number === 0) {
      setBase((base) => [true, false, false, false]);
    }
    if (number === 1) {
      setBase((base) => [true, true, false, false]);
    }
    if (number === 2) {
      setBase((base) => [true, true, true, false]);
    }
    if (number === 3) {
      setBase((base) => [true, true, true, true]);
    }
  };

  const handleClickPitch = () => {
    const ballCountAction = getAction(chooseNumber());
    if (ballCountAction === 'hit') runForward(num);
    dispatchBallCount({ payload: ballCountAction, attackState: isAttacking });
    setIsClicked((state) => !state);
  };

  useEffect(() => {
    const currentPlayeAction = {
      payload: 'updatePlayerHistory',
      ballCount: ballCountState,
    };
    if (isAttacking) dispatchAwayCurrentPlayerState(currentPlayeAction);
    if (!isAttacking) dispatchHomeCurrentPlayerState(currentPlayeAction);
  }, [isClicked]);

  useEffect(() => {
    if (!round) return;
    setAttackState((stateArr) => changeAttackState(stateArr));
  }, [round]);

  return (
    <StyledScreen>
      <ScreenField src="field.svg" alt="field" />
      <ScreenRound>
        {currentRound}회 {AttackState[0]} {AttackState[1]}
      </ScreenRound>
      <PitchButton onClick={handleClickPitch}>
        <IoIosBaseball />
      </PitchButton>
      <BallCount />
      {base.map((n, i) => (n ? <Noel idx={i} /> : null))}
    </StyledScreen>
  );
};

export default Screen;

const StyledScreen = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://upload.wikimedia.org/wikipedia/commons/8/80/Munhak_baseball_stadium_2012.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const ScreenField = styled.img`
  height: fit-content;
  width: 27%;
  transform: rotate(45deg);
`;
const ScreenRound = styled.span`
  font-size: ${({ theme }) => `${theme.fontSizes.BASE}rem`};
  font-weight: ${({ theme }) => `${theme.weights.BASE}`};
  color: ${({ theme }) => `${theme.colors.white}`};
  position: absolute;
  right: 2%;
  top: 4%;
`;
const rotateAnimation = keyframes`
0%{
  transform: rotate(0deg) scale(1);
}
50%{
  transform: rotate(180deg) scale(1.5);
}
100%{
  transform: rotate(360deg) scale(1);
}
`;

const PitchButton = styled.button`
  height: 5rem;
  width: fit-content;
  position: absolute;
  left: 50%;
  top: 50%;
  cursor: pointer;
  font-size: 5rem;
  color: white;
  background: none;
  transform: translate(-50%, -50%);

  &:hover {
    svg {
      animation: ${rotateAnimation} 4s linear infinite;
    }
    &:active {
      svg {
        border-radius: 50%;
        background-color: #e84545;
      }
    }
  }
`;