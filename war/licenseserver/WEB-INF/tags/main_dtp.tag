<jsp:root 
    xmlns:jsp="http://java.sun.com/JSP/Page" 
    xmlns:tags="urn:jsptagdir:/WEB-INF/tags" 
    xmlns:c="http://java.sun.com/jsp/jstl/core" 
    xmlns:spring="http://www.springframework.org/tags" 
    xmlns:fn="http://java.sun.com/jsp/jstl/functions"
    version="2.0">
    
    <jsp:directive.attribute name="render" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Indicate if the contents of this tag and all enclosed tags should be rendered (default 'true')" />
    <jsp:directive.attribute name="menuProvider" type="com.parasoft.pst.core.menu.IMenuProvider" required="true"/>
    
    <!-- fragments -->
    <jsp:directive.attribute name="commands" fragment="true" />
    <jsp:directive.attribute name="title" fragment="true" />            
    
    <tags:header_dtp menuProvider="${menuProvider}"/>

    <spring:message code="OK" var="OK"/>
    <spring:message code="CLICK_TO_HIDE" var="CLICK_TO_HIDE"/>    
    
    <c:set var="message" />
    <c:set var="detailMessage" />
    <c:set var="statusCssClass" />
    <c:set var="icon" />
    <c:set var="cssClass" />    
    <c:choose>
       <c:when test="${!empty INFO_MESSAGE}">
            <c:set value="${INFO_MESSAGE.message}" var="message" />
            <c:set value="${INFO_MESSAGE.detailMessage}" var="detailMessage" />
            <c:set value="/grs/images/planning/status/info.gif" var="icon" />
            <c:set value="message-info-label" var="cssClass" />        
       </c:when>
       <c:when test="${!empty param.INFO_MESSAGE_R}">
            <c:set value="${fn:escapeXml(param.INFO_MESSAGE_R)}" var="message" />
            <c:set value="/grs/images/planning/status/info.gif" var="icon" />
            <c:set value="message-info-label" var="cssClass" />        
       </c:when>
       <c:when test="${!empty ERROR_MESSAGE}">
            <c:set value="${ERROR_MESSAGE.message}" var="message" />
            <c:set value="${ERROR_MESSAGE.detailMessage}" var="detailMessage" />
            <c:set value="/grs/images/planning/status/error.gif" var="icon" />
            <c:set value="message-error-label" var="cssClass" />           
       </c:when>
    </c:choose>
    
    <c:if test="${!empty detailMessage}">
        <c:set var="statusCssClass" value="statusDetails"/>
    </c:if>

	<div id="status" class="${statusCssClass}">	    
        <span id="message" class="message rich-message ${cssClass}">
            <c:if test="${!empty message}">
	            <span class="rich-message-marker">
	                <img src="${icon}"/>
	            </span>            
            </c:if>
            <span class="rich-message-label">
	            ${message}
	            <c:if test="${!empty detailMessage}">
		            <div id="messageDatails">	                
	                    ${detailMessage}
		            </div>
		            <a href="javascript:hideDetailMessage()" title="${CLICK_TO_HIDE}">${OK}</a>
                </c:if>
            </span>
            
        </span>
	</div>
	
    <div id="commands">
        <jsp:invoke fragment="commands"/>
    </div>
    
    <div id="content">
	    <div id="pageTitle">
	        <div style="font-size: 17px; margin-left: 10px; font-weight: bold; color: #3d5068;"><jsp:invoke fragment="title"/></div>	        
	    </div>
	    <div class="contentWrapper scrollableArea">
	        <jsp:doBody />
	    </div>
    </div>           
        
    <script>

        var statusProps = {
            infoIcon: '${navigationMenuBacker.cssContextPath}/images/status/info.gif' , infoStyle: 'message-info-label',
            errorIcon: '${navigationMenuBacker.cssContextPath}/images/status/error.gif' , errorStyle: 'message-error-label',
            warnIcon: '${navigationMenuBacker.cssContextPath}/images/status/warn.gif' , warnStyle: 'message-warn-label'};
        var _STATUSINFO = new StatusInfo("message", statusProps);         
        
        function setStatusInfo(text)
        {
            _STATUSINFO.statusInfo(text);
        }
    
        function setStatusError(text)
        {
            _STATUSINFO.statusError(text);
        }
    
        function setStatusWarn(text)
        {
            _STATUSINFO.statusWarn(text);
        }
    
        function clearStatus()
        {
            _STATUSINFO.clear();
        }
        
        function setDetailMessage(detailMessage)
        {
        	var element = $("#status").find("#messageDatails");
        	if (element.length == 0) { // does not exists
        		$("#status").find("span.rich-message-label").append('<div id="messageDatails"/>');
        		$("#status").find("span.rich-message-label").append('<a href="javascript:hideDetailMessage()" title="${CLICK_TO_HIDE}">${OK}</a>');
        		element = $("#status").find("#messageDatails");
        	}
        	element.html(detailMessage);
        	$("#status").addClass("statusDetails");
        }
        
        function hideDetailMessage()
        {
            $("#status").removeClass("statusDetails");
        }
    </script>    
    <tags:footer/>
    
</jsp:root>