import axios from 'axios';
import defaultConfig from './defaultConfig';
import { EnvironmentService } from './environmentService';

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
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            instance.defaults.headers.common.Authorization = '';
            this.login({
              email: 'faisal@esparkconsultants.com',
              password: '123456',
            }).then((r) => {
              this.isAlreadyFetchingAccessToken = false;
              console.log({ r });
              // ** Update accessToken in localStorage
              this.setToken(r.data.token);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          // const retryOriginalRequest = new Promise((resolve) => {
          //   this.addSubscriber((accessToken) => {
          //     // ** Make sure to assign accessToken according to your response.
          //     // ** Change Authorization header
          //     originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
          //     resolve(this.instance(originalRequest));
          //   });
          // });
          // return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
    jsonInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;

        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            instance.defaults.headers.common.Authorization = '';
            this.login({
              email: 'faisal@esparkconsultants.com',
              password: '123456',
            }).then((r) => {
              this.isAlreadyFetchingAccessToken = false;
              console.log({ r });
              // ** Update accessToken in localStorage
              this.setToken(r.data.token);
              this.setRefreshToken(r.data.refreshToken);

              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          // const retryOriginalRequest = new Promise((resolve) => {
          //   this.addSubscriber((accessToken) => {
          //     // ** Make sure to assign accessToken according to your response.
          //     // ** Change Authorization header
          //     originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
          //     resolve(this.instance(originalRequest));
          //   });
          // });
          // return retryOriginalRequest;
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
  getToken() {
    return JSON.parse(JSON.parse(localStorage.getItem('persist:root'))?.auth)
      ?.userData?.token;
  }
  getRefreshToken() {
    return localStorage.getItem(this.config.storageRefreshTokenKeyName);
  }
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
    console.log({ token, parsedToken, parsedAuth, newParsed });
    // localStorage.setItem('persist:root', JSON.stringify(newParsed))
    // const auth = JSON.parse(JSON.parse(token).auth)
    // auth.userData.token = value
    // const newToken =
    //   console.log({ value, token, token1: JSON.parse(JSON.parse(token).auth), auth: auth })
    // localStorage.setItem(this.config.storageTokenKeyName, value);
  }
  setRefreshToken(value) {
    localStorage.setItem(this.config.storageRefreshTokenKeyName, value);
  }
  async login(args) {
    // console.log({ args });
    return await newInstance.post(this.config.loginEndpoint, args);
  }
  async getData(url, params) {
    // this.resetHeaders();
    return await instance.get(url, params);
  }
  async getSingleData(url, params) {
    // this.resetHeaders();
    return await instance.get(url, params);
  }
  async postData(url, data) {
    return await instance.post(url, data);
  }
  async postJSONData(url, data) {
    return await jsonInstance.post(url, data);
  }
  async updateData(url, data) {
    // this.resetHeaders();
    return await instance.patch(url, data);
  }
  async updateJSONData(url, data) {
    // this.resetHeaders();
    return await jsonInstance.patch(url, data);
  }
  async patchData(url) {
    // this.resetHeaders();
    return await instance.patch(url);
  }
  async daleteData(url) {
    // this.resetHeaders();
    return await instance.delete(url);
  }
  async uploadFile(url, data) {
    this.updateHeadersForFormData();
    return await instance.post(url, data);
  }
  updateHeadersForFormData() {
    instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  }
  resetHeaders() {
    if (
      instance.defaults.headers.common['Content-Type'] !== 'application/json'
    ) {
      instance.defaults.headers.common['Content-Type'] = 'application/json';
    }
  }
}
