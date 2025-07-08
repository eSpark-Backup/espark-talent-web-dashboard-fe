import APIService from './apiService';

const useApi = (apiOverrideConfig) => {
  const api = new APIService(apiOverrideConfig);
  return { api };
};

export default useApi;
