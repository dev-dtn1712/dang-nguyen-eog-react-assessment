import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { QUERY_METRIC } from '../constants/query';

const useMetrics = () => {
  const dispatch = useDispatch();
  const [result] = useQuery({
    query: QUERY_METRIC,
    variables: {},
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch({ type: actions.METRIC_API_CALL_FAIL, error });
    }
    if (!data) {
      return;
    }
    if (fetching) {
      return;
    }
    dispatch({ type: actions.METRICS_DATA_RECEIVED, getMetrics: data.getMetrics });
  }, [dispatch, data, error, fetching]);
};

export default useMetrics;
