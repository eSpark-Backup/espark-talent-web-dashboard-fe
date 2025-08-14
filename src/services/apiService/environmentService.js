export class EnvironmentService {
  getBaseURL() {
    return (
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://esparktalent-dashboard-be.stg.esparkconsultants.com/api/'
    );
  }
}
