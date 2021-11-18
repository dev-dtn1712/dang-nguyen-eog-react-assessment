import * as actions from '../actions';

const initialState = {
  getMultipleMeasurements: [],
};

const mutipleMeasurementsDataReceived = (state, action) => {
  const { getMultipleMeasurements } = action;
  return { getMultipleMeasurements };
};

const newMeasurementsDataFailure = (state, action) => ({ ...state, error: action.error });

const mutipleMeasurementsDataFailure = (state, action) => ({ ...state, error: action.error });

const handlers = {
  [actions.METRICS_MEASUREMENTS_RECEIVED]: mutipleMeasurementsDataReceived,
  [actions.NEW_MEASUREMENTS_API_CALL_FAIL]: newMeasurementsDataFailure,
  [actions.MULTIPLE_MEASUREMENTS_API_CALL_FAIL]: mutipleMeasurementsDataFailure,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
