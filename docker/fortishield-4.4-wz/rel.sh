#!/usr/bin/env bash

versions=(
	"4.4.0"
	"4.4.1"
	"4.4.2"
	"4.4.3"
	"4.4.4"
  "4.4.5"
	"4.5.0"
	"4.5.1"
  "4.5.2"
  "4.5.3"
  "4.6.0"
  "4.7.0"
  "4.8.0"
)

usage() {
	echo
	echo "$0 version action [saml]"
	echo
	echo "where version is one of " ${versions[*]}
	echo "action is one of up | down | stop"
	echo "saml to deploy a saml enabled environment"
	exit -1
}

if [ $# -lt 2 ]; then
	echo "Incorrect number of arguments " $#
	usage
fi

if [[ ! " ${versions[*]} " =~ " ${1} " ]]; then
	echo "Version ${1} not found in ${versions[*]}"
	exit -1
fi

export FORTISHIELD_STACK=${1}
export KIBANA_PORT=5601
export KIBANA_PASSWORD=${PASSWORD:-SecretPassword}
export COMPOSE_PROJECT_NAME=wz-rel-${FORTISHIELD_STACK//./}

profile="standard"
export FORTISHIELD_DASHBOARD_CONF=./config/fortishield_dashboard/fortishield_dashboard.yml
export SEC_CONFIG_FILE=./config/fortishield_indexer/config.yml

if [[ "$3" =~ "saml" ]]; then
	profile="saml"
	export FORTISHIELD_DASHBOARD_CONF=./config/fortishield_dashboard/fortishield_dashboard_saml.yml
	export SEC_CONFIG_FILE=./config/fortishield_indexer/config-saml.yml
fi

case "$2" in
up)
	docker compose --profile $profile -f rel.yml -p ${COMPOSE_PROJECT_NAME} up -Vd
	echo
	echo "1. (Optional) Enroll an agent (Ubuntu 20.04):"
	echo "docker run --name ${COMPOSE_PROJECT_NAME}-agent --network ${COMPOSE_PROJECT_NAME} --label com.docker.compose.project=${COMPOSE_PROJECT_NAME} -d ubuntu:20.04 bash -c '"
	echo "  apt update -y"
	echo "  apt install -y curl lsb-release"
	echo "  curl -so \fortishield-agent-${FORTISHIELD_STACK}.deb \\"
	echo "    https://packages.fortishield.com/4.x/apt/pool/main/w/fortishield-agent/fortishield-agent_${FORTISHIELD_STACK}-1_amd64.deb \\"
	echo "    && FORTISHIELD_MANAGER='fortishield.manager' FORTISHIELD_AGENT_GROUP='default' dpkg -i ./fortishield-agent-${FORTISHIELD_STACK}.deb"
	echo
	echo "  /etc/init.d/fortishield-agent start"
	echo "  tail -f /var/ossec/logs/ossec.log"
	echo "'"
	echo
	;;
down)
	docker compose --profile $profile -f rel.yml -p ${COMPOSE_PROJECT_NAME} down -v --remove-orphans
	;;
stop)
	docker compose --profile $profile -f rel.yml -p ${COMPOSE_PROJECT_NAME} stop
	;;
*)
	echo "Action must be either up or down"
	usage
	;;
esac
