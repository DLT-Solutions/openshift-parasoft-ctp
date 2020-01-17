<%@ page contentType="text/html; charset=iso-8859-1"%>
<%@ page import="java.util.Date" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LicenseBean" %>
<%@ page import="com.parasoft.ls.webapps.common.LicenseServerContext" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.UserLockedLicenseBean" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.TokenBean" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.PatternGroupsBean" %>
<%@ page import="com.parasoft.ls.webapps.beans.admin.LicenseFiltersBean" %>
<%@ page import="com.parasoft.ls.main.common.ReservationDescription" %>
<%@ page import="com.parasoft.ls.main.util.DateUtil" %>
<%@ page import="com.parasoft.ls.main.util.ReservationDateUtil" %>
<%@ page import="com.parasoft.ls.webapps.common.IWebConstants" %>
<%@ page import="com.parasoft.ls.webapps.beans.IBeanConstants" %>
<%@ page import="com.parasoft.ls.main.util.RegexUtil" %>
<%@ page import="toolkit.util.web.HTMLConvert" %>
<%@ page errorPage="busy.jsp" %>

<jsp:useBean id="licenseView" class="com.parasoft.ls.webapps.beans.admin.LicenseViewBean"/>
<jsp:useBean id="license" class="com.parasoft.ls.webapps.beans.admin.LicenseBean"/>
<jsp:useBean id="userLockedLicense" class="com.parasoft.ls.webapps.beans.admin.UserLockedLicenseBean"/>
<jsp:useBean id="caller" scope="session" class="com.parasoft.ls.webapps.beans.CallerBean"/>
<jsp:useBean id="groups" class="com.parasoft.ls.webapps.beans.admin.PatternGroupsBean"/>
<jsp:useBean id="linked" class="com.parasoft.ls.webapps.beans.admin.LinkedLicenseBean"/>
<jsp:useBean id="filters" class="com.parasoft.ls.webapps.beans.admin.LicenseFiltersBean"/>
<%
    LicenseServerContext context = new LicenseServerContext(request, response);

 if ("refreshUsage".equals(context.getParameter(UserLockedLicenseBean.PARAM_ACTION))) {
     groups.refreshAllTokenGroupMatching();
     filters.cacheClean();
 }

 userLockedLicense.init(context);
 String[] asLockedUserNames = userLockedLicense.getUserNames();
 String[] asLockedHostNames = userLockedLicense.getHostNames();
 String[] asLockedMachineIDNames = userLockedLicense.getMachineIDNames();
 Date[] aReservationDates = userLockedLicense.getDates();
 boolean[] aReservationRemovability = userLockedLicense.getRemovabilities();
 boolean showRemoveAllReservations = true;
 for (int i = 0; i < aReservationRemovability.length; i++) {
     if (!aReservationRemovability[i]) {
         showRemoveAllReservations = false;
         break;
     }
 }
 String[] asUsersGroupNames = userLockedLicense.getGroupNames();
 boolean[] abGroupStatuses = userLockedLicense.getGroupsStatus();
 String[] asLockIdfs = userLockedLicense.getReservationIdentifiers();
 int[] aGroupCounts = userLockedLicense.getGroupSizes();
 int[] aGroupCountsGroups = userLockedLicense.getGroupSizesGroups();
 int[] aCounts = userLockedLicense.getCounts(); 
 boolean[] abRegExp = userLockedLicense.getRegExp();
 boolean[] abUserGroup = userLockedLicense.isUserGroupToken();
 int reservedCount = userLockedLicense.getReservedLicensesCount();
 String sNewUser = userLockedLicense.getNewUser();
 String sNewHost = userLockedLicense.getNewHost();
 String sNewMachineID = userLockedLicense.getNewMachineID();
 String sNewMachineIDConfirm = userLockedLicense.getNewMachineIDConfirm();
 int newCount = userLockedLicense.getNewCount();
 int newGroupCount = userLockedLicense.getNewGroupCount();
 String sNewGroupName = userLockedLicense.getNewGroupName();

 groups.init(context);
 String[] asNewGroupNames = groups.getGroupNames();
 int[] aNewGroupSizes = groups.getGroupSizes();
 int[] aNewGroupSizesGroups = groups.getGroupSizesGroups();

 linked.init(context);
 licenseView.init(context);
 
 license.init(context);
 String sLicenseKey = license.getLicenseKey();
 
 String sToolName = license.getToolName();
 String sMachineId = license.getMachineId();
 boolean isLicenseValid = license.isValid();
 String sExpDate = license.getExpirationDate();
 int availableLicenses = license.getAvailableLicenses();
 int takenLicenses = license.getTakenLicenses();
 boolean bUpgrade = license.isUpgrade();
 boolean bUserLockedLicense = license.isUserLockedLicense(); 
 boolean bBackwardCompatible = license.isBackwardCompatible();
 boolean bMachineLockedLicense = license.isMachineLocked();
  
 String[] asLicenseFeatures = license.getLicenseFeatures();
 boolean[] abLicenseFeaturesComaptible = license.getLicenseFeaturesComaptible();
 String sLicenseFlags = null;
 if (bUpgrade) {
     sLicenseFlags = "Upgrade license";
 }
 if (bUserLockedLicense) {
     if (sLicenseFlags == null) {
         sLicenseFlags = "";
     } else {
         sLicenseFlags += ", ";
     }
     sLicenseFlags += "User Locked license";
 }
 if (bBackwardCompatible) {
     if (sLicenseFlags == null) {
         sLicenseFlags = "";
     } else {
         sLicenseFlags += ", ";
     }
     sLicenseFlags += "Backward Compatible license";
 }

 if (bMachineLockedLicense) {
     if (sLicenseFlags == null) {
         sLicenseFlags = "";
     } else {
         sLicenseFlags += ", ";
     }
     sLicenseFlags += "Machine Locked license";
 }
 
 filters.init(context);
 
 String sTitle = "License details";
 caller.init(context);
 String sBack = caller.getBack(context, context.getContextPath() + "/jsp/home.jsp");
 String[] asParamsToExclude = { UserLockedLicenseBean.PARAM_ACTION };
 String sCaller = caller.getCaller(context, asParamsToExclude);
