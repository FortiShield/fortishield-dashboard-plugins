import fs from 'fs';
import { execSync } from 'child_process';
import { jobInitializeRun } from './index';
import {
  createDataDirectoryIfNotExists,
  createDirectoryIfNotExists,
} from '../../lib/filesystem';
import {
  FORTISHIELD_DATA_ABSOLUTE_PATH,
  FORTISHIELD_DATA_CONFIG_DIRECTORY_PATH,
  FORTISHIELD_DATA_CONFIG_REGISTRY_PATH,
} from '../../../common/constants';
import packageInfo from '../../../package.json';

function mockContextCreator(loggerLevel: string) {
  const logs = [];
  const levels = ['debug', 'info', 'warn', 'error'];

  function createLogger(level: string) {
    return jest.fn(function (message: string) {
      const levelLogIncluded: number = levels.findIndex(
        level => level === loggerLevel,
      );
      levelLogIncluded > -1 &&
        levels.slice(levelLogIncluded).includes(level) &&
        logs.push({ level, message });
    });
  }

  const ctx = {
    fortishield: {
      logger: {
        info: createLogger('info'),
        warn: createLogger('warn'),
        error: createLogger('error'),
        debug: createLogger('debug'),
      },
    },
    server: {
      config: {
        opensearchDashboards: {
          index: '.kibana',
        },
      },
    },
    core: {
      opensearch: {
        client: {
          asInternalUser: {
            indices: {
              exists: jest.fn(() => ({ body: true })),
            },
          },
        },
      },
    },
    /* Mocked logs getter. It is only for testing purpose.*/
    _getLogs(logLevel: string) {
      return logLevel ? logs.filter(({ level }) => level === logLevel) : logs;
    },
  };
  return ctx;
}

jest.mock('../../lib/get-configuration', () => ({
  getConfiguration: () => ({ pattern: 'fortishield-alerts-*' }),
}));

beforeAll(() => {
  // Create <PLUGIN_PLATFORM_PATH>/data/fortishield directory.
  createDataDirectoryIfNotExists();
  // Create <PLUGIN_PLATFORM_PATH>/data/fortishield/config directory.
  createDirectoryIfNotExists(FORTISHIELD_DATA_CONFIG_DIRECTORY_PATH);
});

afterAll(() => {
  // Remove <PLUGIN_PLATFORM_PATH>/data/fortishield directory.
  execSync(`rm -rf ${FORTISHIELD_DATA_ABSOLUTE_PATH}`);
});

describe('[initialize] `fortishield-registry.json` not created', () => {
  let mockContext = mockContextCreator('debug');
  afterEach(() => {
    // Remove <PLUGIN_PLATFORM_PATH>/data/fortishield/config/fortishield-registry file.
    execSync(
      `rm ${FORTISHIELD_DATA_ABSOLUTE_PATH}/config/fortishield-registry.json || echo ""`,
    );
  });

  it('Create registry file with plugin data and empty hosts', async () => {
    // Migrate the directories
    await jobInitializeRun(mockContext);
    const contentRegistry = JSON.parse(
      fs.readFileSync(FORTISHIELD_DATA_CONFIG_REGISTRY_PATH, 'utf8'),
    );

    expect(contentRegistry.name).toMatch('Fortishield dashboard');
    expect(contentRegistry['app-version']).toMatch(packageInfo.version);
    expect(contentRegistry['revision']).toMatch(packageInfo.revision);
    expect(typeof contentRegistry.installationDate).toBe('string');
    expect(typeof contentRegistry.lastRestart).toBe('string');
    expect(Object.keys(contentRegistry.hosts)).toHaveLength(0);
  });
});

