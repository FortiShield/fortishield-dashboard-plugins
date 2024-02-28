import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRegisterAgentCommands } from './use-register-agent-commands';
import {
  IOSDefinition,
  tOptionalParams,
} from '../core/register-commands/types';

type tOptionalParamsNames = 'optional1' | 'optional2';

export interface ILinuxOSTypes {
  name: 'linux';
  architecture: 'x64' | 'x86';
}
export interface IWindowsOSTypes {
  name: 'windows';
  architecture: 'x86';
}

export interface IMacOSTypes {
  name: 'mac';
  architecture: '32/64';
}

export type tOperatingSystem = ILinuxOSTypes | IMacOSTypes | IWindowsOSTypes;

const linuxDefinition: IOSDefinition<tOperatingSystem, tOptionalParamsNames> = {
  name: 'linux',
  options: [
    {
      architecture: '32/64',
      urlPackage: props =>
        `https://fortishield.github.io/packages/4.x/yum/fortishield-agent-${props.fortishieldVersion}-1.x86_64`,
      installCommand: props => `sudo yum install -y ${props.urlPackage}`,
      startCommand: props => `sudo systemctl start fortishield-agent`,
    },
    {
      architecture: 'x64',
      urlPackage: props =>
        `https://fortishield.github.io/packages/4.x/apt/pool/main/w/fortishield-agent/ fortishield-agent_${props.fortishieldVersion}-1_${props.architecture}`,
      installCommand: props =>
        `curl -so fortishield-agent.deb ${props.urlPackage} && sudo dpkg -i ./fortishield-agent.deb`,
      startCommand: props => `sudo systemctl start fortishield-agent`,
    },
  ],
};

export const osCommandsDefinitions = [linuxDefinition];

///////////////////////////////////////////////////////////////////
/// Optional parameters definitions
///////////////////////////////////////////////////////////////////

export const optionalParamsDefinitions: tOptionalParams<tOptionalParamsNames> =
  {
    optional1: {
      property: 'FORTISHIELD_MANAGER',
      getParamCommand: props => {
        const { property, value } = props;
        return `${property}=${value}`;
      },
    },
    optional2: {
      property: 'FORTISHIELD_AGENT_NAME',
      getParamCommand: props => {
        const { property, value } = props;
        return `${property}=${value}`;
      },
    },
  };

describe('useRegisterAgentCommands hook', () => {
  it('should return installCommand and startCommand null when the hook is initialized', () => {
    const hook = renderHook(() =>
      useRegisterAgentCommands({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    expect(hook.result.current.installCommand).toBe('');
    expect(hook.result.current.startCommand).toBe('');
  });

  it('should return ERROR when get installCommand and the OS received is NOT valid', () => {
    const {
      result: {
        current: { selectOS },
      },
    } = renderHook(() =>
      useRegisterAgentCommands({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    try {
      act(() => {
        selectOS({
          name: 'linux',
          architecture: 'x64',
        });
      });
    } catch (error) {
      if (error instanceof Error)
        expect(error.message).toContain('No OS option found for');
    }
  });

  it('should change the commands when the OS is selected successfully', async () => {
    const hook = renderHook(() =>
      useRegisterAgentCommands<tOperatingSystem, tOptionalParamsNames>({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    const { selectOS } = hook.result.current;
    const { result } = hook;

    const optionSelected = osCommandsDefinitions
      .find(os => os.name === 'linux')
      ?.options.find(
        item => item.architecture === 'x64',
      );
    const spyInstall = jest.spyOn(optionSelected!, 'installCommand');
    const spyStart = jest.spyOn(optionSelected!, 'startCommand');

    act(() => {
      selectOS({
        name: 'linux',
        architecture: 'x64',
      });
    });
    expect(result.current.installCommand).not.toBe('');
    expect(result.current.startCommand).not.toBe('');
    expect(spyInstall).toBeCalledTimes(1);
    expect(spyStart).toBeCalledTimes(1);
  });

  it('should return commands empty when set optional params and OS is NOT selected', () => {
    const hook = renderHook(() =>
      useRegisterAgentCommands<tOperatingSystem, tOptionalParamsNames>({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    const { setOptionalParams } = hook.result.current;

    act(() => {
      setOptionalParams({
        optional1: 'value 1',
        optional2: 'value 2',
      });
    });

    expect(hook.result.current.installCommand).toBe('');
    expect(hook.result.current.startCommand).toBe('');
  });

  it('should return optional params empty when optional params are not added', () => {
    const hook = renderHook(() =>
      useRegisterAgentCommands<tOperatingSystem, tOptionalParamsNames>({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    const { optionalParamsParsed } = hook.result.current;
    expect(optionalParamsParsed).toEqual({});
  });

  it('should return optional params when optional params are added', () => {
    const hook = renderHook(() =>
      useRegisterAgentCommands<tOperatingSystem, tOptionalParamsNames>({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    const { setOptionalParams } = hook.result.current;
    const spy1 = jest.spyOn(
      optionalParamsDefinitions.optional1,
      'getParamCommand',
    );
    const spy2 = jest.spyOn(
      optionalParamsDefinitions.optional2,
      'getParamCommand',
    );
    act(() => {
      setOptionalParams({
        optional1: 'value 1',
        optional2: 'value 2',
      });
    });

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);
  });

  it('should update the commands when the OS is selected and optional params are added', () => {
    const hook = renderHook(() =>
      useRegisterAgentCommands<tOperatingSystem, tOptionalParamsNames>({
        osDefinitions: osCommandsDefinitions,
        optionalParamsDefinitions: optionalParamsDefinitions,
      }),
    );
    const { selectOS, setOptionalParams } = hook.result.current;
    const optionSelected = osCommandsDefinitions
      .find(os => os.name === 'linux')
      ?.options.find(
        item => item.architecture === 'x64',
      );
    const spyInstall = jest.spyOn(optionSelected!, 'installCommand');
    const spyStart = jest.spyOn(optionSelected!, 'startCommand');

    act(() => {
      selectOS({
        name: 'linux',
        architecture: 'x64',
      });

      setOptionalParams({
        optional1: 'value 1',
        optional2: 'value 2',
      });
    });

    expect(hook.result.current.installCommand).not.toBe('');
    expect(hook.result.current.startCommand).not.toBe('');
    expect(spyInstall).toBeCalledTimes(2);
    expect(spyStart).toBeCalledTimes(2);
  });
});
