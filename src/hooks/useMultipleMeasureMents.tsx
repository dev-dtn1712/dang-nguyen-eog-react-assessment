import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import * as actions from '../store/actions';
import { QUERY_MULTIPLE_MEASUREMENTS } from '../constants/query';

const useMultipleMeasureMents = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: QUERY_MULTIPLE_MEASUREMENTS,
  });
  const { data, error, fetching } = result;
  useEffect(() => {
    if (error) {
      dispatch({ type: actions.MULTIPLE_MEASUREMENTS_API_CALL_FAIL, error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }

    dispatch({
      type: actions.METRICS_MEASUREMENTS_RECEIVED,
      getMultipleMeasurements: data,
    });
  }, [dispatch, data, error, fetching]);
};

export default useMultipleMeasureMents;
