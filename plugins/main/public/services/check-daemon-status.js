import store from '../redux/store';
import { updateFortishieldNotReadyYet } from '../redux/actions/appStateActions';
import { WzRequest } from '../react-services/wz-request';

export class CheckDaemonsStatus {
  constructor($rootScope, $timeout) {
    this.$rootScope = $rootScope;
    this.tries = 10;
    this.$timeout = $timeout;
    this.busy = false;
  }

  async makePing() {
    try {
      if (this.busy) return;

      this.busy = true;

      let isValid = false;
      while (this.tries--) {
        await this.$timeout(1200);
        const result = await WzRequest.apiReq('GET', '/ping', {});
        isValid = ((result || {}).data || {}).isValid;
        if (isValid) {
          const updateNotReadyYet = updateFortishieldNotReadyYet(false);
          store.dispatch(updateNotReadyYet);

          this.$rootScope.fortishieldNotReadyYet = false;
          this.$rootScope.$applyAsync();
          break;
        }
      }

      if (!isValid) {
        throw new Error('Not recovered');
      }

      this.tries = 10;
    } catch (error) {
      this.tries = 10;

      const updateNotReadyYet = updateFortishieldNotReadyYet(
        'Fortishield could not be recovered.'
      );
      store.dispatch(updateNotReadyYet);

      this.$rootScope.fortishieldNotReadyYet = 'Fortishield could not be recovered.';
      this.$rootScope.$applyAsync();
      throw error;
    }

    this.busy = false;
  }
}
