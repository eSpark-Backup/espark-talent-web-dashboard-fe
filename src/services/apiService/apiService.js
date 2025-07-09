import axios from 'axios';
import defaultConfig from './defaultConfig';
import { EnvironmentService } from './environmentService';
import Cookie from 'js-cookie';

const envService = new EnvironmentService();

const instance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'multipart/form-data' },
});

const jsonInstance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

const fileInstance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
  responseType: 'blob',
});

const newInstance = axios.create({
  baseURL: envService.getBaseURL(),
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

export default class APIService {
  config = { ...defaultConfig };
  isAlreadyFetchingAccessToken = false;
  subscribers = [];
  constructor(overrideConfig) {
    this.config = { ...this.config, ...overrideConfig };
    instance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.config.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    jsonInstance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.config.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    fileInstance.interceptors.request.use(
      (config) => {
        let accessToken;
        if (this.getToken()) {
          accessToken = this.getToken();
        }
        if (accessToken) {
          config.headers.Authorization = `${this.config.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          window.location.href = '/';
          localStorage.removeItem('persist:root');
          Cookie?.remove('token');
          Cookie?.remove('userType');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        return Promise.reject(error);
      }
    );
    jsonInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          window.location.href = '/';
          localStorage.removeItem('persist:root');
          Cookie?.remove('token');
          Cookie?.remove('userType');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        return Promise.reject(error);
      }
    );
    fileInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          window.location.href = '/';
          localStorage.removeItem('persist:root');
          Cookie?.remove('token');
          Cookie?.remove('userType');
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }
        return Promise.reject(error);
      }
    );
  }
  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }
  getToken = () => {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.auth)
      ?.userData?.token;
  };
  getRefreshToken = () => {
    return localStorage.getItem(this.config.storageRefreshTokenKeyName);
  };
  setToken(value) {
    const token = localStorage.getItem('persist:root');
    const parsedToken = JSON.parse(token);
    const parsedAuth = JSON.parse(parsedToken?.auth);
    const newParsed = {
      ...parsedAuth,
      userData: {
        ...parsedAuth.userData,
        token: value,
      },
    };
    // Save the updated token back to localStorage
    parsedToken.auth = JSON.stringify(newParsed);
    localStorage?.setItem('persist:root', JSON.stringify(parsedToken));
  }
  setRefreshToken(value) {
    localStorage?.setItem(this?.config?.storageRefreshTokenKeyName, value);
  }
  async login(args) {
    return await newInstance?.post(this?.config?.loginEndpoint, args);
  }
  async getData(url, params) {
    return await instance?.get(url, params);
  }
  async getSingleData(url, params) {
    return await instance?.get(url, params);
  }
  async postData(url, data) {
    return await instance?.post(url, data);
  }
  async postJSONData(url, data) {
    return await jsonInstance?.post(url, data);
  }
  async updateData(url, data) {
    return await instance?.patch(url, data);
  }
  async updateJSONData(url, data) {
    return await jsonInstance?.patch(url, data);
  }
  async patchData(url) {
    return await instance?.patch(url);
  }
  async daleteData(url) {
    return await instance?.delete(url);
  }
  async uploadFile(url, data) {
    this.updateHeadersForFormData();
    return await instance?.post(url, data);
  }
  async downloadFile(url) {
    return await fileInstance?.get(url);
  }
  updateHeadersForFormData = () => {
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  };
  resetHeaders = () => {
    if (
      instance.defaults.headers.common['Content-Type'] !== 'application/json'
    ) {
      instance.defaults.headers.common['Content-Type'] = 'application/json';
    }
  };
}
