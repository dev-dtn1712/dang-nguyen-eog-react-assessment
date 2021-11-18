import { useEffect } from 'react';
import { useSubscription } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { METRIC_SUBSCRIPTION_QUERY } from '../constants/query';

const useNewMeasurementData = (state: any) => {
  const dispatch = useDispatch();
  const [result] = useSubscription({
    query: METRIC_SUBSCRIPTION_QUERY,
    variables: {},
  });
  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.NEW_MEASUREMENTS_API_CALL_FAIL, error });
    }
    if (!data) {
      return;
    }

    dispatch({
      type: actions.NEW_MEASUREMENTS_RECEIVED,
      newMeasurementData: data,
    });
  }, [data, error, dispatch, state]);
};

export default useNewMeasurementData;
