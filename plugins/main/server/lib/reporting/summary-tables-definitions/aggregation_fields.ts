export const AggregationFields = {
  'rule.id': {
    field: 'rule.id',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Rule ID',
  },
  'rule.description': {
    field: 'rule.description',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Description',
  },
  'rule.level': {
    field: 'rule.level',
    size: 12,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Level',
  },
  'rule.groups': {
    field: 'rule.groups',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Groups',
    missing: '-',
  },
  'agent.name': {
    field: 'agent.name',
    size: 1000,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Agent name',
    missing: '-',
  },
  'syscheck.path': {
    field: 'syscheck.path',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Path',
    missing: '-',
  },
  'syscheck.event': {
    field: 'syscheck.event',
    size: 12,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
    missing: '-',
  },
  'rule.pci_dss': {
    field: 'rule.pci_dss',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-',
  },
  'rule.gdpr': {
    field: 'rule.gdpr',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-',
  },
  'rule.nist_800_53': {
    field: 'rule.nist_800_53',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-',
  },
  'rule.hipaa': {
    field: 'rule.hipaa',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-',
  },
  'rule.tsc': {
    field: 'rule.tsc',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Requirement',
    missing: '-',
  },
  'data.audit.exe': {
    field: 'data.audit.exe',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Command',
    missing: '-',
  },
  'data.audit.type': {
    field: 'data.audit.type',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Type',
    missing: '-',
  },
  'data.osquery.name': {
    field: 'data.osquery.name',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Name',
    missing: '-',
  },
  'data.osquery.action': {
    field: 'data.osquery.action',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
    missing: '-',
  },
  'data.osquery.pack': {
    field: 'data.osquery.pack',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Pack',
    missing: '-',
  },
  'data.osquery.calendarTime': {
    field: 'data.osquery.calendarTime',
    size: 2,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Date',
    missing: '-',
  },
  'data.cis.rule_title': {
    field: 'data.cis.rule_title',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Rule title',
    missing: '-',
  },
  'data.cis.group': {
    field: 'data.cis.group',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Group',
    missing: '-',
  },
  'data.cis.result': {
    field: 'data.cis.result',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Result',
    missing: '-',
  },
  'data.title': {
    field: 'data.title',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Control',
    missing: '-',
  },
  'data.docker.Actor.Attributes.name': {
    field: 'data.docker.Actor.Attributes.name',
    size: 50,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Container',
    missing: '-',
  },
  'data.docker.Action': {
    field: 'data.docker.Action',
    size: 20,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Action',
    missing: '-',
  },
  'timestamp': {
    field: 'timestamp',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Date',
  },
  'data.github.org': {
    field: 'data.github.org',
    size: 10,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Organization',
    missing: '-',
  },
  'data.oscap.check.title': {
    field: 'data.oscap.check.title',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Title',
    missing: '-',
  },
  'data.oscap.scan.profile.title': {
    field: 'data.oscap.scan.profile.title',
    size: 5,
    order: 'desc',
    orderBy: '1',
    customLabel: 'Profile',
    missing: '-',
  },
};