%>

<jsp:include page="header.jsp" flush="true">
   <jsp:param name="title" value="<%=sTitle%>" />
</jsp:include>

<SCRIPT language="JavaScript">


  function removeAllFilters()
  {
      if (confirm("Removing all filtered records, are you sure ?")) {
          document.removeFilterForm.action="license.jsp#filters_list";
          document.removeFilterForm.<%=LicenseFiltersBean.PARAM_ACTION%>.value="<%=LicenseFiltersBean.ACTION_REMOVE_ALL_FILTERS%>";
          document.removeFilterForm.submit();
      }
  }

  function removeFilter(filterPatternKey, description)
  {
      if (confirm("Removing filtered record for "+description+", are you sure ?")) {
          document.removeFilterForm.action="license.jsp#filters_list";
          document.removeFilterForm.<%=LicenseFiltersBean.PARAM_FILTER_PATTERN_KEY%>.value=filterPatternKey;
          document.removeFilterForm.submit();
      }
  }

  function addFilter()
  {
      document.addFilterForm.action="license.jsp#add_filter";
      document.addFilterForm.<%=LicenseFiltersBean.PARAM_ACTION%>.value="<%=LicenseFiltersBean.ACTION_ADD_FILTER%>";
      document.addFilterForm.submit();
  }

  function addAllowFilter()
  {
      document.addFilterForm.action="license.jsp#add_filter";
      document.addFilterForm.<%=LicenseFiltersBean.PARAM_ACTION%>.value="<%=LicenseFiltersBean.ACTION_ADD_ALLOW_FILTER%>";
      document.addFilterForm.submit();
  }
  
  function addGroupFilter()
  {
      document.addFilterForm.action="license.jsp#add_filter";
      document.addFilterForm.<%=LicenseFiltersBean.PARAM_ACTION%>.value="<%=LicenseFiltersBean.ACTION_ADD_GROUP_FILTER%>";
      document.addFilterForm.submit();
  }

  function addAllowGroupFilter()
  {
      document.addFilterForm.action="license.jsp#add_filter";
      document.addFilterForm.<%=LicenseFiltersBean.PARAM_ACTION%>.value="<%=LicenseFiltersBean.ACTION_ADD_ALLOW_GROUP_FILTER%>";
      document.addFilterForm.submit();
  }
  
  function removeAll()
  {
      if (confirm("Removing all reserved license, are you sure ?")) {
          document.lockForm.action="license.jsp#locks_list";
          document.lockForm.<%=UserLockedLicenseBean.PARAM_ACTION%>.value="<%=UserLockedLicenseBean.ACTION_REMOVE_LOCKS%>";
          document.lockForm.submit();
      }
  }
  
  function addReserved()
  {
      document.lockForm.action="license.jsp#add_lock";
      document.lockForm.<%=UserLockedLicenseBean.PARAM_ACTION%>.value="<%=UserLockedLicenseBean.ACTION_ADD_LOCK%>";
      document.lockForm.submit();
  }
  
  function addGroupReserved()
  {
      document.lockForm.action="license.jsp#add_lock";
      document.lockForm.<%=UserLockedLicenseBean.PARAM_ACTION%>.value="<%=UserLockedLicenseBean.ACTION_ADD_GROUP_LOCK%>";
      document.lockForm.submit();
  }
  
  function removeReserved(lockIdf)
  {
      if (confirm("Removing reserved license, are you sure ?")) {
          document.lockForm.action="license.jsp#locks_list";
          document.lockForm.<%=UserLockedLicenseBean.PARAM_ACTION%>.value="<%=UserLockedLicenseBean.ACTION_REMOVE_SINGLE_LOCK%>";
          document.lockForm.<%=UserLockedLicenseBean.PARAM_LOCK_IDF%>.value=lockIdf;
          document.lockForm.submit();
      }
  }
  
  function refreshPage()
  {
      document.lockForm.<%=UserLockedLicenseBean.PARAM_ACTION%>.value="";
      document.lockForm.submit();
  }
  
  function refreshLicenseUsage()
  {
      document.lockForm.<%=UserLockedLicenseBean.PARAM_ACTION%>.value="refreshUsage";
      document.lockForm.submit();
  }
  
  function viewLicense(licenseKey)
  {
      document.view_license_form.<%=UserLockedLicenseBean.PARAM_LICENSE_ID%>.value=licenseKey;
      document.view_license_form.submit();
  }

  function viewToken(licenseKey, tokenKey)
  {
      document.view_token_form.<%=TokenBean.PARAMETER_LICENSE_KEY%>.value=licenseKey;
      document.view_token_form.<%=TokenBean.PARAMETER_TOKEN_KEY%>.value=tokenKey;
      document.view_token_form.submit();
  }

  function viewLicensedProducts(licenseKey)
  {
      document.view_licensed_products_form.<%=IBeanConstants.PARAM_LICENSE_ID%>.value=licenseKey;
      document.view_licensed_products_form.submit();
  }
  
  
