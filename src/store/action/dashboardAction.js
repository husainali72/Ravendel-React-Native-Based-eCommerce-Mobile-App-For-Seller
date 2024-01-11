import API from '../../utils/api';

export const getDashboardDataAction = () => dispatch => {
  console.log('dasdsdsdas');

  dispatch({
    type: LOADING,
  });
  API.post('/apis/misc/dashboard_data')
    .then(response => {
      if (response.data.success) {
        let data = response.data.dashBoardData;
        dispatch({
          type: DASHBOARD_DATA,
          payload: data,
        });
      }
    })
    .catch(error => {
      console.log('error', error);
      dispatch({
        type: LOADING_ERROR,
      });
    });
};

export const LOADING = 'LOADING';
export const LOADING_ERROR = 'LOADING_ERROR';
export const DASHBOARD_DATA = 'DASHBOARD_DATA';
