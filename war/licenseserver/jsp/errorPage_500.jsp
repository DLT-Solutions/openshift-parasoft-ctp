<%@ page isErrorPage="true" %>
<%@ page import="com.parasoft.ls.main.engine.ILicenseServerConstants" %>
<%@ page import="org.springframework.security.core.userdetails.UsernameNotFoundException" %>

<jsp:useBean id="busy" class="com.parasoft.ls.webapps.beans.BusyPageBean"/>

<%
 
 boolean bIsStarted = busy.isLicenseServerStarted();
 if (bIsStarted) {
     busy.logException(exception);
 }

 String sTitle = "License Server";

%>
<div style="font-family: 'Helvetica'; font-size: 14px;">
<%if (exception.getCause() instanceof UsernameNotFoundException) { %>
    User Administration module (pstsec) is not configured. Please verify settings in TOMCAT_HOME/LicenseServer/conf/PSTSecConfig.xml and restart tomcat.
<% } else { %>
    There was a problem. See logs for details.
<% } %>
</div>

