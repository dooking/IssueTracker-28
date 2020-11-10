import styled from 'styled-components';

export default {
  MainContent: styled.div`
    width: 100%;
  `,
  InputWrappers: styled.div`
    width: 78%;
    height: ${(props) => props.wrapperHeight};
    border: 1px solid rgb(225, 228, 232);
    margin: 30px;
    margin-left: 110px;
  `,
  FlexWrapper: styled.div`
    display: flex;
  `,
};
