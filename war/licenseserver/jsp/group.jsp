<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.PatternGroupBean" %>
<%@ page import="toolkit.util.web.HTMLConvert" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="group" class="com.parasoft.ls.webapps.beans.admin.PatternGroupBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>

<%
	LicenseServerContext context = new LicenseServerContext(request, response);

 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");

 group.init(context);
 String[] asUserPatterns = group.getUserPatterns();
 String[] asHostPatterns = group.getHostPatterns();
 String[] asGroupNames = group.getGroupNames();
 String[][] asTreeLeafStr1 = group.getTreeLeafStr1();
 String[][] asTreeLeafStr2 = group.getTreeLeafStr2();
 int[][] aTreeGroupLevels = group.getTreeGroupLevels();
 
 String[] asGroupToAddNames = group.getGroupsToAddNames();
 
 String sGroupName = group.getGroupName();
 String sNewUserPattern = group.getNewUserPattern();
 String sNewHostPattern = group.getNewHostPattern();

 String sTitle = "Pattern group edit";
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>
<SCRIPT language="JavaScript">
 function addPattern() 
 {
     document.mtForm.<%=PatternGroupBean.PARAM_ACTION%>.value = "<%=PatternGroupBean.ADD_ACTION%>";
     document.mtForm.submit();
 }

 function importPattern() 
 {
     document.mtForm.encoding = 'multipart/form-data';
     document.mtForm.submit();
 }
 
 function addGroup()
 {
     document.mtForm.<%=PatternGroupBean.PARAM_ACTION%>.value = "<%=PatternGroupBean.ADD_GROUP_ACTION%>";
     document.mtForm.submit();
 }
 
 function removePattern(patternGroupName, userPattern, hostPattern)
 {
     if (confirm("Removing pattern for user: "+userPattern+" and host: "+hostPattern+", are you sure ?")) {
	     document.mtForm.<%=PatternGroupBean.PARAM_ACTION%>.value = "<%=PatternGroupBean.REMOVE_ACTION%>";
	     document.mtForm.<%=PatternGroupBean.PARAM_PATTERN_GROUP_NAME%>.value = patternGroupName;
	     document.mtForm.<%=PatternGroupBean.PARAM_USER_PATTERN%>.value = userPattern;
	     document.mtForm.<%=PatternGroupBean.PARAM_HOST_PATTERN%>.value = hostPattern;
	
	     document.mtForm.submit();
	 }
 }
 
 function removeGroup(patternGroupName, groupName)
 {
     if (confirm("Removing group: "+groupName+", are you sure ?")) {
	     document.mtForm.<%=PatternGroupBean.PARAM_ACTION%>.value = "<%=PatternGroupBean.REMOVE_GROUP_ACTION%>";
	     document.mtForm.<%=PatternGroupBean.PARAM_PATTERN_GROUP_NAME%>.value = patternGroupName;
	     document.mtForm.<%=PatternGroupBean.PARAM_GROUP_TO_REMOVE_NAME%>.value = groupName;
	  
	     document.mtForm.submit();
	 }
 }
 
</SCRIPT>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD class="label">Edit pattern group: <%=HTMLConvert.toHTML(sGroupName, false)%></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>

<FORM name="mtForm" action="group.jsp" method="post">
<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <TR>
    <TD class="label">New pattern:&nbsp;&nbsp;&nbsp;&nbsp;</TD>
    <TD>User name: <INPUT type="text" name="<%=PatternGroupBean.PARAM_USER_PATTERN%>" value="<%=HTMLConvert.toHTML(sNewUserPattern, false)%>">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Host name: <INPUT type="text" name="<%=PatternGroupBean.PARAM_HOST_PATTERN%>" value="<%=HTMLConvert.toHTML(sNewHostPattern, false)%>">
      <A href="javascript:addPattern()">[Add]</A></TD>
  </TR>
  <%
  	if (group.hasErrors(PatternGroupBean.ADD_ACTION)) { 
         String[] asErrors = group.getErrors(PatternGroupBean.ADD_ACTION);
  %>
  <TR>
    <TD></TD>
    <TD class="warning_10">
<%
	for (int i = 0; i < asErrors.length; i++) {
%><%=asErrors[i]%><BR>
<%
	}
%>
    </TD>
  </TR>
  <%
  	}
  %>


  <TR><TD colspan="2" height="10"></TD></TR>
  <TR>
    <TD class="label">Import:&nbsp;&nbsp;&nbsp;&nbsp;</TD>
    <TD>Patterns (csv): <INPUT type="file" name="<%=PatternGroupBean.PARAM_CSV_FILE%>" size="50"value="">&nbsp;</INPUT><A href="javascript:importPattern()">[Import]</A></TD>
  </TR>
  <%
    if (group.hasErrors(PatternGroupBean.IMPORT_CSV_ACTION)) { 
         String[] asErrors = group.getErrors(PatternGroupBean.IMPORT_CSV_ACTION);
  %>
  <TR>
    <TD></TD>
    <TD class="warning_10">
      <% for (int i = 0; i < asErrors.length; i++) { %>
         <%=asErrors[i]%><BR>
      <% } %>
    </TD>
  </TR>
 <% } %>

  
  <%
  	if (asGroupToAddNames.length > 0) {
  %>
  <TR><TD colspan="2" height="10"></TD></TR>
  <TR>
    <TD class="label">Add group:&nbsp;&nbsp;&nbsp;&nbsp;</TD>
    <TD>Group name: 
      <SELECT name="<%=PatternGroupBean.PARAM_GROUP_NAME%>">
      <%
      	for (int i = 0; i < asGroupToAddNames.length; i++) {
      %>
        <OPTION value="<%=HTMLConvert.toHTML(asGroupToAddNames[i], false)%>"><%=HTMLConvert.toHTML(asGroupToAddNames[i], false)%></OPTION>
      <%
      	}
      %>
      </SELECT>
      <A href="javascript:addGroup()">[Add]</A></TD>
  </TR>
  <%
  	}
  %>
 
  <INPUT type="hidden" name="<%=PatternGroupBean.PARAM_GROUP_TO_REMOVE_NAME%>">
  
  <%
    	if (group.hasErrors(PatternGroupBean.ADD_GROUP_ACTION)) { 
           String[] asErrors = group.getErrors(PatternGroupBean.ADD_GROUP_ACTION);
    %>
  <TR>
    <TD></TD>
    <TD class="warning_10">
<%
	for (int i = 0; i < asErrors.length; i++) {
%><%=asErrors[i]%><BR>
<%
	}
%>
    </TD>
  </TR>
  <%
  	}
  %>
