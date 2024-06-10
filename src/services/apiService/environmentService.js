export class EnvironmentService {
  getBaseURL() {
    console.log('Current BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);

    return process.env.NEXT_PUBLIC_BASE_URL ===
      'https://waqarkhanzada.pythonanywhere.com/api'
      ? process.env.NEXT_PUBLIC_BASE_URL
      : 'https://waqarkhanzadaxyz.pythonanywhere.com/api';
  }
}
