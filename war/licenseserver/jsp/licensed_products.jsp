<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.IBeanConstants" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="licensedProducts" class="com.parasoft.ls.webapps.beans.admin.LicensedProductsViewBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
 LicenseServerContext context = new LicenseServerContext(request, response);
 
 licensedProducts.init(context);
 
 String sLicenseKey = licensedProducts.getLicenseKey();
 String sLicenseName = licensedProducts.getLicenseName();
 String sLicenseArchitecture = licensedProducts.getLicenseArchitecture();
 String sLicenseMachineId = licensedProducts.getLicenseMachineId();
 
  
 
 String sTitle = "Licensed product details";
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
  
</SCRIPT>


<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD class="label">Licensed Tools details</TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>

<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <TR>
    <TD class="label">License:</TD>
    <TD><A href="javascript:viewLicense('<%=sLicenseKey%>')"><%=sLicenseName%></A>&nbsp;(<%=sLicenseArchitecture%>-<%=sLicenseMachineId%>)</TD>
  </TR>
  <TR>
    <TD  colspan="2">&nbsp;</TD>
  </TR>

  <%for (int idx = 0; idx < licensedProducts.getLicensedProductAmount(); idx++) {%>
  <TR>
    <TD class="label">Tool:</TD>
    <TD><%=licensedProducts.getLicensedProductName(idx)%></TD>
  </TR>  
  <TR>
    <TD class="label">Features:</TD>
    <TD></TD>
  </TR>
  <TR><TD colspan="2">
    <UL class="list">
<% String [] aFeature = licensedProducts.getLicensedProductFeatures(idx);
   for (int i = 0; i < aFeature.length; i++) {%>
      <LI><%=aFeature[i]%>
<% } %>
    </UL>
  </TD></TR>

  <%}%>
</TABLE>

<FORM name="view_license" method="POST" action="license.jsp">
  <INPUT type="hidden" name="<%=IBeanConstants.PARAM_LICENSE_ID%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>

<jsp:include page="footer.jsp" flush="true"/>

    
    
