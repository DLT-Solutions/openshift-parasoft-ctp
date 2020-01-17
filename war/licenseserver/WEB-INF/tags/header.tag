<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@tag import="com.parasoft.pst.core.util.WebResourceUtil"%>
<%@tag import="com.parasoft.pst.common.resources.ResourceBundles" %>
<%@ attribute name="menuProvider" type="com.parasoft.pst.core.menu.IMenuProvider" required="true"%>
<!DOCTYPE html>

<c:set var="sUserLogin" value="${pageContext.request.remoteUser}" />

<html>

    <c:url value="/" var="contextPath"></c:url>

    <%

    String jsResourcePath = WebResourceUtil.getJsResourcePath(request.getContextPath());
    String cssResourcePath = WebResourceUtil.getCssResourcePath(request.getContextPath());
    String manualPath = ResourceBundles.LOCATION.getString("user_guide_url");

    ServletContext sc = session.getServletContext();
    String menu = menuProvider.getMenu();
    String appsMenu = menuProvider.getAppsMenu(sc);
    String headMenu = menuProvider.getHeadMenu(sc);
    String pstUrl = menuProvider.getPstUrl(sc);
    %>


    <head>
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common/reset.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common/layout.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common/typography.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common/coloring.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common/common.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common/menu.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/common.css" />
	    <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/buttons.css" />
        <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/kendo/kendo.common.min.css"/>
		<link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/kendo/kendo.silver.min.css"></link>
        <link rel="stylesheet" type="text/css" href="<%=cssResourcePath%>/jquery-ui-1.12.1.min.css"/>
        <link rel="stylesheet" type="text/css" href="/grs/resources/css/lessGenerated/filterForm.css"/>
    	<link rel="shortcut icon" href="<%=cssResourcePath%>/images/common/favicon.ico" type="image/x-icon" />

        <script type="text/javascript" src="<%=jsResourcePath%>/jquery-3.4.1.min.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/Hashtable.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/jquery-ui-1.12.1.min.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/cookie.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/default-app-holder.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/jquery.timers.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/Tip.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/Util.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/Menu.js"></script>
	    <script type="text/javascript" src="<%=jsResourcePath%>/StatusInfo.js"></script>
		<script type="text/javascript" src="<%=jsResourcePath%>/kendo/kendo.all.min.js"></script>
		<script type="text/javascript" src="<%=jsResourcePath%>/Parasoft.Kendo.js"></script>
		<script type="text/javascript" src="<%=jsResourcePath%>/jquery.tablesorter.min.js"></script>
    	<script type="text/javascript" src="<%=jsResourcePath%>/help_functions.js"></script>


		<title><spring:message code="APP_TITLE"/></title>
    </head>
    <body>
        <div id="page">
		    <div id="header">
		        <div id="applications">
		            <a href="<%=pstUrl%>"></a>
		            <div id="appsMenu">
		            <%=appsMenu%>
		            <script type="text/javascript">
		                Planning.Util.initializeDropDown("#appsMenu .arrow", "#appsMenu ul", false);
		            </script>
		        </div>
		            <div class="clear"></div>
		        </div>
		        <div id="headerContent">
		            <ui:insert name="headerContent"></ui:insert>
		            <ul class="links">
		            <li class="seperator-right">
		                <a id="help" target="_blank" href="<%= manualPath %>">Help</a>
		            </li>
		            <li>
		                <div id="userMenu" class="dropDownMenu">
		                    <a href="#" class="arrow"><c:out value="${sUserLogin}"/><span></span></a>
		                    <div class="dropDown" style="display: none;">
		                        <ul>
		                            <li><a id="logout" href="/pstsec/pstSecLogout.jsp"><spring:message code="LOGOUT"/></a></li>
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
		    <div id="menu">
		        <div class="menu">
		            <%=menu%>
		            <div class="clear"></div>
		            <script type="text/javascript">
		            new Parasoft.Menu({useEffect: false, showEvent: "click", mode: Parasoft.Menu.Mode.Tabbed}).create();
		            </script>
		        </div>
		    </div>