</SCRIPT>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
    <TD><h1>License details</h1></TD>
  </TR>
  <TR><TD height="5"></TD></TR>
  <TR><TD><A href="<%=sBack%>">[Back]</A>&nbsp;&nbsp;&nbsp;&nbsp;<A href="javascript:refreshPage()">[Refresh page]</A></TD></TR>
  <TR><TD height="20"></TD></TR>
</TABLE>
<TABLE cellspacing="0" cellpadding="2" border="0" class="content">
  <TR>
    <TD class="label">Tool:</TD>
    <TD> <%=sToolName%>
    <%if (licenseView.isMoreLicensedProducts()) {%>&nbsp;<A href="javascript:viewLicensedProducts('<%=sLicenseKey%>')">[full list]</A>&nbsp;<%}%>
    <%if (sLicenseFlags != null) {%> (<%=sLicenseFlags%>)<%}%>
    </TD>
  </TR>
  <TR>
    <TD class="label">Machine ID:</TD>
    <TD> <%=sMachineId%> <%if (!isLicenseValid) {%><span class="level_alert">(Invalid License: The machine ID in the license does not match the machine ID of this License Server)</span><%} %></TD>
  </TR>
  <TR>
    <TD class="label">Expiration date:</TD>
    <TD> <%=sExpDate%></TD>
  </TR>
  <TR>
    <TD class="label">Tokens (used/available/all):</TD>
    <TD><%=takenLicenses%>/<%
        if (availableLicenses > 0) {
    %><%=availableLicenses - takenLicenses%>/<%=availableLicenses%><%
        } else {
    %>Unlimited/Unlimited<%
        }
    %>
       <%
        if (bUpgrade) {
       %><SPAN class="text_gold">*</SPAN><%
        }
       %> 
    </TD>
  </TR>
</TABLE>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD class="label" colspan="2">License features:</TD></TR>  
  <TR><TD colspan="2">
    <UL class="list">
  <%
    for (int i = 0; i < asLicenseFeatures.length; i++) {
  %>
  <%
    if (abLicenseFeaturesComaptible[i]) {
  %>
  <BR><%=asLicenseFeatures[i]%> (compatible)  
  <%
    } else {
  %>
  <LI><%=asLicenseFeatures[i]%>
  <%
    }
  %>
  <%
    }
  %>
    </UL>
  </TD></TR>
  </TABLE>


