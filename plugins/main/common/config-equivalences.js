import { ASSETS_PUBLIC_URL, PLUGIN_PLATFORM_NAME } from './constants';

export const configEquivalences = {
  pattern:
    "Default index pattern to use on the app. If there's no valid index pattern, the app will automatically create one with the name indicated in this option.",
  'customization.logo.app': `Set the name of the app logo stored at ${ASSETS_PUBLIC_URL}.  It is used while the user is logging into Fortishield API.`,
  'customization.logo.healthcheck': `Set the name of the health-check logo stored at ${ASSETS_PUBLIC_URL}`,
  'customization.logo.reports': `Set the name of the reports logo (.png) stored at ${ASSETS_PUBLIC_URL}`,
  'checks.pattern':
    'Enable or disable the index pattern health check when opening the app.',
  'checks.template':
    'Enable or disable the template health check when opening the app.',
  'checks.api': 'Enable or disable the API health check when opening the app.',
  'checks.setup':
    'Enable or disable the setup health check when opening the app.',
  'checks.fields':
    'Enable or disable the known fields health check when opening the app.',
  'checks.metaFields': `Change the default value of the ${PLUGIN_PLATFORM_NAME} metaField configuration`,
  'checks.timeFilter': `Change the default value of the ${PLUGIN_PLATFORM_NAME} timeFilter configuration`,
  'checks.maxBuckets': `Change the default value of the ${PLUGIN_PLATFORM_NAME} max buckets configuration`,
  timeout:
    'Maximum time, in milliseconds, the app will wait for an API response when making requests to it. It will be ignored if the value is set under 1500 milliseconds.',
  'ip.selector':
    'Define if the user is allowed to change the selected index pattern directly from the top menu bar.',
  'ip.ignore':
    'Disable certain index pattern names from being available in index pattern selector from the Fortishield app.',
  'fortishield.monitoring.enabled':
    'Enable or disable the fortishield-monitoring index creation and/or visualization.',
  'fortishield.monitoring.frequency':
    'Frequency, in seconds, of API requests to get the state of the agents and create a new document in the fortishield-monitoring index with this data.',
  'fortishield.monitoring.shards':
    'Define the number of shards to use for the fortishield-monitoring-* indices.',
  'fortishield.monitoring.replicas':
    'Define the number of replicas to use for the fortishield-monitoring-* indices.',
  'fortishield.monitoring.creation':
    'Define the interval in which a new fortishield-monitoring index will be created.',
  'fortishield.monitoring.pattern':
    'Default index pattern to use for Fortishield monitoring.',
  hideManagerAlerts: 'Hide the alerts of the manager in every dashboard.',
  'enrollment.dns':
    'Specifies the Fortishield registration server, used for the agent enrollment.',
  'enrollment.password':
    'Specifies the password used to authenticate during the agent enrollment.',
  'cron.prefix': 'Define the index prefix of predefined jobs.',
  'cron.statistics.status': 'Enable or disable the statistics tasks.',
  'cron.statistics.apis':
    'Enter the ID of the hosts you want to save data from, leave this empty to run the task on every host.',
  'cron.statistics.interval':
    'Define the frequency of task execution using cron schedule expressions.',
  'cron.statistics.index.name':
    'Define the name of the index in which the documents will be saved.',
  'cron.statistics.index.creation':
    'Define the interval in which a new index will be created.',
  'cron.statistics.index.shards':
    'Define the number of shards to use for the statistics indices.',
  'cron.statistics.index.replicas':
    'Define the number of replicas to use for the statistics indices.',
  'alerts.sample.prefix':
    'Define the index name prefix of sample alerts. It must match the template used by the index pattern to avoid unknown fields in dashboards.',
  'vulnerabilities.pattern':
    'Default index pattern to use for vulnerabilities.',
};

export const nameEquivalence = {
  pattern: 'Index pattern',
  'customization.logo.app': 'Logo App',
  'customization.logo.healthcheck': 'Logo Health Check',
  'customization.logo.reports': 'Logo Reports',
  'checks.pattern': 'Index pattern',
  'checks.template': 'Index template',
  'checks.api': 'API connection',
  'checks.setup': 'API version',
  'checks.fields': 'Known fields',
  'checks.metaFields': 'Remove meta fields',
  'checks.timeFilter': 'Set time filter to 24h',
  'checks.maxBuckets': 'Set max buckets to 200000',
  timeout: 'Request timeout',
  'ip.selector': 'IP selector',
  'ip.ignore': 'IP ignore',
  'fortishield.monitoring.enabled': 'Status',
  'fortishield.monitoring.frequency': 'Frequency',
  'fortishield.monitoring.shards': 'Index shards',
  'fortishield.monitoring.replicas': 'Index replicas',
  'fortishield.monitoring.creation': 'Index creation',
  'fortishield.monitoring.pattern': 'Index pattern',
  hideManagerAlerts: 'Hide manager alerts',
  'enrollment.dns': 'Enrollment DNS',
  'cron.prefix': 'Cron prefix',
  'cron.statistics.status': 'Status',
  'cron.statistics.apis': 'Includes apis',
  'cron.statistics.interval': 'Interval',
  'cron.statistics.index.name': 'Index name',
  'cron.statistics.index.creation': 'Index creation',
  'cron.statistics.index.shards': 'Index shards',
  'cron.statistics.index.replicas': 'Index replicas',
  'alerts.sample.prefix': 'Sample alerts prefix',
  'vulnerabilities.pattern': 'Index pattern',
  'checks.vulnerabilities.pattern': 'Vulnerabilities index pattern',
  'fim.pattern': 'Index pattern',
  'checks.fim.pattern': 'Fim index pattern',
};

