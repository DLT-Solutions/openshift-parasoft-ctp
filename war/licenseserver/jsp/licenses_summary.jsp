<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.beans.IBeanConstants" %>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.TokenBean" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="tokensView" class="com.parasoft.ls.webapps.beans.admin.TokensViewBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>
<jsp:useBean id="licensesView" class="com.parasoft.ls.webapps.beans.admin.LicensesManagementViewBean"/>
<%
 LicenseServerContext context = new LicenseServerContext(request, response);

 licensesView.init(context);

 String[] asStandardKeys = licensesView.getStandardKeys();
 String[] asUpgradeUnlinkedKeys = licensesView.getUpgradeUnlinkedKeys();

 //tokens.init(); 
 tokensView.init();
 
 String sTitle = "Licenses Summary";
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 String sCaller = caller.getCaller(context);
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<SCRIPT language="JavaScript">
function view(licKey)
{
  document.view_license.<%=IBeanConstants.PARAM_LICENSE_ID%>.value=licKey;
  document.view_license.submit();
}

function viewToken2(familyId, archId, major, minor, userName, hostName, hostAddress, clientId)
{
  document.view_token.<%=TokenBean.PARAMETER_USER_NAME%>.value = userName;
  document.view_token.<%=TokenBean.PARAMETER_HOST_NAME%>.value = hostName;
  document.view_token.<%=TokenBean.PARAMETER_HOST_ADDRESS%>.value = hostAddress;
  document.view_token.<%=TokenBean.PARAMETER_CLIENT_ID%>.value = clientId;
  document.view_token.<%=TokenBean.PARAMETER_FAMILY_ID%>.value = familyId;
  document.view_token.<%=TokenBean.PARAMETER_ARCH_ID%>.value = archId;
  document.view_token.<%=TokenBean.PARAMETER_MAJOR%>.value = major;
  document.view_token.<%=TokenBean.PARAMETER_MINOR%>.value = minor;
  document.view_token.submit();
}

function viewToken(licenseKey, tokenKey)
{
    document.view_token_form.<%=TokenBean.PARAMETER_LICENSE_KEY%>.value=licenseKey;
    document.view_token_form.<%=TokenBean.PARAMETER_TOKEN_KEY%>.value=tokenKey;
    document.view_token_form.submit();
}


</SCRIPT>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD><h1>Licenses Summary</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A>&nbsp;&nbsp;&nbsp;&nbsp;<A href="licenses_summary.jsp">[Refresh page]</A></TD></TR>
  <TR><TD height="30"></TD></TR>
</TABLE>

<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD><B>Tokens usage details:</B></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR>
    <TD><UL class="list">
<%
    String[] aLicenseKey = tokensView.getLicenseKeys();
    for (int i = 0; i < aLicenseKey.length; i++) {
        String sLicenseKey = aLicenseKey[i];
        if ((sLicenseKey == null) || (sLicenseKey.length() == 0)) {
            continue;
        }
        
        for (int idx = 0; idx < tokensView.getTokenAmount(sLicenseKey); idx++) {
        	
%>
<LI><A href="javascript:viewToken('<%=sLicenseKey%>','<%=tokensView.getTokenDataKey(sLicenseKey, idx)%>')">[View]</A> 
    <B><%=tokensView.getToolInfo(sLicenseKey, idx)%></B> used by <B><%=tokensView.getUserName(sLicenseKey, idx)%></B> on host <B><%=tokensView.getHostName(sLicenseKey, idx)%></B> <%=tokensView.getHostAddress(sLicenseKey, idx)%> - 
    expires in <%=tokensView.getExpirationTime(sLicenseKey, idx)%>.
<%
        }
    }
 %>
     </UL></TD>
  </TR>
  <TR><TD height="15"></TD></TR>
  <TR>
    <TD><B>Licenses usage details:</B></TD>
  </TR>
  <TR><TD height="10"></TD></TR>
  <TR><TD>  
