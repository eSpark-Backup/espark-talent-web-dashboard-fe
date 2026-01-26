export class EnvironmentService {
  getBaseURL() {
    const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL ||
      process.env.BASE_URL ||
      process.env.NEXT_PUBLIC_API_URL; // fall back so build doesn't crash

    console.log('[ENV]', {
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: appEnv,
      BASE_URL: baseURL,
    });

    if (!baseURL) {
      throw new Error('Base URL is missing');
    }

    return baseURL;
  }
}
