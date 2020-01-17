<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.IBeanConstants" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.TokenBean" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="token" class="com.parasoft.ls.webapps.beans.admin.TokenBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);
 
 token.init(context);
 
 if (token.isMissingData()) {
     response.sendRedirect("home.jsp"); // rough workaround
 }
 
 boolean bExpired = token.isExpired();
 boolean bDeniedExists = token.isDeniedExists();
 
 boolean bReserved = token.isReservedToken();
 boolean bReservedGroupToken = token.isReservedGroupToken();
 String sPatternGroupName = token.getPatternGroupName();
 String sUserName = token.getUserName();
 String sHostName = token.getHostName();
 String sHostAddress = token.getHostAddress();
 String sClientId = token.getClientId();
 //String sManagerKey = token.getManagerKey(); 
 int    iFamilyId = token.getFamilyId();
 int    iMajor = token.getMajor();
 int    iMinor = token.getMinor();
 int    iMachineId = token.getMachineId();
 String sUserPattern = token.getUserPattern();
 String sHostPattern = token.getHostPattern();
 String sMachineIDPattern = token.getMachineIDPattern();
 String sHexMachineId = token.getHexMachineId();
 String sArchitecture = token.getTokenArchitecture();
 String sLicenseName = token.getLicenseName();
 String sExpirationTime = token.getExpirationTime();
 String sLicenseMachineId = token.getLicenseMachineId();
 String sLicenseArchitecture = token.getLicenseArchitecture();

 String sLicenseKey = token.getLicenseKey();
 String sTokenKey = token.getTokenKey();
 
 String[] asFeatureNames = token.getFeatureNames();
 boolean[] abUsedFeatures = token.getFeaturesUsed();
 String[][] asComaptibleFeatureNames = token.getComaptibleFeatureNames();
 boolean[][] abUsedComaptibleFeatures = token.getUsedCompatibleFeatures();
 
 boolean bShowLicensedProduct = token.isLicensedProductDifferent();
 String sLicensedProductName = token.getLicensedProductName();

 String sTitle = "Token details";
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 String sCaller = caller.getCaller(context);
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<SCRIPT language="JavaScript">
  function viewLicense(licKey)
  {
    document.view_license.<%=IBeanConstants.PARAM_LICENSE_ID%>.value=licKey;
    document.view_license.submit();
  }
  function refreshPage()
  {
    document.refresh_form.submit();
  }
  function denyToken()
  {
    document.set_deny_form.submit();
  }
  
</SCRIPT>

<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD class="label"><%
    	if (bReserved) {
    %>Reserved token<%
    	} else {
    %>Token<%
    	}
    %> details</TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A>&nbsp;&nbsp;&nbsp;&nbsp;<A href="javascript:refreshPage()">[Refresh page]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>
<%
	if (bExpired) {
%>
 Token expired.
<%
	} else {
%>
<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <%
  	if (bReserved) {
  %>
  <TR>
    <TD class="label">Match pattern:</TD>
    <%
    	if (bReservedGroupToken) {
    %>
    <TD><B>Group <%=sPatternGroupName%></B></TD>
    <%
    	} else if (sHostPattern != null) {
    %>
    <TD><B><%=sUserPattern%></B> on host <B><%=sHostPattern%></B></TD>
    <%
    	} else if (sMachineIDPattern != null) {
    %>
    <TD><B><%=sUserPattern%></B> on Machine ID <B><%=sMachineIDPattern%></B></TD>
    <%
    	}
    %>
  </TR>
  <%
  	}
  %>
  
  <TR>
    <TD class="label">Used by:</TD>
    <TD><B><%=sUserName%></B> on host <B><%=sHostName%></B> (<%=sArchitecture%>-<%=sHexMachineId%>) <%=sClientId%></TD>
  </TR>
  <TR>
    <TD class="label">Expire in:</TD>
    <TD><%=sExpirationTime%></TD>
  </TR>
  <TR>
    <TD class="label">License:</TD>
    <TD><A href="javascript:viewLicense('<%=sLicenseKey%>')"><%=sLicenseName%></A> (<%=sLicenseArchitecture%>-<%=sLicenseMachineId%>)</TD>
  </TR>
  <%if (bShowLicensedProduct) {%>
  <TR>
    <TD class="label">Product:</TD>
    <TD><%=sLicensedProductName%></TD>
  </TR>
  <%}%>

  <TR>
    <TD class="label">Features:</TD>
    <TD></TD>
  </TR>  
  <TR>
    <TD colspan="2">
      <UL class="list">
  <%
  	for (int i = 0; i < asFeatureNames.length; i++) {
  %>
    <%
    	if (abUsedFeatures[i]) {
    %>
    <LI><FONT class="feature_used"><%=asFeatureNames[i]%></FONT>
    <%
    	} else {
    %>
    <LI><FONT class="feature_unused"><%=asFeatureNames[i]%></FONT>
    <%
    	}
    %>
    <%
    	if ((asComaptibleFeatureNames[i] != null) && (asComaptibleFeatureNames[i].length > 0)) {
    %>
    <%
    	for (int t = 0; t < asComaptibleFeatureNames[i].length; t++) {
    %>
    <%
    	if (abUsedComaptibleFeatures[i][t]) {
    %>
    <BR><FONT class="feature_used"><%=asComaptibleFeatureNames[i][t]%> (compatible)</FONT>
    <%
    	} else {
    %>
    <BR><FONT class="feature_unused"><%=asComaptibleFeatureNames[i][t]%> (compatible)</FONT>
    <%
    	}
    %>
    <%
    	}
    %>
    <%
    	}
    %>
  <%
  	}
  %>
    </UL>
  </TR>
  
  <%
    	if (bDeniedExists) {
    %>
  <TR><TD colspan="2" class="text_gold">Token for <%=sUserName%> on host <%=sHostAddress%> is denied and will be released after its expiration time.</A></TD></TR>
  <%
  	} else {
  %>
  <TR><TD colspan="2">Add token (<%=sUserName%> on host <%=sHostAddress%>) to this license denied list. <A HREF="javascript:denyToken()">[Deny]</A></TD></TR>
  <%
    	}
    %>

</TABLE>
<FORM name="view_license" method="POST" action="license.jsp">
  <INPUT type="hidden" name="<%=IBeanConstants.PARAM_LICENSE_ID%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>
<FORM name="refresh_form" method="POST" action="token.jsp">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_USER_NAME%>" value="<%=sUserName%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_HOST_NAME%>" value="<%=sHostName%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_HOST_ADDRESS%>" value="<%=sHostAddress%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_MACHINE_ID%>" value="<%=iMachineId%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_CLIENT_ID%>" value="<%=sClientId%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_FAMILY_ID%>" value="<%=iFamilyId%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_MAJOR%>" value="<%=iMajor%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_MINOR%>" value="<%=iMinor%>">

  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_LICENSE_KEY%>" value="<%=sLicenseKey%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_TOKEN_KEY%>" value="<%=sTokenKey%>">
</FORM>

<FORM name="set_deny_form" method="POST" action="token.jsp">
  <INPUT type="hidden" name="<%=TokenBean.PARAM_ACTION%>" value="<%=TokenBean.ACTION_DENY_TOKEN%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_LICENSE_KEY%>" value="<%=sLicenseKey%>">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_TOKEN_KEY%>" value="<%=sTokenKey%>">
</FORM>

<% } %>
<jsp:include page="footer.jsp" flush="true"/>

    
    
