#!/bin/bash

## Default variables to use
export INTERACTIVE=${INTERACTIVE:="true"}
export OCP_HOST=${OCP_HOST:=""}
export OCP_USERNAME=${OCP_USERNAME:=""}
export OCP_PASSWORD=${OCP_PASSWORD:=""}
export PARASOFT_ROUTE=${PARASOFT_ROUTE:="parasoft.example.com"}
export OCP_CREATE_PROJECT=${OCP_CREATE_PROJECT:="true"}
export OCP_PROJECT_NAME=${OCP_PROJECT_NAME:="shared-test"}

## Make the script interactive to set the variables
if [ "$INTERACTIVE" = "true" ]; then
	read -rp "OpenShift Cluster Host http(s)://ocp.example.com: ($OCP_HOST): " choice;
	if [ "$choice" != "" ] ; then
		export OCP_HOST="$choice";
	fi

	read -rp "OpenShift Username: ($OCP_USERNAME): " choice;
	if [ "$choice" != "" ] ; then
		export OCP_USERNAME="$choice";
	fi

	read -rsp "OpenShift Password: ($OCP_PASSWORD): " choice;
	if [ "$choice" != "" ] ; then
		export OCP_PASSWORD="$choice";
		echo -e ""
	fi

	read -rp "Parasoft Route: ($PARASOFT_ROUTE): " choice;
	if [ "$choice" != "" ] ; then
		export PARASOFT_ROUTE="$choice";
	fi

	read -rp "Create OpenShift Project? (true/false) ($OCP_CREATE_PROJECT): " choice;
	if [ "$choice" != "" ] ; then
		export OCP_CREATE_PROJECT="$choice";
	fi

	read -rp "OpenShift Project Name ($OCP_PROJECT_NAME): " choice;
	if [ "$choice" != "" ] ; then
		export OCP_PROJECT_NAME="$choice";
	fi

fi

# Log in
echo "Log in to OpenShift..."
oc login $OCP_HOST -u $OCP_USERNAME -p $OCP_PASSWORD

# Create/Use Project
echo "Create/Set Project..."
if [ "$OCP_CREATE_PROJECT" = "true" ]; then
    oc new-project $OCP_PROJECT_NAME --description="ChatOps with Rocket.Chat" --display-name="ChatOps - Rocket.Chat"
fi
if [ "$OCP_CREATE_PROJECT" = "false" ]; then
    oc project $OCP_PROJECT_NAME
fi

echo "Building and deploying Parasoft PSTSec..."

# Deploy Parasoft PSTsec (User repo)
echo "New Build for Parasoft PSTsec..."
oc new-build -i jboss-webserver31-tomcat8-openshift:1.2 --name=parasoft-ctp-pstsec --binary=true

echo "Put em.war back together...."
cat ../war/pstsec/pstsec.war.part* > ../war/pstsec/pstsec.war

echo "Start Build for Parasoft PSTsec..."
oc start-build parasoft-ctp-pstsec --from-file="../war/pstsec/pstsec.war" --follow

echo "New App for Parasoft PSTsec..."
oc new-app parasoft-ctp-pstsec --name=parasoft-ctp-pstsec


echo "Building and deploying Parasoft License Server..."

# Deploy Parasoft License Server 
echo "New Build for Parasoft License Server..."
oc new-build -i jboss-webserver31-tomcat8-openshift:1.2 --name=parasoft-ctp-license --binary=true

echo "Start Build for Parasoft License Server..."
oc start-build parasoft-ctp-license --from-file="../war/licenseserver/licenseserver.war" --follow

echo "New App for Parasoft License Server..."
oc new-app parasoft-ctp-license --name=parasoft-ctp-license

echo "Building and deploying Parasoft License Server..."

# Deploy Parasoft CTP (Engine Manager)
echo "New Build for Parasoft CTP (Engine Manager)..."
oc new-build -i jboss-webserver31-tomcat8-openshift:1.2 --name=parasoft-ctp-em --binary=true

echo "Put em.war back together...."
cat ../war/em/em.war.part* > ../war/em/em.war

echo "Start Build for Parasoft CTP (Engine Manager)..."
oc start-build parasoft-ctp-em --from-file="../war/em/em.war" --follow

echo "New App for Parasoft CTP (Engine Manager)..."
oc new-app parasoft-ctp-em --name=parasoft-ctp-em -e "CATALINA_OPTS_APPEND='-Xmx768m'" -e "GC_MAX_METASPACE_SIZE=256"

# Deploy Parasoft SOAtest & Virtualization
echo "New Build for Parasoft SOAtest & Virtualization..."
oc new-build -i jboss-webserver31-tomcat8-openshift:1.2 --name=parasoft-ctp-soavirt --binary=true

echo "Put soavirt.war back together...."
cat ../war/soavirt/soavirt.war.part* > ../war/soavirt/soavirt.war

echo "Start Build for Parasoft SOAtest & Virtualization..."
oc start-build parasoft-ctp-soavirt --from-file="../war/soavirt/soavirt.war" --follow

echo "New App for Parasoft SOAtest & Virtualization..."
oc new-app parasoft-ctp-soavirt --name=parasoft-ctp-soavirt

echo "Finished Deploying Parasoft CTP!!!!"
