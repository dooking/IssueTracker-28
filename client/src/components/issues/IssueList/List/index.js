import React, { useEffect } from 'react';
import { useIssuesState, useIssuesDispatch, getIssues } from '@contexts/IssuesContext';
import {IssueOpenedIcon} from '@primer/octicons-react'
import {filterIssue} from '@utils/filterIssue'
import Issue from './Issue'
import S from './style.js';

function List() {
  const state = useIssuesState();
  const dispatch = useIssuesDispatch();
  const { data: issues, loading, error} = state.issues;
  const {filters} = state;

  const fetchData = () => {
    getIssues(dispatch);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div> 로딩중.. </div>;
  if (error) return <div> 에러가 발생했습니다 </div>;
  if (!issues) return <button onClick={fetchData}> 불러오기 </button>;

  const filteredIssues = issues.filter((issue)=>{return filterIssue(issue, filters)})

  return (
    <div className="list-wrapper">
      {filteredIssues.length > 0 
        ? 
        filteredIssues.map((issue) => (
          <Issue key={issue.id} issue={issue}/>))
           :
          <S.NoResultsBox>
            <IssueOpenedIcon size={35} className="issue-opened-icon"/>
            <span>No results matched your search.</span>
          </S.NoResultsBox>
      }
    </div>
  );
}

export default List;