<%
    if (licenseView.isUpgradeLicense()) {
    String sLinkToHref = "link_upgrade_license.jsp?"+LicenseBean.PARAM_LICENSE_ID+"="+sLicenseKey+"&"+IWebConstants.CALLER_PARAMETER_NAME+"="+java.net.URLEncoder.encode(sCaller);
%>
  <TABLE cellspacing="0" cellpadding="0" border="0" class="content">
    <%
        if (licenseView.isLicenseLinked()) {
                String sMainLicenseKey = licenseView.getMainLicenseKey();
    %>
  <TR><TD>
    License is linked to <A href="javascript:viewLicense('<%=sMainLicenseKey%>')"><%=licenseView.getLicenseName(sMainLicenseKey)%></A> license. <A href="<%=sLinkToHref%>">[Link to]</A>
 </TD></TR>
  <TR><TD class="text_gold">* Reservation and complete usage is available at main <A href="javascript:viewLicense('<%=sMainLicenseKey%>')">license details</A> page.</TD></TR>
    <%
        } else {
    %>
  <TR><TD class="text_red">
    License is not linked. <A href="<%=sLinkToHref%>">[Link to]</A>
  </TD></TR>
    <%
        }
    %>
 </TABLE>
<%
    } else {
    
        String [] aLinkedLicenseKeys = licenseView.getLinkedLicenseKeys();
        if (aLinkedLicenseKeys != null && aLinkedLicenseKeys.length > 0) {
%>

  	<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
	<tr><td><B>Linked licenses:</B></td></tr>
       <%
            for (String sLinkedLicenseKey : aLinkedLicenseKeys) {
       %>
       	<tr><td>
          -&nbsp;<A href="javascript:viewLicense('<%=sLinkedLicenseKey%>')"><%=licenseView.getLicenseName(sLinkedLicenseKey)%></A> license<BR>
	</td></tr>
       <%
            }
	%></TABLE><%
        }
    }
       %>

  
  <%
    String [] aTokenKeys = licenseView.getTokens();
    String [] aGroupPatterns = licenseView.getGroupsPatterns();
      
    if (aTokenKeys.length > 0 || aGroupPatterns.length > 0) {
  %>
  <TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD height="30" colspan="3"></TD></TR>
  <TR><TD colspan="3" class="label">License usage:</TD></TR>
  <%
        for (int i = 0; i < aTokenKeys.length; i++) { 
            String sTokenKey = aTokenKeys[i];
            String sTokenLicenseKey = licenseView.getLicenseKey(sTokenKey);
            
            boolean bNeedShowLicense = !sLicenseKey.equals(sTokenLicenseKey);
            
            int tokenDataAmount = licenseView.getTokenDataAmount(sTokenKey);
            boolean bShowTokenDatas = licenseView.needShowTokenDatas(); 
         
            for (int itok = 0; itok < tokenDataAmount; itok++) {
                
                String sTokenValidClass = ""; // default
                if (!licenseView.isTokenDataValid(sTokenKey, itok)) {
                    sTokenValidClass = "class=\"token_no_match\"";
                }
            %>
            <TR>
              <TD width="15">&nbsp;</TD>
              <TD colspan="2" <%=sTokenValidClass%>>&nbsp;&nbsp;&nbsp;-&nbsp;<%if(bShowTokenDatas){%><B><%=licenseView.getTokenDataToolShortName(sTokenKey, itok)%></B>&nbsp;<%}%>used by <B><%=licenseView.getUserName(sTokenKey)%></B> on host <B><%=licenseView.getHostName(sTokenKey)%></B> <%=licenseView.getHostAddress(sTokenKey)%> (<%=licenseView.getArchitecture(sTokenKey)%>)  
            <%
                if (bNeedShowLicense) {
                   %> by <A href="javascript:viewLicense('<%=sTokenLicenseKey%>')"><%=licenseView.getLicenseName(sTokenLicenseKey)%></A> license<%
                }
                   %> - expires in <%=licenseView.getTokenDataExpirationTime(sTokenKey, itok)%> <A href="javascript:viewToken('<%=sTokenLicenseKey%>','<%=licenseView.getTokenDataKey(sTokenKey, itok)%>')">[View]</A>
              </TD>
            </TR><%
            }
        } 
         
        for (int g = 0; g < aGroupPatterns.length; g++) { 
            String sGroupPattern = aGroupPatterns[g];

            ReservationDescription rd = licenseView.getReservationDescription(sGroupPattern);
             
            boolean bGroupReservation = rd.isGroupPattern();
            String sPatternGroupName = rd.getPatternGroupName();
            String sHostNamePattern = rd.getHostNamePattern();
            String sMachineIDPattern = rd.getMachineIDPattern();
            String sUserNamePattern = rd.getUserNamePattern();
            int iReservationAmount = rd.getAmount();
             
            String[] aGroupTokenKeys = licenseView.getTokensForGroupPattern(sGroupPattern);
  %>
    <TR>
      <TD width="15">&nbsp;</TD>
      <TD colspan="2">- <%=iReservationAmount%> reserved for <%
            if (bGroupReservation) {
      %> 
      group <B><%=HTMLConvert.toHTML(sPatternGroupName, false)%></B><%
            }  else {
      %>
      <B><%=HTMLConvert.toHTML(sUserNamePattern, false)%></B> 
	      <%if (bMachineLockedLicense) {%>
	      	<%if (sMachineIDPattern != null) {%>
	      		on Machine ID: <B><%=sMachineIDPattern%></B>
	      	<%} else {%>
	      		on host <B><%=sHostNamePattern%></B>
	      	<%}%>
	      <%} else {%>
	      	on host <B><%=sHostNamePattern%></B>
	      <%}%>
      	<%
            }
      %>
      
    </TR>
  <%
            for (int i = 0; i < aGroupTokenKeys.length; i++) { 
                String sTokenKey = aGroupTokenKeys[i];
                String sTokenLicenseKey = licenseView.getLicenseKey(sTokenKey);
                boolean bNeedShowLicense = !sLicenseKey.equals(sTokenLicenseKey);
            
                int tokenDataAmount = licenseView.getTokenDataAmount(sTokenKey);
                boolean bShowTokenDatas = licenseView.needShowTokenDatas(); 
             
                for (int itok = 0; itok < tokenDataAmount; itok++) {

                    String sTokenValidClass = ""; // default
                    if (!licenseView.isTokenValid(sTokenKey, itok)) {
                        sTokenValidClass = "class=\"token_no_match\"";
                    }

          %>
            <TR>
              <TD width="15">&nbsp;</TD>
              <TD colspan="2" <%=sTokenValidClass%>>&nbsp;&nbsp;&nbsp;-&nbsp;<%if(bShowTokenDatas){%><B><%=licenseView.getTokenDataToolShortName(sTokenKey, itok)%></B>&nbsp;<%}%>used by <B><%=licenseView.getUserName(sTokenKey, itok)%></B> on host <B><%=licenseView.getHostName(sTokenKey, itok)%></B> <%=licenseView.getHostAddress(sTokenKey, itok)%> (<%=licenseView.getArchitecture(sTokenKey, itok)%>)  
          <%
                    if (bNeedShowLicense) {
               %> by <A href="javascript:viewLicense('<%=sTokenLicenseKey%>')"><%=licenseView.getLicenseName(sTokenLicenseKey)%></A> license<%
                    }
               %> - expires in <%=licenseView.getTokenDataExpirationTime(sTokenKey, itok)%> <A href="javascript:viewToken('<%=sTokenLicenseKey%>','<%=licenseView.getTokenDataKey(sTokenKey, itok)%>')">[View]</A>
              </TD>
            </TR><%
                }
            }
        }
    
%>
    <TR><TD height="15" colspan="3"></TD></TR>
    <TR><TD colspan="3"><A href="javascript:refreshLicenseUsage()">[Refresh License Usage]</A></TD></TR>
  </TABLE>
<%  } %>

