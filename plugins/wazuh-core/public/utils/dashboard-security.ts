import { WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY } from '../../common/constants';
import { ILogger } from '../../common/services/configuration';

export class DashboardSecurity {
  private securityPlatform: string = '';
  constructor(private logger: ILogger, private http) {}
  private async fetchCurrentPlatform() {
    try {
      this.logger.debug('Fetching the security platform');
      const response = await this.http.get(
        '/elastic/security/current-platform',
      );
      this.logger.debug(`Security platform: ${this.securityPlatform}`);
      return response.platform;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }
  async setup() {
    try {
      this.logger.debug('Setup');
      this.securityPlatform = await this.fetchCurrentPlatform();
      this.logger.debug(`Security platform: ${this.securityPlatform}`);
    } catch (error) {
      this.logger.error(error.message);
    }
  }
  async start() {}
  async stop() {}
  async isAdministrator() {
    if (
      this.securityPlatform ===
      WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY
    ) {
      const response = await this.http.get('/utils/account/is-admin');

      if (!response?.is_admin) {
        throw new Error(response.message);
      }
    }
  }
}