describe('[initialize] `fortishield-registry.json` created', () => {
  let testID = 0;
  const contentRegistryFile = [
    {
      before: {
        name: 'Fortishield dashboard',
        'app-version': packageInfo.version,
        revision: packageInfo.revision,
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {},
      },
      after: {
        name: 'Fortishield dashboard',
        'app-version': packageInfo.version,
        revision: packageInfo.revision,
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {},
      },
    },
    {
      before: {
        name: 'Fortishield dashboard',
        'app-version': '0.0.0',
        revision: '0',
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {},
      },
      after: {
        name: 'Fortishield dashboard',
        'app-version': packageInfo.version,
        revision: packageInfo.revision,
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {},
      },
    },
    {
      before: {
        name: 'Fortishield dashboard',
        'app-version': '0.0.0',
        revision: '0',
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {
          default: {
            extensions: {
              pci: true,
              gdpr: true,
              hipaa: true,
              nist: true,
              tsc: true,
              audit: true,
              oscap: false,
              ciscat: false,
              aws: false,
              office: false,
              github: false,
              gcp: false,
              virustotal: false,
              osquery: false,
              docker: false,
            },
          },
        },
      },
      after: {
        name: 'Fortishield dashboard',
        'app-version': packageInfo.version,
        revision: packageInfo.revision,
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {
          default: {},
        },
      },
    },
    {
      before: {
        name: 'Fortishield dashboard',
        'app-version': '0.0.0',
        revision: '0',
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {
          default: {
            extensions: {
              pci: true,
              gdpr: true,
              hipaa: true,
              nist: true,
              tsc: true,
              audit: true,
              oscap: false,
              ciscat: false,
              aws: false,
              office: false,
              github: false,
              gcp: false,
              virustotal: false,
              osquery: false,
              docker: false,
            },
          },
          default2: {
            prop1: 3,
            prop2: 8,
            extensions: {
              pci: true,
              gdpr: true,
              hipaa: true,
              nist: true,
              tsc: true,
              audit: true,
              oscap: false,
              ciscat: false,
              aws: false,
              office: false,
              github: false,
              gcp: false,
              virustotal: false,
              osquery: false,
              docker: false,
            },
          },
          custom: {
            extensions: {
              pci: true,
              gdpr: true,
              hipaa: true,
              nist: true,
              tsc: true,
              audit: true,
              oscap: false,
              ciscat: false,
              aws: false,
              office: false,
              github: false,
              gcp: false,
              virustotal: false,
              osquery: false,
              docker: false,
            },
          },
        },
      },
      after: {
        name: 'Fortishield dashboard',
        'app-version': packageInfo.version,
        revision: packageInfo.revision,
        installationDate: '2022-07-25T13:55:04.363Z',
        lastRestart: '2022-07-25T13:55:04.363Z',
        hosts: {
          default: {},
          custom: {},
          default2: {
            prop1: 3,
            prop2: 8,
          },
        },
      },
    },
  ];

  beforeEach(() => {
    // Remove <PLUGIN_PLATFORM_PATH>/data/fortishield/config/fortishield-registry.json.
    execSync(
      `rm ${FORTISHIELD_DATA_ABSOLUTE_PATH}/config/fortishield-registry.json || echo ""`,
    );
    // Create the fortishield-registry.json file.
    fs.writeFileSync(
      FORTISHIELD_DATA_CONFIG_REGISTRY_PATH,
      JSON.stringify(contentRegistryFile[testID].before),
      'utf8',
    );
    testID++;
  });

  it.each`
    titleTest                                                                                                     | contentRegistryFile
    ${'Registry file is not rebuilt due version and revision match'}                                              | ${JSON.stringify(contentRegistryFile[0].after)}
    ${'Registry file is rebuilt due to version/revision changed'}                                                 | ${JSON.stringify(contentRegistryFile[1].after)}
    ${'Registry file is rebuilt due to version/revision changed and host extensions has been deleted'}            | ${JSON.stringify(contentRegistryFile[2].after)}
    ${'Registry file is rebuilt due to version/revision changed and host(multiples) extensions has been deleted'} | ${JSON.stringify(contentRegistryFile[3].after)}
  `(
    `$titleTest:
      content: $contentRegistryFile`,
    async ({ contentRegistryFile: content }) => {
      const mockContext = mockContextCreator('debug');

      const contentRegistryExpected = JSON.parse(content);
      await jobInitializeRun(mockContext);
      const contentRegistryFile = JSON.parse(
        fs.readFileSync(FORTISHIELD_DATA_CONFIG_REGISTRY_PATH, 'utf8'),
      );

      expect(contentRegistryFile.name).toMatch('Fortishield dashboard');
      expect(contentRegistryFile['app-version']).toMatch(
        contentRegistryExpected['app-version'],
      );
      expect(contentRegistryFile['revision']).toMatch(
        contentRegistryExpected.revision,
      );
      expect(typeof contentRegistryFile.installationDate).toBe('string');
      expect(typeof contentRegistryFile.lastRestart).toBe('string');
      expect(Object.keys(contentRegistryFile.hosts)).toHaveLength(
        Object.keys(contentRegistryExpected.hosts).length,
      );
      Object.keys(contentRegistryFile.hosts).forEach(element => {
        expect(
          contentRegistryFile.hosts[element]['extensions'],
        ).toBeUndefined();
        expect(contentRegistryFile.hosts[element]).toEqual(
          contentRegistryExpected.hosts[element],
        );
      });
    },
  );
});