<!-- filters part  -->

<FORM name="addFilterForm" action="license.jsp" method="POST" class="content">
    <INPUT type="hidden" name="<%=LicenseFiltersBean.PARAM_ACTION%>" value="">
    <INPUT type="hidden" name="<%=LicenseFiltersBean.PARAM_LICENSE_ID%>" value="<%=sLicenseKey%>">
 
    <B> Filter requests for:</B>
    <div>
      User name: <INPUT type="TEXT" name="<%=LicenseFiltersBean.PARAM_NEW_FILTER_USER_PATTERN%>" value="" maxlength="200" size="10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Host name: <INPUT type="TEXT" name="<%=LicenseFiltersBean.PARAM_NEW_FILTER_HOST_PATTERN%>" value="" maxlength="200" size="15">&nbsp;<A name= "add_filter" href="javascript:addFilter();">[Deny]</A>&nbsp;<A href="javascript:addAllowFilter();">[Allow]</A><BR>

  <% if (filters.isError(LicenseFiltersBean.ACTION_ADD_FILTER)) {
            String[] asErrors = filters.getErrorMessages(LicenseFiltersBean.ACTION_ADD_FILTER);
            for (int i = 0; i < asErrors.length; i++) {
  %> 
  <SPAN class="warning_10"><%=asErrors[i]%></SPAN><br>       
  <%        } // endfor
     } // endif %>
      OR<BR>
    <%
      if ((asNewGroupNames != null) && (asNewGroupNames.length > 0)) {
    %>
      Group:
      <SELECT name="<%=LicenseFiltersBean.PARAM_NEW_FILTER_GROUP_PATTERN%>">
        <%for (int i = 0; i < asNewGroupNames.length; i++) {%>
        <OPTION value="<%=HTMLConvert.toHTML(asNewGroupNames[i], false)%>">
           <%=HTMLConvert.toHTML(asNewGroupNames[i], false)%>(p:<%=aNewGroupSizes[i]%>, g:<%=aNewGroupSizesGroups[i]%>)
        </OPTION>
        <%}%>
      </SELECT>&nbsp;<A href="javascript:addGroupFilter();">[Deny]</A>&nbsp;<A href="javascript:addAllowGroupFilter();">[Allow]</A>
    <%} else { %>
      No pattern groups defined. 
    <%} %>
      &nbsp;&nbsp;&nbsp;<A href="groups.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=java.net.URLEncoder.encode(sCaller)%>">[Edit Groups]</A>
    </div>
</FORM>
    
