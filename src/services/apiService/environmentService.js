export class EnvironmentService {
  getBaseURL() {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

    console.log('[ENV]', {
      NODE_ENV: process.env.NODE_ENV,
      BASE_URL: baseURL,
    });

    if (!baseURL) {
      throw new Error('NEXT_PUBLIC_BASE_URL is missing. Check your .env file.');
    }

    return baseURL;
  }
}
