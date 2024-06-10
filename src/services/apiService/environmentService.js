export class EnvironmentService {
  getBaseURL() {
    return process.env.NEXT_PUBLIC_BASE_URL ==
      'https://waqarkhanzada.pythonanywhere.com/api'
      ? process.env.NEXT_PUBLIC_BASE_URL
      : 'https://waqarkhanzadaxyz.pythonanywhere.com/api';
  }
}
