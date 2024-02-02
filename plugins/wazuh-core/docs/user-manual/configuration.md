# Plugin configuration

The Wazuh Core plugin has the following settings to configure through the platform configuration
file (`opensearch_dashboards.yml`):

| setting                          | type   | default value     | description                                                   |
| -------------------------------- | ------ | ----------------- | ------------------------------------------------------------- |
| `wazuh_core.encryption.password` | string | `secretpassword!` | Define a password used to get some properties to encrypt data |

> :warning: Changing the `wazuh_core.encryption.password` in an environment with API host entries
> configured previously, it will cause a problem.

# Configuration of the Wazuh scoped plugins

The Wazuh Core plugin exposes a instance of a service that allows other plugins can register
settings.

This service is the way to manage the Wazuh scoped plugins configuration.

These settings can be configured through the `Server Management` > `App Settings` application.

This configuration is stored in a saved object in the backend side. Some sensitive data such as the
related to the API host entries is encrypted using `wazuh_core.encryption.password`.

## Configure

The configuration can be done through the `Server Management` > `App Settings` application.

### Advanced user - platform API endpoints

It is possible manage the configuration through the platform API endpoints:

- `GET /utils/configuration`: get the configuration (not included the API hosts)
- `PUT /utils/configuration`: update the configuration
- `PUT /utils/configuration/files/{key}`: update the configuration related to files
  (store file and update the setting)
- `DELETE /utils/configuration/files/{key}`: delete the configuration related to files
  (delete file and clear the setting)

### Advanced user - saved object

As the configuration is stored in a saved object, it is possible using the Wazuh indexer API or
saved object API of Wazuh dashboard to manage this data.

:warning: Some fields are encrypted, so updating these fields without the expected encrypted value
can cause problems. It is not recommended to updating the encrypted settings using this method.

#### Get the saved object

The configuration is stored in a saved object of the type: `plugins-configuration`.

To retrieve or backup the data, you can get the configuration doing a request to Wazuh indexer using
cURL or Dev Tools plugin:

```
GET .kibana*/_search
{
  "query": {
    "match": {
      "type": "plugins-configuration"
    }
  }
}
```

#### Create the saved object

TODO

#### Update the saved object

TODO

#### Remove the saved object

If you want to remove or reset the configuration, you can remove the saved object doing a request to
Wazuh indexer using cURL or Dev Tools plugin:

```
POST .kibana*/_delete_by_query
{
  "query": {
    "match": {
      "type": "plugins-configuration"
    }
  }
}
```

# Configuration of the API host entries

The API host entries data is stored in the same saved object where is located all the Wazuh scoped
plugins configuration. This data is encrypted using the `wazuh_core.encryption.password` plugin
setting defined in the platform configuration.

## Configure

The API host entries can be managed through the `Server APIs` application:

- Create
- Update
- Remove

These actions require a privileged user which has the role `all_access`.

The UI display this requirement and disable the related buttons.

Moreover, the platform API endpoints are protected with the same requirement.

The edition of the API host data support partial changes, this means only the changed data is
updated in the configuration. The password fields are empty by security reasons when editing.

## Advanced users - platform API endpoints

It is possible manage the API host configuration through the platform API endpoints:

- `GET /hosts/apis`: get the API hosts entries
- `PUT /hosts/apis/{id}`: create/update the API host configuration
- `DELETE /hosts/apis/{id}`: delete the API host configuration

These endpoints communicates with the saved object decrypt and encrypt the data.