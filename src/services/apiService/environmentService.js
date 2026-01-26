export class EnvironmentService {
  getBaseURL() {
    const appEnv = process.env.NEXT_PUBLIC_APP_ENV;

    console.log('[ENV]', {
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: appEnv,
      BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    });

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is missing');
    }

    return process.env.NEXT_PUBLIC_BASE_URL;
  }
}
