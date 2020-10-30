import styled from 'styled-components';

export default {
  SearchBar: styled.input`
    display: flex;
    box-sizing: border-box;
    background: #f9f9f9;
    width: 500px;
    height: 35px;
    align-items: center;
    padding-left: 10px;
    font-size: 13px;
    outline: none;
    border: none;
    border-radius: 0px 4px 4px 0px;
    border-left: 1px solid #e0e0e0;
  `,
  IssueHeader: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  HeaderItemWrapper: styled.div`
    display: flex;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  `,
  FiltersButton: styled.button`
    background: linear-gradient(to bottom, #fff, #e9e9e9);
    border-radius: 4px 0px 0px 4px;
    color: #606060;
    display: flex;
    box-sizing: border-box;
    min-width: 80px;
    height: 35px;
    border: none;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    padding: 0px 13px;
    cursor: pointer;
    outline: none;
  `,
  FiltersWrapper: styled.div`
    position: relative;
    color: #606060;
    .filters-dropdown {
      width: 80px;
      height: 35px;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
    }
  `,
};
