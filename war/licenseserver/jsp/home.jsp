<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>
<jsp:useBean id="lsstatus" class="com.parasoft.ls.webapps.beans.LicenseServerStatusBean"/>

<%
	String sTitle = "License Server";
    LicenseServerContext context = new LicenseServerContext(request, response);
    if (context.isParameterPresent("restartLS")) {
        lsstatus.restartLicenseServer();
    }
    String redirectUrl = lsstatus.getLicenseRequestsDelegateUrl();
    Boolean isRedirected = false;
    if (redirectUrl != null && redirectUrl.trim().length() > 0) {
        isRedirected = true;
    }
    String sCaller = caller.getEncodedCaller(context);
    caller.init(context);
    boolean bLicensed = lsstatus.isLicensed();
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<DIV ALIGN="CENTER">
<TABLE cellspacing="0" cellpadding="0" border="0" align="center">
  <TR><TD height="30"></TD></TR>
<%
	if (!bLicensed) { 
       String sLicConfigUrl = lsstatus.getLicenseConfigurationPageUrl();
%>  
  <TR><TD class="warning_12" align="center">License is not valid. <A href="<%=sLicConfigUrl%>">[Configure]</A>.</TD></TR>
<%
	}
%>

<%if (isRedirected) { %>
		<TR><TD style="background-color:rgb(255, 227, 218);padding:10px;">This License Server works in license request delegation mode.<br/>All requests from Parasoft Tools to this License Server are redirected to License Server on <%=redirectUrl%>.<br/>Local licenses on this License Server are not used.<br/> NOTE: This applies to Parasoft Tools 10.x and above</TD></TR>
	<%} %>
</TABLE>
<TABLE cellspacing="20" cellpadding="0" border="0" align="CENTER">
<TR>
<TD><A href="addLicense.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=sCaller%>"><IMG SRC="../images/add_license.gif" BORDER="0"></A></TD>
<TD><A HREF="licenses.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=sCaller%>""><IMG SRC="../images/show_licenses.gif" BORDER="0"></A></TD>
</TR>
<TR>
<TD><A href="licenses_summary.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=sCaller%>"><IMG SRC="../images/license_summary.gif" BORDER="0"></A></TD>
<TD><A href="tools.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=sCaller%>"><IMG SRC="../images/supported_tools.gif" BORDER="0"></A></TD>
</TR>
</TABLE>
</DIV>
<jsp:include page="footer.jsp" flush="true"/>

