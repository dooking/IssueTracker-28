import React, { useState, useEffect } from 'react';
import {
  useMilestonesState,
  useMilestonesDispatch,
  getMilestones,
  updateMilestoneStatus,
  deleteMilestone
} from '@contexts/MilestonesContext';
import Milestone from './Milestone';
import { MilestoneIcon, CheckIcon } from '@primer/octicons-react';
import Spinner from '@images/spinner3.gif';
import S from './style';

function List() {
  const state = useMilestonesState();
  const dispatch = useMilestonesDispatch();
  const { data, loading, error } = state.milestones;
  const [status, setStatus] = useState(0); // open: 0, close: 1

  useEffect(() => {
    toggleStatus();
  });

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = () => {
    getMilestones(dispatch);
  };

  const handleStatus = (status) => {
    setStatus(status);
  };

  const toggleStatus = () => {
    const $countWrapper = document.querySelectorAll('.count-wrapper');
    $countWrapper.forEach((element) => element.classList.remove('show'));

    const $open = document.querySelector('.open');
    const $close = document.querySelector('.close');

    if ($open === null) return;

    status === 0 ? $open.classList.add('show') : $close.classList.add('show');
  };

  const handleStatusClick = (id, status) => {
    updateMilestoneStatus(dispatch, {
      id,
      status: status === 'open' ? 1 : 0
    });

    fetchData();
  };

  const handleDeleteClick = (id) => {
    deleteMilestone(dispatch, { id });
    fetchData();
  };

  if (loading) return <S.LoadSpinner src={Spinner} />;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return <button onClick={fetchData}>불러오기</button>;

  const { milestoneCnt, milestones } = data;
  const [openCnt, closedCnt] = milestoneCnt;

  return (
    <S.ListWrapper>
      <S.ListHeader>
        <S.CountWrapper className='count-wrapper open' onClick={() => handleStatus(0)}>
          <MilestoneIcon />
          <S.Count>{openCnt} Open</S.Count>
        </S.CountWrapper>
        <S.CountWrapper className='count-wrapper close' onClick={() => handleStatus(1)}>
          <CheckIcon />
          <S.Count>{closedCnt} Closed</S.Count>
        </S.CountWrapper>
      </S.ListHeader>
      <S.List>
        {milestones && milestones.map(milestone => {
          const milestoneStatus = milestone.status === 'open' ? 0 : 1;
          if (milestoneStatus === status) {
            return <Milestone
              key={milestone.id}
              milestone={milestone}
              handleStatusClick={handleStatusClick}
              handleDeleteClick={handleDeleteClick}
            />
          }
        })}
      </S.List>
    </S.ListWrapper>
  );
}

export default List;