<%  if (!filters.isEmpty()) {
%>
  <BR> 
  <%if (licenseView.areFiltersBypassedByReservations()) { %>
  <font color="goldenrod">Note: Filters are ignored if there exists a reservation for particular user.</font><BR>
  <%}%>
  <TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR><TD><B>Filtered requests for:</B></TD><TD><A name="filters_list" href="javascript:removeAllFilters();">[Remove All]</A></TD></TR>
        <%
            String [] aFilterPatterns = filters.getFilterPatterns();
                        
            for (String sFilterPattern : aFilterPatterns) {
                boolean isAllowed = filters.isAllowed(sFilterPattern);
                boolean isGroup = filters.isGroupPattern(sFilterPattern);
                String sPatternGroupName = filters.getPatternGroupName(sFilterPattern); 
                String sFilterUserName = filters.getUserNamePattern(sFilterPattern);
                String sFilterHostName = filters.getHostNamePattern(sFilterPattern);
                
                String sTypeLabel = "Deny";
                if (isAllowed) {
                    sTypeLabel = "Allow";
                }
                
                if (isGroup) {
                        
            %>  
            <TR><TD>- <%=sTypeLabel%>&nbsp;group&nbsp;<B><%=HTMLConvert.toHTML(sPatternGroupName, false)%></B> (p:<%=groups.getGroupSizes(sPatternGroupName)%>, g:<%=groups.getGroupSizesGroups(sPatternGroupName)%>)&nbsp;</TD>
            <TD>
            <A href="javascript:removeFilter('<%=HTMLConvert.toHTML(RegexUtil.slashslash(sFilterPattern), false)%>', 'group <%=HTMLConvert.toHTML(RegexUtil.slashslash(sPatternGroupName), false)%>');">[Remove]</A>
            </TD></TR>
            <%
                } else {
            %>  
            <TR><TD>- <%=sTypeLabel%>&nbsp;<B><%=HTMLConvert.toHTML(sFilterUserName, false)%></B> on host <B><%=HTMLConvert.toHTML(sFilterHostName, false)%></B>&nbsp;</TD>
            <TD>
            <A href="javascript:removeFilter('<%=HTMLConvert.toHTML(RegexUtil.slashslash(sFilterPattern), false)%>', '<%=HTMLConvert.toHTML(RegexUtil.slashslash(sFilterUserName), false)%> on host <%=HTMLConvert.toHTML(RegexUtil.slashslash(sFilterHostName), false)%>');">[Remove]</A>
            </TD>  
            </TR>
            <%
                }
            }
            %>        
  </TABLE>
    <%
        }
    %>


<!-- reservations part -->
<BR>
<BR>
  
<FORM name="lockForm" action="license.jsp" method="POST">

