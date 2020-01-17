<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LinkedLicenseBean" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.UpdateLinkedLicenseBean" %>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.UserLockedLicenseBean" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>
<jsp:useBean id="llBean" class="com.parasoft.ls.webapps.beans.admin.LinkedLicenseBean"/>
<jsp:useBean id="ullBean" class="com.parasoft.ls.webapps.beans.admin.UpdateLinkedLicenseBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);

 ullBean.init(context);

 llBean.init(context);

 String sTitle = "Linking upgrade license";
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 String[] asParamsToExclude = { UserLockedLicenseBean.PARAM_ACTION };
 String sCaller = caller.getCaller(context, asParamsToExclude);

 String sLicenseKey = llBean.getLicenseKey();
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD class="label"><%=sTitle%></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A>&nbsp;&nbsp;&nbsp;&nbsp;<A href="javascript:location.reload(true)">[Refresh page]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>

<TABLE cellspacing="0" cellpadding="2" border="0" class="content">



<TR>
<TD align="left" valign="top">

<%if (llBean.getLinkedCount() <= 0) {%>
	<P class="warning_12">There is no license which can be linked to!</P>
<%} else { %>
    <P><B>Select the license from the following list:</B></P>
    
  <% for (int idx = 0; idx < llBean.getLinkedCount(); idx++) {

       if (idx > 0) { %>
	<HR>
	<% } %>

<TABLE cellspacing="0" cellpadding="3" border="0"  <% if (llBean.isLinked(idx)) { %>bgcolor="lightgray"<% } %> class="content">
  <TR>
    <TD class="label">Tool:</TD><TD><%=llBean.getLicenseToolName(idx)%></TD>
    <TD>
    <% if (!llBean.isLinked(idx)) { %>
    <A href="link_upgrade_license.jsp?<%=UpdateLinkedLicenseBean.PARAM_ACTION%>=<%=UpdateLinkedLicenseBean.ACTION_SET%>&<%=UpdateLinkedLicenseBean.PARAM_LICENSE_ID%>=<%=sLicenseKey%>&<%=LinkedLicenseBean.PARAM_LICENSE_ID_LINK%>=<%=llBean.getLicenseKey(idx)%>">[Select]</A>
    <% } else { %>
    <B>Selected</B>
    <% } %>
    </TD>
  </TR>
  <TR>
    <TD class="label">Machine ID:</TD><TD> <%=llBean.getLicenseMachineName(idx)%></TD><TD></TD>
  </TR>
  <TR>
    <TD class="label">Expiration date:</TD><TD> <%=llBean.getLicenseExpirationDate(idx)%></TD><TD></TD>
  </TR>
  <TR>
    <TD class="label">Tokens:</TD>
    <TD colspan="2">
        <% if (llBean.getLicenseAvailableTokens(idx) > 0) { %>
           <%=llBean.getLicenseAvailableTokens(idx)%>
           <% if (llBean.getLicenseAvailableTokens(idx) < llBean.getLicenseAvailableTokens() || 
        		  llBean.getLicenseAvailableTokens() == 0 ) { %>
        		  <SPAN class="text_gold"> (less than upgrade)</SPAN>
           <% } %>
        <% } else { %>Unlimited<% } %></TD>
  </TR>
</TABLE>
<TABLE cellspacing="0" cellpadding="0" border="0">
  <TR><TD class="label" colspan="2">License features:</TD></TR>  
  <TR><TD colspan="2">
    <UL class="list">
  <% 
    String [] aFeatureName = llBean.getLicenseFeatureNames(idx);
    for (int i = 0; i < aFeatureName.length; i++) { %>
    <LI><%=aFeatureName[i]%>
  <% } %>
    </UL>
  </TD></TR>
</TABLE>

     <% if (llBean.isCurrentlyLinked(idx)) {%>

<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD class="label">Currently linked with:</TD></TR>
    <TR><TD>
    <UL class="list">
  <% 
          String [] aDescription = llBean.getCurrentlyLinkedDescription(idx);
          for (int i = 0; i < aDescription.length; i++) { %>
    <LI><%=aDescription[i]%>
       <% } %>
    </UL>
  </TD></TR>
    
</TABLE>

<% 
        } 
    }
}
%>
</TD>

<TD width="100px"></TD>

<TD align="left" valign="top">
<P><B>Upgrade license:</B></P>
<TABLE id="td_li_color_gray" cellspacing="0" cellpadding="3" border="0" class="content">
  <TR>
    <TD class="label">Tool:</TD>
    <TD> <%=llBean.getLicenseToolName()%></TD>
    <TD><A href="link_upgrade_license.jsp?<%=UpdateLinkedLicenseBean.PARAM_LICENSE_ID%>=<%=sLicenseKey%>&<%=UpdateLinkedLicenseBean.PARAM_ACTION%>=<%=UpdateLinkedLicenseBean.ACTION_CLEAR%>">[Clear]</A></TD>	
  </TR>
  <TR>
    <TD class="label">Machine ID:</TD>
    <TD> <%=llBean.getLicenseMachineName()%></TD><TD></TD>
  </TR>
  <TR>
    <TD class="label">Expiration date:</TD>
    <TD> <%=llBean.getLicenseExpirationDate()%></TD><TD></TD>
  </TR>
  <TR>
    <TD class="label">Tokens:</TD>
    <TD><% if (llBean.getLicenseAvailableTokens() > 0) { 
       %><%=llBean.getLicenseAvailableTokens()%><% } else { %>Unlimited<% } %></TD><TD></TD>
  </TR>
</TABLE>
<TABLE id="td_li_color_gray" cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD class="label" colspan="2">License features:</TD></TR>  
  <TR><TD colspan="2">
    <UL class="list">
  <% 
    String [] aFeatureName = llBean.getLicenseFeatureNames();
    for (int i = 0; i < aFeatureName.length; i++) { %>
    <LI><%=aFeatureName[i]%>
  <% } %>
    </UL>
  </TD></TR>
</TABLE>
</TD>

</TR>
</TABLE>


<jsp:include page="footer.jsp" flush="true"/>

    
    