<%
	for (int i = 0; i < asStandardKeys.length; i++) {
	String sLicenseKey = asStandardKeys[i];
    int iSize = licensesView.getSize(sLicenseKey);
    
    int iTokensUsed = licensesView.getTokensAmount(sLicenseKey);
    int iReservationSize = licensesView.getReservationsAmount(sLicenseKey);
    
    int iSummaryTokenUsed = licensesView.getSummaryTokensAmount(sLicenseKey);
    
    String sArchName = licensesView.getArchName(sLicenseKey);
    String sToolName = licensesView.getToolName(sLicenseKey);
    String sVersion = licensesView.getVersion(sLicenseKey);
    boolean isMachineIdValid = licensesView.isLicenseMachineIdValid(sLicenseKey);
%>
    <A href="javascript:view('<%=sLicenseKey%>')"><%=sToolName%> <%=sVersion%></A> For <%=sArchName%> <%if (!isMachineIdValid) {%><span class="level_alert">(Invalid License: The machine ID in the license does not match the machine ID of this License Server)</span> <%} %>
    <%
    	if (licensesView.hasLinkedKeys(sLicenseKey)) {
    %>
		 - <%
    	if (iSize <= 0) {
    %> <%=iTokensUsed%> token <%
 	if (iTokensUsed != 1) {
 %>s<%
 	}
 %> used. Unlimited licenses 
	       <%
 	} else {
 %> <%=iTokensUsed%> token<%
 	if (iTokensUsed != 1) {
 %>s<%
 	}
 %> used out of <%=iSize%> 
	       <%
 	       	}
 	       %>
	    <BR>
		<%
			String[] asLinkedKeys = licensesView.getLinkedKeys(sLicenseKey);
				for (int j = 0; j < asLinkedKeys.length; j++) {
			String sLinkedKey = asLinkedKeys[j];
				    int iLinkedSize = licensesView.getSize(sLinkedKey);
				    
				    int iLinkedTokensUsed = licensesView.getTokensAmount(sLinkedKey);
				    
				    String sLinkedArchName = licensesView.getArchName(sLinkedKey);
				    String sLinkedToolName = licensesView.getToolName(sLinkedKey);
				    String sLinkedVersion = licensesView.getVersion(sLinkedKey);
				    isMachineIdValid = licensesView.isLicenseMachineIdValid(sLicenseKey);
		%>
		    
		    <DIV>-&nbsp;<A href="javascript:view('<%=sLinkedKey%>')"><%=sLinkedToolName%> <%=sLinkedVersion%></A> For <%=sLinkedArchName%> <%if (!isMachineIdValid) {%><span class="level_alert">(Invalid License: The machine ID in the license does not match the machine ID of this License Server)</span> <%} %> -
		      <%
 	if (iLinkedSize <= 0) {
 %>
		      <%=iLinkedTokensUsed%> token
		      <%
		      	if (iLinkedTokensUsed != 1) {
		      %>s<%
		      	}
		      %> used. Unlimited licenses 
		      <%
		      	} else {
		      %>
		      	<%=iLinkedTokensUsed%> token<%
		      		if (iLinkedTokensUsed != 1) {
		      	%>s<%
		      		}
		      	%> used out of <%=iLinkedSize%>
		      <%
		      	}
		      %></DIV>
		    <%
		    	}
		    		    		    	}
		    %>
    <UL class="list">
      <%
      	if (iSize <= 0) {
      %>
      <LI><DIV class="level_<%=licensesView.getAvailableTokensStyle(sLicenseKey)%>"><%=iSummaryTokenUsed%> token
      <%
      	if (iSummaryTokenUsed != 1) {
      %>s<%
      	}
      %> used. Unlimited licenses</DIV> 
      <%
       	} else {
       %>
      	<LI><DIV class="level_<%=licensesView.getAvailableTokensStyle(sLicenseKey)%>"><%=iSummaryTokenUsed%> token<%
      		if (iSummaryTokenUsed != 1) {
      	%>s<%
      		}
      	%> used out of <%=iSize%></DIV>
      	<%
      		if (iReservationSize > 0) {
      	%>
      	<LI><%=iReservationSize%> reserved out of <%=iSize%>
      	<%
      		}
      	%>
      <%
      	}
      %>
    </UL>
<%
	}
%>

<%
	if (asUpgradeUnlinkedKeys.length > 0) {
%>

	<P class="warning_12">Not linked upgrade licenses:</P>
	
	<%
			for (int i = 0; i < asUpgradeUnlinkedKeys.length; i++) {
				String sLicenseKey = asUpgradeUnlinkedKeys[i];
			    int iSize = licensesView.getSize(sLicenseKey);
			    
			    int iTokensUsed = licensesView.getTokensAmount(sLicenseKey);
			    
			    String sArchName = licensesView.getArchName(sLicenseKey);
			    String sToolName = licensesView.getToolName(sLicenseKey);
			    String sVersion = licensesView.getVersion(sLicenseKey);
			    boolean isMachineIdValid = licensesView.isLicenseMachineIdValid(sLicenseKey);
		%>
	    <A href="javascript:view('<%=sLicenseKey%>')"><%=sToolName%> <%=sVersion%></A> For <%=sArchName%> <%if (!isMachineIdValid) {%><span class="level_alert">(Invalid License: The machine ID in the license does not match the machine ID of this License Server)</span> <%} %>
	    <UL class="list">
	      <%
	      	if (iSize <= 0) {
	      %>
	      <LI><DIV class="level_<%=licensesView.getAvailableTokensStyle(sLicenseKey)%>"><%=iTokensUsed%> token
	      <%
	      	if (iTokensUsed != 1) {
	      %>s<%
	      	}
	      %> used. Unlimited licenses</DIV> 
	      <%
 	      	} else {
 	      %>
	      	<LI><DIV class="level_<%=licensesView.getAvailableTokensStyle(sLicenseKey)%>"><%=iTokensUsed%> token<%
	      		if (iTokensUsed != 1) {
	      	%>s<%
	      		}
	      	%> used out of <%=iSize%></DIV>
	      <%
	      	}
	      %>
	    </UL>
	<%
		}
	%>
<%
	}
%>

</TD></TR>
</TABLE>

<FORM name="view_license" method="POST" action="license.jsp">
  <INPUT type="hidden" name="<%=IBeanConstants.PARAM_LICENSE_ID%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>
<FORM name="view_token" method="POST" action="token.jsp">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_USER_NAME%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_HOST_NAME%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_HOST_ADDRESS%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_CLIENT_ID%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_FAMILY_ID%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_ARCH_ID%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_MAJOR%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_MINOR%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>
<FORM  name="view_token_form" method="post" action="token.jsp">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_LICENSE_KEY%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_TOKEN_KEY%>" value="">
</FORM>


<jsp:include page="footer.jsp" flush="true"/>

    
    
