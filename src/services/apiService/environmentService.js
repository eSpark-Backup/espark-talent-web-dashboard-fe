export class EnvironmentService {
  getBaseURL() {
    const env = process.env.NODE_ENV;

    if (env === 'production') {
      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error('NEXT_PUBLIC_BASE_URL is missing in production');
      }
      return process.env.NEXT_PUBLIC_BASE_URL;
    }

    // development / staging
    if (env === 'development') {
      return (
        process.env.NEXT_PUBLIC_BASE_URL ||
        'https://dashboard-stg-api.esparktalent.com/api'
      );
    }

    throw new Error(`Unsupported NODE_ENV: ${env}`);
  }
}