<%
    if ((!licenseView.isUpgradeLicense()) && (availableLicenses > 0)) { // reserved licenses available only for limited and not upgrade licenses
%>

<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
  <TR>
      <TD colspan="2">
<%      if (licenseView.isReservationModificationLimited()) { 
            if (licenseView.canModifyReservations()) { %>
<font color="goldenrod">Note: Reservations can be modified up to <%=licenseView.getCanModifyReservationsEndDate()%>.</font>
<%          } else { %>
<font color="goldenrod">Note: Reservations will be available for modifications from <%=licenseView.getCanModifyReservationsBeginDate()%> to <%=licenseView.getCanModifyReservationsEndDate()%>.</font><BR><BR>
<%          }
        } %>
      </TD>
  </TR>
  <TR><TD class="label" colspan="2">Reserve licenses:</TD></TR> 
<%
        if (licenseView.canModifyReservations() && (availableLicenses > reservedCount)) { // hide add reserved section when all reservations made, or license should not be modified
 %>
  <TR>
      <%
            if (bUserLockedLicense) { // hide host and count fields for user locked or package licenses
      %>
        <TD>User name:</TD><TD> <INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_USER%>" 
        value="<%=HTMLConvert.toHTML(sNewUser, false)%>" maxlength="200" size="10">
        <INPUT type="HIDDEN" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_HOST%>" value=".*">
        <INPUT type="HIDDEN" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_LIC_COUNT%>" value="1">
      <%
            } else if (bMachineLockedLicense) { // hide user and count fields for machine locked licenses
      %>
        <TD>
            <TABLE>
                <TR>
                    <INPUT type="HIDDEN" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_USER%>" value=".*">
                    <TD>Machine ID:</TD><TD> <INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_MACHINEID%>" 
                        value="<%=HTMLConvert.toHTML(sNewMachineID, false)%>" maxlength="200" size="15">
                        <INPUT type="HIDDEN" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_LIC_COUNT%>" value="<%=availableLicenses%>">
                    </TD>
                </TR>
                <TR>
                    <TD>Confirm Machine ID:</TD><TD> <INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_MACHINEID_CONFIRM%>" 
                        value="<%=HTMLConvert.toHTML(sNewMachineIDConfirm, false)%>" maxlength="200" size="15">
                        <INPUT type="HIDDEN" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_LIC_COUNT%>" value="<%=availableLicenses%>">
                    </TD>
                </TR>
            </TABLE>
        </TD>
        <TD>
      <%
            } else {
      %>
        <TD>User name:</TD><TD> <INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_USER%>" 
        value="<%=HTMLConvert.toHTML(sNewUser, false)%>" maxlength="200" size="10">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Host name:<INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_HOST%>" 
        value="<%=HTMLConvert.toHTML(sNewHost, false)%>" maxlength="200" size="15">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        Licenses count: <INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_LOCK_LIC_COUNT%>" 
        value="<%=newCount%>" maxlength="3" size="4">
      <%
            }
      %>
        &nbsp;<A name="add_lock" href="javascript:addReserved()">[Apply]</A> 
        <%if (bMachineLockedLicense) { %>
        	<i style="padding-left: 30px">[Note: Once applied, the reservations cannot be changed for <%= ReservationDateUtil._RANGE_IN_DAYS %> days]</i>
        <%} %>
  </TD></TR>
  <%
            if (userLockedLicense.isError(UserLockedLicenseBean.ACTION_ADD_LOCK)) {
      %>
      <%
            String[] asErrors = userLockedLicense.getErrorMessages(UserLockedLicenseBean.ACTION_ADD_LOCK);
            for (int i = 0; i < asErrors.length; i++) {
      %> 
  <TR><TD class="warning_10" colspan="2"><%=asErrors[i]%></TD></TR>       
      <%
            } // endfor
      %>
  <%
        } // endif
  %>

  <%
        if (!bUserLockedLicense && !bMachineLockedLicense) {
  %>
  <TR><TD height="5" colspan="2">OR</TD></TR>
  <TR>
    <%
            if ((asNewGroupNames != null) && (asNewGroupNames.length > 0)) {
    %>
    <TD>Group:</TD>
    <TD>
      <SELECT name="<%=PatternGroupsBean.PARAM_PATTERN_GROUP_NAME%>">
    <%
                for (int i = 0; i < asNewGroupNames.length; i++) {
    %>
        <OPTION value="<%=HTMLConvert.toHTML(asNewGroupNames[i], false)%>">
           <%=HTMLConvert.toHTML(asNewGroupNames[i], false)%>(p:<%=aNewGroupSizes[i]%>, g:<%=aNewGroupSizesGroups[i]%>)
        </OPTION>
    <%
                }
    %>
      </SELECT>
        &nbsp;&nbsp;&nbsp;Licenses count: <INPUT type="TEXT" name="<%=UserLockedLicenseBean.PARAM_NEW_GROUP_LIC_COUNT%>" 
        value="<%=newGroupCount%>" maxlength="3" size="4">
        &nbsp;<A name="add_lock" href="javascript:addGroupReserved()">[Apply]</A>&nbsp;&nbsp;&nbsp;<A href="groups.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=java.net.URLEncoder.encode(sCaller)%>">[Edit Groups]</A>
    </TD>
    <%
            } else {
    %>
    <TD colspan="2">
        No pattern groups defined.&nbsp;&nbsp;&nbsp;<A href="groups.jsp?<%=IWebConstants.CALLER_PARAMETER_NAME%>=<%=java.net.URLEncoder.encode(sCaller)%>">[Edit Groups]</A>
    </TD>
    <%
            }
    %>
  </TR>
  <%
            if (userLockedLicense.isError(UserLockedLicenseBean.ACTION_ADD_GROUP_LOCK)) {
                String[] asErrors = userLockedLicense.getErrorMessages(UserLockedLicenseBean.ACTION_ADD_GROUP_LOCK);
                for (int i = 0; i < asErrors.length; i++) {
  %> 
  <TR><TD class="warning_10" colspan="2"><%=asErrors[i]%></TD></TR>       
  <%
                } // endfor
            } // endif
        }
    }
  %>
</TABLE>        

<BR>
<TABLE cellspacing="0" cellpadding="0" border="0" class="content">
<%
    if ((asLockedUserNames != null) && (asLockedUserNames.length > 0)) {
%> 
  <% if (licenseView.areReservationsAutomaticallyReset()) {%>
  <TR><TD collspan="2"><font color="goldenrod">Note: All Reservations will be automatically removed on <%=licenseView.getReservationsAutomaticallyResetDate()%>.</font></TD></TR>
  <% } %>
  <TR>
    <TD class="label"><%=reservedCount%> license<%
        if (asLockedUserNames.length > 1) {
    %>s<%
        }
    %> reserved 
     <%
        if (availableLicenses > 0) {
    %>out of <%=availableLicenses%><%
        }
    %></TD>
    <TD>
     <% if (licenseView.canModifyReservations()) { %>
            <% if (showRemoveAllReservations) { %>
                <A name="locks_list" href="javascript:removeAll()">[Remove All]</A>:
            <% } %>
     <% } %>  
    </TD>
  </TR>     
<%
        for (int i = 0; i < asLockedUserNames.length; i++) {
     %>
        <%
            if (abGroupStatuses[i]) {
        %>
  <TR>
    <TD> - Group <B><%=HTMLConvert.toHTML(asUsersGroupNames[i], false)%></B> (p:<%=aGroupCounts[i]%>, g:<%=aGroupCountsGroups[i]%>) - <%=aCounts[i]%>&nbsp;license<%
        if (aCounts[i] > 1) {
    %>s<%
        }
    %></TD>
    <TD>
     <% if (licenseView.canModifyReservations()) { %>
        <A href="javascript:removeReserved('<%=HTMLConvert.toHTML(RegexUtil.slashslash(asLockIdfs[i]), false)%>')">[Remove]</A>
     <% } %>
    </TD>
  </TR>
        <%
            } else {
        %>
  <TR>
    <TD> - <B><%=HTMLConvert.toHTML(asLockedUserNames[i], false)%></B>
    	<%if (bMachineLockedLicense) {%>
    		<%if (asLockedMachineIDNames[i] != null) {%>
    			on Machine ID: <B><%=HTMLConvert.toHTML(asLockedMachineIDNames[i], false)%></B>
    		<%} else {%>
    			on host <B><%=HTMLConvert.toHTML(asLockedHostNames[i], false)%></B>
    		<%}%>
    	<%} else {%>
        	on host <B><%=HTMLConvert.toHTML(asLockedHostNames[i], false)%></B>
        <%}%>
        &nbsp; - <%=aCounts[i]%>&nbsp;license<%
        if (aCounts[i] > 1) {
    %>s<%
        }
    %></TD>
    <TD>
     <% if (licenseView.canModifyReservations()) { %>
            <% if (aReservationRemovability[i]) { %>
                <A href="javascript:removeReserved('<%=HTMLConvert.toHTML(RegexUtil.slashslash(asLockIdfs[i]), false)%>')">[Remove]</A>
            <% } else { %>
            	<%
            		Date reservationUntilDate = ReservationDateUtil.getReservationUntilDate(aReservationDates[i]);
            		String reservationUntil = DateUtil.formatDate(reservationUntilDate); 
            	%>
            	<div><i style="padding-left: 30px">[Note: This license was reserved on <%= DateUtil.formatDate(aReservationDates[i]) %> and cannot be released until <%= reservationUntil %> (i.e. +<%= ReservationDateUtil._RANGE_IN_DAYS %> days)]</i></div>
            <% } %>
     <% } %>
    </TD>
  </TR>
        <%
            }
        %>
<%
    }
%>
  <%
    if (userLockedLicense.isError(UserLockedLicenseBean.ACTION_REMOVE_SINGLE_LOCK)) {
  %>
    <%
        String[] asErrors = userLockedLicense.getErrorMessages(UserLockedLicenseBean.ACTION_REMOVE_SINGLE_LOCK);
                     for (int i = 0; i < asErrors.length; i++) {
    %> 
  <TR><TD class="warning_10" colspan="2"><%=asErrors[i]%></TD></TR>       
    <%
            }
           %>
  <%
    }
  %>
<%
    } else {
%><TR><TD class="label">No licenses reservations.</TD></TR><%
    }
%>
</TABLE>
<%
    } // endif
