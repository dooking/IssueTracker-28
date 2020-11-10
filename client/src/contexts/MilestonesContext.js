import React, { useReducer, createContext, useContext } from 'react';
import * as api from '@api/milestone';

const initialState = {
  milestones: {
    loading: false,
    data: null,
    error: null,
  },
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (err) => ({
  loading: true,
  data: null,
  err,
});

function milestoneReducer(state, action) {
  switch (action.type) {
    case 'GET_MILESTONES':
      return {
        ...state,
        milestones: loadingState,
      };
    case 'GET_MILESTONES_SUCCESS':
      return {
        ...state,
        milestones: success(action.data),
      };
    case 'GET_MILESTONES_ERROR':
      return {
        ...state,
        milestones: error(action.error),
      };
    default:
      return state;
  }
}

const MilestonesStateContext = createContext(null);
const MilestonesDispatchContext = createContext(null);

function MilestonesProvider({ children }) {
  const [state, dispatch] = useReducer(milestoneReducer, initialState);

  return (
    <MilestonesStateContext.Provider value={state}>
      <MilestonesDispatchContext.Provider value={dispatch}>
        {children}
      </MilestonesDispatchContext.Provider>
    </MilestonesStateContext.Provider>
  );
}

function useMilestonesState() {
  const state = useContext(MilestonesStateContext);

  if (!state) {
    throw new Error('Cannot find MilestonesProvider!');
  }
  return state;
}

function useMilestonesDispatch() {
  const dispatch = useContext(MilestonesDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find MilestonesProvider!');
  }
  return dispatch;
}

async function getMilestones(dispatch) {
  dispatch({ type: 'GET_MILESTONES' });
  try {
    const response = await api.getMilestones();
    dispatch({
      type: 'GET_MILESTONES_SUCCESS',
      data: response.data,
    });
  } catch (e) {
    dispatch({ type: 'GET_MILESTONES_ERROR', error: e });
  }
}

async function createMilestone(dispatch, params) {
  try {
    await api.createMilestone(params);
  } catch (e) {
    dispatch({ type: 'POST_MILESTONE_ERROR', error: e });
  }
}

export {
  MilestonesProvider,
  useMilestonesState,
  useMilestonesDispatch,
  getMilestones,
  createMilestone,
};