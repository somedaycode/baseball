import styled from 'styled-components';

import HeaderNotice from 'components/GamePlay/playHeader/HeaderNotice';

const HeaderRight = () => {
  return (
    <HeaderRightWrap>
      <HeaderNotice type="pitcher" />
      <HeaderNotice type="hitter" />
    </HeaderRightWrap>
  );
};

export default HeaderRight;

const HeaderRightWrap = styled.div`
  padding: 0.5rem 0;
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;