const HEALTH_CHECK = 'Health Check';
const GENERAL = 'General';
const SECURITY = 'Security';
const MONITORING = 'Monitoring';
const STATISTICS = 'Statistics';
const VULNERABILITIES = 'Vulnerabilities';
const CUSTOMIZATION = 'Logo Customization';
export const categoriesNames = [
  HEALTH_CHECK,
  GENERAL,
  SECURITY,
  MONITORING,
  STATISTICS,
  VULNERABILITIES,
  CUSTOMIZATION,
];

export const categoriesEquivalence = {
  pattern: GENERAL,
  'customization.logo.app': CUSTOMIZATION,
  'customization.logo.healthcheck': CUSTOMIZATION,
  'customization.logo.reports': CUSTOMIZATION,
  'checks.pattern': HEALTH_CHECK,
  'checks.template': HEALTH_CHECK,
  'checks.api': HEALTH_CHECK,
  'checks.setup': HEALTH_CHECK,
  'checks.fields': HEALTH_CHECK,
  'checks.metaFields': HEALTH_CHECK,
  'checks.timeFilter': HEALTH_CHECK,
  'checks.maxBuckets': HEALTH_CHECK,
  timeout: GENERAL,
  'ip.selector': GENERAL,
  'ip.ignore': GENERAL,
  'fortishield.monitoring.enabled': MONITORING,
  'fortishield.monitoring.frequency': MONITORING,
  'fortishield.monitoring.shards': MONITORING,
  'fortishield.monitoring.replicas': MONITORING,
  'fortishield.monitoring.creation': MONITORING,
  'fortishield.monitoring.pattern': MONITORING,
  hideManagerAlerts: GENERAL,
  'enrollment.dns': GENERAL,
  'cron.prefix': GENERAL,
  'cron.statistics.status': STATISTICS,
  'cron.statistics.apis': STATISTICS,
  'cron.statistics.interval': STATISTICS,
  'cron.statistics.index.name': STATISTICS,
  'cron.statistics.index.creation': STATISTICS,
  'cron.statistics.index.shards': STATISTICS,
  'cron.statistics.index.replicas': STATISTICS,
  'alerts.sample.prefix': GENERAL,
  'vulnerabilities.pattern': VULNERABILITIES,
  'checks.vulnerabilities.pattern': HEALTH_CHECK,
};

const TEXT = 'text';
const NUMBER = 'number';
const LIST = 'list';
const BOOLEAN = 'boolean';
const ARRAY = 'array';
const INTERVAL = 'interval';

export const formEquivalence = {
  pattern: { type: TEXT },
  'customization.logo.app': { type: TEXT },
  'customization.logo.healthcheck': { type: TEXT },
  'customization.logo.reports': { type: TEXT },
  'checks.pattern': { type: BOOLEAN },
  'checks.template': { type: BOOLEAN },
  'checks.api': { type: BOOLEAN },
  'checks.setup': { type: BOOLEAN },
  'checks.fields': { type: BOOLEAN },
  'checks.metaFields': { type: BOOLEAN },
  'checks.timeFilter': { type: BOOLEAN },
  'checks.maxBuckets': { type: BOOLEAN },
  timeout: { type: NUMBER },
  'ip.selector': { type: BOOLEAN },
  'ip.ignore': { type: ARRAY },
  'fortishield.monitoring.enabled': { type: BOOLEAN },
  'fortishield.monitoring.frequency': { type: NUMBER },
  'fortishield.monitoring.shards': { type: NUMBER },
  'fortishield.monitoring.replicas': { type: NUMBER },
  'fortishield.monitoring.creation': {
    type: LIST,
    params: {
      options: [
        { text: 'Hourly', value: 'h' },
        { text: 'Daily', value: 'd' },
        { text: 'Weekly', value: 'w' },
        { text: 'Monthly', value: 'm' },
      ],
    },
  },
  'fortishield.monitoring.pattern': { type: TEXT },
  hideManagerAlerts: { type: BOOLEAN },
  'enrollment.dns': { type: TEXT },
  'cron.prefix': { type: TEXT },
  'cron.statistics.status': { type: BOOLEAN },
  'cron.statistics.apis': { type: ARRAY },
  'cron.statistics.interval': { type: INTERVAL },
  'cron.statistics.index.name': { type: TEXT },
  'cron.statistics.index.creation': {
    type: LIST,
    params: {
      options: [
        { text: 'Hourly', value: 'h' },
        { text: 'Daily', value: 'd' },
        { text: 'Weekly', value: 'w' },
        { text: 'Monthly', value: 'm' },
      ],
    },
  },
  'cron.statistics.index.shards': { type: NUMBER },
  'cron.statistics.index.replicas': { type: NUMBER },
  'alerts.sample.prefix': { type: TEXT },
  'vulnerabilities.pattern': { type: TEXT },
  'checks.vulnerabilities.pattern': { type: BOOLEAN },
};