</TABLE>
<TABLE cellspacing="0" cellpadding="2" border="0">
  <TR><TD colspan="2" height="15"></TD></TR>
  <TR><TD colspan="2"><B>Existing patterns:</B></TD></TR>
  <TR><TD colspan="2" height="10"></TD></TR>
  <%
  	if ((asUserPatterns == null) || (asUserPatterns.length == 0)) {
  %>
  <TR><TD colspan="2">No patterns defined.</TD></TR>
<%
	} else {
       for (int i = 0; i < asUserPatterns.length; i++) {
%>
  <TR>
    <TD width="200"><NOBR>-&nbsp;<B><%=HTMLConvert.toHTML(asUserPatterns[i], false)%></B>&nbsp;on&nbsp;host&nbsp;<B><%=asHostPatterns[i]%></B></NOBR></TD>
    <TD>
        <A href="javascript:removePattern('<%=sGroupName%>','<%=asUserPatterns[i]%>','<%=asHostPatterns[i]%>');">[Remove]</A>&nbsp;&nbsp;</TD>
  </TR>
  <%
  	}
       }
  %>
  <TR><TD height="15" colspan="2"></TD></TR>
  <TR><TD colspan="2"><B>Existing groups:</B></TD></TR>
  <TR><TD colspan="2" height="10"></TD></TR>
  <%
  	if ((asGroupNames == null) || (asGroupNames.length == 0)) {
  %>
  <TR><TD colspan="2">No pattern groups added.</TD></TR>
  <%
  	} else { 
         for (int i = 0; i < asGroupNames.length; i++) {
  %>
  <TR><TD width="200"><NOBR>-&nbsp;Pattern&nbsp;group&nbsp;<B><%=asGroupNames[i]%></B></NOBR></TD>
    <TD><A href="javascript:removeGroup('<%=sGroupName%>','<%=asGroupNames[i]%>');">[Remove]</A></TD>
  </TR>
  <%
  	if ((asTreeLeafStr1 != null) && (asTreeLeafStr1[i] != null)) { 
         for (int t = 0; t < asTreeLeafStr1[i].length; t++) {
  %>
  <TR>
    <%
    	if (asTreeLeafStr2[i][t] != null) {
    %>
    <TD colspan="2" style="padding-left:<%=aTreeGroupLevels[i][t] * 10 + 20%>">+pattern&nbsp;<B><%=asTreeLeafStr1[i][t]%></B>&nbsp;on host&nbsp;<B><%=asTreeLeafStr2[i][t]%></B></TD>
    <%
    	} else {
    %>
    <TD colspan="2" style="padding-left:<%=aTreeGroupLevels[i][t] * 10 + 20%>">+pattern&nbsp;group&nbsp;<B><%=asTreeLeafStr1[i][t]%></B></TD>
    <%
    	}
    %>
  </TR>     
  <%
       	}
            }
       %>
  <%
  	}
       }
  %>
</TABLE>
<INPUT type="hidden" name="<%=PatternGroupBean.PARAM_ACTION%>" value=""> 
<INPUT type="hidden" name="<%=PatternGroupBean.PARAM_PATTERN_GROUP_NAME%>" value="<%=HTMLConvert.toHTML(sGroupName, false) %>"> 
</FORM>
<jsp:include page="footer.jsp" flush="true"/>
 