%>     
<INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_ACTION%>" value="">
<INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_LOCK_IDF%>" value="">
<INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_LICENSE_ID%>" value="<%=sLicenseKey%>">
</FORM>
<FORM action="license.jsp" method="post" name="view_license_form">
  <INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_LICENSE_ID%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>
<FORM action="licensed_products.jsp" method="post" name="view_licensed_products_form">
  <INPUT type="hidden" name="<%=IBeanConstants.PARAM_LICENSE_ID%>" value="">
  <INPUT type="hidden" name="<%=IWebConstants.CALLER_PARAMETER_NAME%>" value="<%=sCaller%>">
</FORM>
<FORM action="token.jsp" method="post" name="view_token_form">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_LICENSE_KEY%>" value="">
  <INPUT type="hidden" name="<%=TokenBean.PARAMETER_TOKEN_KEY%>" value="">
</FORM>
<FORM action="license.jsp" method="post" name="refresh_page_form">
  <INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_LICENSE_ID%>" value="<%=sLicenseKey%>">
</FORM>
<FORM name="licenseForm" action="license.jsp" method="post">
  <INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_ACTION%>" value="<%=UserLockedLicenseBean.ACTION_REMOVE_LOCKS%>">
  <INPUT type="hidden" name="<%=UserLockedLicenseBean.PARAM_LICENSE_ID%>" value="<%=sLicenseKey%>">
</FORM>
<FORM name="removeFilterForm" action="license.jsp" method="post">
  <INPUT type="hidden" name="<%=LicenseFiltersBean.PARAM_ACTION%>" value="<%=LicenseFiltersBean.ACTION_REMOVE_FILTER%>">
  <INPUT type="hidden" name="<%=LicenseFiltersBean.PARAM_LICENSE_ID%>" value="<%=sLicenseKey%>">
  <INPUT type="hidden" name="<%=LicenseFiltersBean.PARAM_FILTER_PATTERN_KEY%>" value="">
</FORM>

<jsp:include page="footer.jsp" flush="true"/>
