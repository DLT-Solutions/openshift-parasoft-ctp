<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page import="com.parasoft.pst.core.IConcertoVersion"%>
<%@ page import="com.parasoft.pst.core.web.beans.LocalizedResourcesBean" %>
<%@ page import="com.parasoft.pst.common.resources.ResourceBundles" %>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="navigation" class="com.parasoft.ls.webapps.beans.NavigationBean"/>
<c:set var="sUserLogin" value="${pageContext.request.userPrincipal.name}"  />
<%
	String sCSSContextPath = navigation.getCssContextPath();
	String sJSContextPath = navigation.getJSContextPath();
	String resDir = IConcertoVersion.RESOURCE_DIR;
	String sContextPath = request.getContextPath();
	String jsMenu = navigation.getMenuForStandalone();   
%><HTML>
    <HEAD>
        <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=iso-8859-1">
        <META HTTP-EQUIV="Expires" CONTENT="0">
	<META HTTP-EQUIV="Cache-Control" CONTENT="no-store, no-cache, must-revalidate">
	<META HTTP-EQUIV="Cache-Control" CONTENT="post-check=0, pre-check=0">
	<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
        <LINK HREF="ls.css" TYPE="text/css" REL="stylesheet">
        <LINK HREF="<%=sCSSContextPath%>/common/menu.css" TYPE="text/css" REL="stylesheet">
        <LINK HREF="<%=sCSSContextPath%>/common/layout.css" TYPE="text/css" REL="stylesheet">
        <LINK HREF="<%=sCSSContextPath%>/common/typography.css" TYPE="text/css" REL="stylesheet">
        <LINK HREF="<%=sCSSContextPath%>/common/coloring.css" TYPE="text/css" REL="stylesheet">
        <LINK HREF="<%=sCSSContextPath%>/common/common.css" TYPE="text/css" REL="stylesheet">
        <LINK HREF="<%=sCSSContextPath%>/table.css" TYPE="text/css" REL="stylesheet">
        <LINK REL="Shortcut icon" HREF="<%=sContextPath%>/images/favicon.ico">		
	<script type="text/javascript" src="<%=sJSContextPath%>/jquery-3.4.1.min.js"></script>	
	<script type="text/javascript" src="<%=sJSContextPath%>/cookie.js"></script>
   	<script type="text/javascript" src="<%=sJSContextPath%>/default-app-holder.js"></script> 	
   	<script type="text/javascript" src="<%=sJSContextPath%>/help_functions.js"></script> 	
        <script type="text/javascript" src="<%=sJSContextPath%>/Util.js"></script>
        <script type="text/javascript" src="<%=sJSContextPath%>/Menu.js"></script>
<%
    String sTitle = request.getParameter("title");
    if (sTitle == null) {
        sTitle = (String) request.getAttribute("title");
    }
    if (sTitle == null) {
        sTitle = "License Server";
    }
    
    if (sTitle != null) {
        %><TITLE><%=sTitle%></TITLE><%
    }
%>

</HEAD>

<BODY BGCOLOR="#FFFFFF" TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0">

<A NAME="topPageAnchor"></A>

<TABLE BORDER="0" CELLPADDING="10" CELLSPACING="0" WIDTH="100%"><TR><TD>

<TABLE BORDER="0" CELLPADDING="0" CELLSPACING="0" WIDTH="100%">
<tr>
	<td colspan="2">
	<div id="header">
        <div id="applications">
            <a style="cursor:default" href="javascript:void();"></a>
            <div id="appsMenu"><a href="/licenseserver/jsp/home.jsp">License Server</a> 
            </div>
            <div class="clear"></div>
        </div>
        <div id="headerContent">
		    <ul class="links">
		     	<li class="seperator-right">
	                <a target="_blank" href="<%= ResourceBundles.LOCATION.getString("lss_user_guide_url") %>" id="help"><%="help"%></a>
	            </li>
	            <li>
	                <div id="userMenu" class="dropDownMenu" style="display:block;">
	                    <a href="#" class="arrow"><c:out value="${sUserLogin}"/><span></span></a>
	                    <div class="dropDown" style="display: none;">
	                        <ul>
	                            <li><a id="logout" href="<%= sContextPath %>/pstSecLogout.jsp">Logout</a></li>
	                        </ul>
	                    </div>
	                    <script type="text/javascript">
	                        Planning.Util.initializeDropDownWithEvents("#userMenu > a", "#userMenu > div", true, "body", 
	                            {
	                                onshow: function() {
	                                    jQuery("#userMenu").addClass("white");
	                                    
	                                    jQuery("#userMenu > a").removeClass("arrow");
	                                    jQuery("#userMenu > a").addClass("active");
	                                },
	                                onhide: function() {
	                                    jQuery("#userMenu > a").removeClass("active");
	                                    jQuery("#userMenu > a").addClass("arrow");
	                                    
	                                    jQuery("#userMenu").removeClass("white");
	                                }
	                            }
	                        );
	                    </script>
	                </div>             
	            </li>
	        </ul>
        </div>
        <div class="clear"></div>
    </div>


<div id="menu" style="padding-left: 5px;">
    <%=jsMenu%>
</div>

<script type="text/javascript">
//<![CDATA[

  jQuery(document).ready(initializeMenu);   

  function initializeMenu()
  {
      var menu = new Parasoft.Menu({useEffect: false});
      menu.create();
  }
  
//]]>
</script>
</td>
</tr>
<TR><TD>

 <!-- end of header -->
    
