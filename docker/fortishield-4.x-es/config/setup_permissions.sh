#/bin/sh

# X-Pack environment utility which:
#   - creates the "fortishield_app" user
#   - creates the "fortishield_indices" role
#   - maps the "fortishield_indices" role to the "fortishield_app" user

# Elasticsearch host
elasticsearch_admin="elastic"
elasticsearch_admin_password="SecretPassword"
elasticsearch_host="https://${1-localhost}:9200"

# User, roles and role mapping definition
fortishield_indices_role="fortishield_indices"
fortishield_indices_pattern="fortishield-*"
fortishield_user_username="fortishield_app"
fortishield_user_password="fortishield_app"
kibana_system_role="kibana_system"

exit_with_message(){
  echo $1;
  exit 1;
}

# Create "fortishield_indices" role
echo " Creating '$fortishield_indices_role' role..."
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -k -u $elasticsearch_admin:$elasticsearch_admin_password \
  $elasticsearch_host/_security/role/$fortishield_indices_role -d@- << EOF || exit_with_message "Error creating $fortishield_indices_role role"
{
  "cluster": [ "all" ],
  "indices": [
    {
      "names" : [ "$fortishield_indices_pattern" ],
      "privileges": [ "all" ]
    }
  ]
}
EOF
echo ""

# Create "fortishield_user" user
echo "Creating "$fortishield_user_username" user..."
curl \
  -X POST \
  -H 'Content-Type: application/json' \
  -k -u $elasticsearch_admin:$elasticsearch_admin_password \
  $elasticsearch_host/_security/user/$fortishield_user_username -d@- << EOF || exit_with_message "Error creating $fortishield_user_username user"
{
  "username" : "$fortishield_user_username",
  "password" : "$fortishield_user_password",
  "roles" : [ "$kibana_system_role", "$fortishield_indices_role" ],
  "full_name" : "",
  "email" : ""
}
EOF
echo ""
