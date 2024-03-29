/*
 * Fortishield app - Agents visualizations
 * Copyright (C) 2015-2022 Fortishield, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

export const agentVisualizations = {
  general: {
    rows: [
      {
        height: 400,
        vis: [
          {
            title: 'Top 10 Alert groups evolution',
            id: 'Fortishield-App-Agents-General-Alert-groups-evolution',
            width: 50,
          },
          { title: 'Alerts', id: 'Fortishield-App-Agents-General-Alerts', width: 50 },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 alerts',
            id: 'Fortishield-App-Agents-General-Top-5-alerts',
            width: 33,
          },
          {
            title: 'Top 5 rule groups',
            id: 'Fortishield-App-Agents-General-Top-10-groups',
            width: 33,
          },
          {
            title: 'Top 5 PCI DSS Requirements',
            id: 'Fortishield-App-Agents-General-Top-5-PCI-DSS-Requirements',
            width: 34,
          },
        ],
      },
    ],
  },
  aws: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Sources',
            id: 'Fortishield-App-Agents-AWS-Top-sources',
            width: 25,
          },
          {
            title: 'Accounts',
            id: 'Fortishield-App-Agents-AWS-Top-accounts',
            width: 25,
          },
          {
            title: 'S3 buckets',
            id: 'Fortishield-App-Agents-AWS-Top-buckets',
            width: 25,
          },
          {
            title: 'Regions',
            id: 'Fortishield-App-Agents-AWS-Top-regions',
            width: 25,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Events by source over time',
            id: 'Fortishield-App-Agents-AWS-Events-by-source',
            width: 50,
          },
          {
            title: 'Events by S3 bucket over time',
            id: 'Fortishield-App-Agents-AWS-Events-by-s3-bucket',
            width: 50,
          },
        ],
      },
      {
        height: 570,
        vis: [
          {
            title: 'Geolocation map',
            id: 'Fortishield-App-Agents-AWS-geo',
          },
        ],
      },
    ],
  },
  fim: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Most active users',
            id: 'Fortishield-App-Agents-FIM-Users',
            width: 25,
          },
          {
            title: 'Actions',
            id: 'Fortishield-App-Agents-FIM-Actions',
            width: 25,
          },
          {
            title: 'Events',
            id: 'Fortishield-App-Agents-FIM-Events',
            width: 50,
          },
        ],
      },
      {
        height: 230,
        vis: [
          {
            title: 'Files added',
            id: 'Fortishield-App-Agents-FIM-Files-added',
            width: 33,
          },
          {
            title: 'Files modified',
            id: 'Fortishield-App-Agents-FIM-Files-modified',
            width: 33,
          },
          {
            title: 'Files deleted',
            id: 'Fortishield-App-Agents-FIM-Files-deleted',
            width: 34,
          },
        ],
      },
    ],
  },
  gcp: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 rules',
            id: 'Fortishield-App-Agents-GCP-Top-5-rules',
            width: 50,
          },
          {
            title: 'Top query events',
            id: 'Fortishield-App-Agents-GCP-Event-Query-Name',
            width: 25,
          },
          {
            title: 'Top 5 instances',
            id: 'Fortishield-App-Agents-GCP-Top-5-instances',
            width: 25,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Top project id by sourcetype',
            id: 'Fortishield-App-Agents-GCP-Top-ProjectId-By-SourceType',
            width: 25,
          },
          {
            title: 'GCP alerts evolution',
            id: 'Fortishield-App-Agents-GCP-Events-Over-Time',
            width: 75,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Auth answer count',
            id: 'Fortishield-App-Agents-GCP-authAnswer-Bar',
            width: 40,
          },
          {
            title: 'Resource type by project id',
            id: 'Fortishield-App-Agents-GCP-Top-ResourceType-By-Project-Id',
            width: 60,
          },
        ],
      },
    ],
  },
  pci: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 rule groups',
            id: 'Fortishield-App-Agents-PCI-Groups',
            width: 33,
          },
          {
            title: 'Top 5 rules',
            id: 'Fortishield-App-Agents-PCI-Rule',
            width: 33,
          },
          {
            title: 'Top 5 PCI DSS requirements',
            id: 'Fortishield-App-Agents-PCI-Requirement',
            width: 34,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'PCI Requirements',
            id: 'Fortishield-App-Agents-PCI-Requirements',
            width: 75,
          },
          {
            title: 'Rule level distribution',
            id: 'Fortishield-App-Agents-PCI-Rule-level-distribution',
            width: 25,
          },
        ],
      },
    ],
  },
  gdpr: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 rule groups',
            id: 'Fortishield-App-Agents-GDPR-Groups',
            width: 33,
          },
          {
            title: 'Top 5 rules',
            id: 'Fortishield-App-Agents-GDPR-Rule',
            width: 33,
          },
          {
            title: 'Top 5 GDPR requirements',
            id: 'Fortishield-App-Agents-GDPR-Requirement',
            width: 34,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'GDPR Requirements',
            id: 'Fortishield-App-Agents-GDPR-Requirements',
            width: 75,
          },
          {
            title: 'Rule level distribution',
            id: 'Fortishield-App-Agents-GDPR-Rule-level-distribution',
            width: 25,
          },
        ],
      },
    ],
  },
  nist: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Stats',
            id: 'Fortishield-App-Agents-NIST-Stats',
            width: 25,
          },
          {
            title: 'Top 10 requirements',
            id: 'Fortishield-App-Agents-NIST-top-10-requirements',
            width: 25,
          },
          {
            title: 'Requirements distributed by level',
            id: 'Fortishield-App-Agents-NIST-Requirement-by-level',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Requirements over time',
            id: 'Fortishield-App-Agents-NIST-Requirements-stacked-overtime',
          },
        ],
      },
    ],
  },
  tsc: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 rule groups',
            id: 'Fortishield-App-Agents-TSC-Groups',
            width: 33,
          },
          {
            title: 'Top 5 rules',
            id: 'Fortishield-App-Agents-TSC-Rule',
            width: 33,
          },
          {
            title: 'Top 5 TSC requirements',
            id: 'Fortishield-App-Agents-TSC-Requirement',
            width: 34,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'TSC Requirements',
            id: 'Fortishield-App-Agents-TSC-Requirements',
            width: 75,
          },
          {
            title: 'Rule level distribution',
            id: 'Fortishield-App-Agents-TSC-Rule-level-distribution',
            width: 25,
          },
        ],
      },
    ],
  },
  hipaa: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Requirements over time',
            id: 'Fortishield-App-Agents-HIPAA-Requirements-Stacked-Overtime',
            width: 50,
          },
          {
            title: 'Top 10 requirements',
            id: 'Fortishield-App-Agents-HIPAA-top-10',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'HIPAA requirements',
            id: 'Fortishield-App-Agents-HIPAA-Burbles',
            width: 50,
          },
          {
            title: 'Requirements distribution by level',
            id: 'Fortishield-App-Agents-HIPAA-Distributed-By-Level',
            width: 25,
          },
          {
            title: 'Most common alerts',
            id: 'Fortishield-App-Agents-HIPAA-Most-Common',
            width: 25,
          },
        ],
      },
    ],
  },
  virustotal: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Last scanned files',
            id: 'Fortishield-App-Agents-Virustotal-Last-Files-Pie',
            width: 25,
          },
          {
            title: 'Malicious files alerts Evolution',
            id: 'Fortishield-App-Agents-Virustotal-Malicious-Evolution',
            width: 75,
          },
        ],
      },
      {
        height: 570,
        vis: [
          {
            title: 'Last files',
            id: 'Fortishield-App-Agents-Virustotal-Files-Table',
          },
        ],
      },
    ],
  },
  osquery: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Most common Osquery actions',
            id: 'Fortishield-App-Agents-Osquery-most-common-osquery-actions',
            width: 25,
          },
          {
            title: 'Evolution of Osquery events per pack over time',
            id: 'Fortishield-App-Agents-Osquery-Evolution',
            width: 75,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Most common Osquery packs being used',
            id: 'Fortishield-App-Agents-Osquery-top-5-packs-being-used',
            width: 25,
          },
          {
            title: 'Most common rules',
            id: 'Fortishield-App-Agents-Osquery-monst-common-rules-being-fired',
            width: 75,
          },
        ],
      },
    ],
  },
  mitre: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Alerts evolution over time',
            id: 'Fortishield-App-Agents-MITRE-Alerts-Evolution',
            width: 70,
          },
          {
            title: 'Top tactics',
            id: 'Fortishield-App-Agents-MITRE-Top-Tactics',
            width: 30,
          },
        ],
      },
      {
        height: 360,
        vis: [
          {
            title: 'Rule level by attack',
            id: 'Fortishield-App-Agents-MITRE-Level-By-Attack',
            width: 33,
          },
          {
            title: 'MITRE attacks by tactic',
            id: 'Fortishield-App-Agents-MITRE-Attacks-By-Tactic',
            width: 34,
          },
          {
            title: 'Rule level by tactic',
            id: 'Fortishield-App-Agents-MITRE-Level-By-Tactic',
            width: 34,
          },
        ],
      },
    ],
  },
  docker: {
    rows: [
      {
        height: 300,
        vis: [
          {
            title: 'Top 5 images',
            id: 'Fortishield-App-Agents-Docker-top-5-images',
            width: 25,
          },
          {
            title: 'Top 5 events',
            id: 'Fortishield-App-Agents-Docker-top-5-actions',
            width: 25,
          },
          {
            title: 'Resources usage over time',
            id: 'Fortishield-App-Agents-Docker-Types-over-time',
            width: 50,
          },
        ],
      },
      {
        height: 300,
        vis: [
          {
            title: 'Events occurred evolution',
            id: 'Fortishield-App-Agents-Docker-Actions-over-time',
          },
        ],
      },
    ],
  },
  oscap: {
    rows: [
      {
        height: 230,
        vis: [
          {
            title: 'Top 5 Scans',
            id: 'Fortishield-App-Agents-OSCAP-Scans',
            width: 25,
          },
          {
            title: 'Top 5 Profiles',
            id: 'Fortishield-App-Agents-OSCAP-Profiles',
            width: 25,
          },
          {
            title: 'Top 5 Content',
            id: 'Fortishield-App-Agents-OSCAP-Content',
            width: 25,
          },
          {
            title: 'Top 5 Severity',
            id: 'Fortishield-App-Agents-OSCAP-Severity',
            width: 25,
          },
        ],
      },
      {
        height: 230,
        vis: [
          {
            title: 'Daily scans evolution',
            id: 'Fortishield-App-Agents-OSCAP-Daily-scans-evolution',
          },
        ],
      },
      {
        height: 250,
        vis: [
          {
            title: 'Top 5 - Alerts',
            id: 'Fortishield-App-Agents-OSCAP-Top-5-Alerts',
            width: 50,
          },
          {
            title: 'Top 5 - High risk alerts',
            id: 'Fortishield-App-Agents-OSCAP-Top-5-High-risk-alerts',
            width: 50,
          },
        ],
      },
    ],
  },
  ciscat: {
    rows: [
      {
        height: 320,
        vis: [
          {
            title: 'Top 5 CIS-CAT groups',
            id: 'Fortishield-app-Agents-CISCAT-top-5-groups',
            width: 60,
          },
          {
            title: 'Scan result evolution',
            id: 'Fortishield-app-Agents-CISCAT-scan-result-evolution',
            width: 40,
          },
        ],
      },
    ],
  },
  pm: {
    rows: [
      {
        height: 290,
        vis: [
          {
            title: 'Alerts over time',
            id: 'Fortishield-App-Agents-PM-Events-over-time',
            width: 50,
          },
          {
            title: 'Rule distribution',
            id: 'Fortishield-App-Agents-PM-Top-5-rules',
            width: 50,
          },
        ],
      },
      {
        height: 240,
        vis: [
          {
            title: 'Events per control type evolution',
            id: 'Fortishield-App-Agents-PM-Events-per-agent-evolution',
          },
        ],
      },
    ],
  },
  audit: {
    rows: [
      {
        height: 250,
        vis: [
          {
            title: 'Groups',
            id: 'Fortishield-App-Agents-Audit-Groups',
            width: 33,
          },
          {
            title: 'Commands',
            id: 'Fortishield-App-Agents-Audit-Commands',
            width: 33,
          },
          {
            title: 'Files',
            id: 'Fortishield-App-Agents-Audit-Files',
            width: 34,
          },
        ],
      },
      {
        height: 310,
        vis: [
          {
            title: 'Alerts over time',
            id: 'Fortishield-App-Agents-Audit-Alerts-over-time',
          },
        ],
      },
    ],
  },
  github: {
    rows: [
      {
        height: 360,
        vis: [
          {
            title: 'Alerts evolution by organization',
            id: 'Fortishield-App-Agents-GitHub-Alerts-Evolution-By-Organization',
            width: 60,
          },
          {
            title: 'Top 5 organizations by alerts',
            id: 'Fortishield-App-Agents-GitHub-Top-5-Organizations-By-Alerts',
            width: 40,
          },
        ],
      },
      {
        height: 360,
        vis: [
          {
            title: 'Top alerts by action type and organization',
            id: 'Fortishield-App-Agents-GitHub-Alert-Action-Type-By-Organization',
            width: 40,
          },
          {
            title: 'Users with more alerts',
            id: 'Fortishield-App-Agents-GitHub-Users-With-More-Alerts',
            width: 60,
          },
        ],
      },
    ],
  },
};
