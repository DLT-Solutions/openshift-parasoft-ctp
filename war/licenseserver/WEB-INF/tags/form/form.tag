<jsp:root xmlns:jsp="http://java.sun.com/JSP/Page"     
    xmlns:c="http://java.sun.com/jsp/jstl/core" 
    xmlns:form="http://www.springframework.org/tags/form"
    xmlns:fn="http://java.sun.com/jsp/jstl/functions"
    xmlns:spring="http://www.springframework.org/tags"
    version="2.0">
    <jsp:output omit-xml-declaration="yes" />
    
    <jsp:directive.attribute name="id" type="java.lang.String" required="true" rtexprvalue="true" description="The identifier for this tag" />
    <jsp:directive.attribute name="modelAttribute" type="java.lang.String" required="true" rtexprvalue="true" description="The name of the model attribute for form binding" />
    <jsp:directive.attribute name="path" type="java.lang.String" required="true" rtexprvalue="true" description="Specify the relative URL path (with leading /)" />
    <jsp:directive.attribute name="mode" type="java.lang.String" required="true" rtexprvalue="true" description="Specify the mode of the form (for example create or update)" />
    <jsp:directive.attribute name="multipart" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Indicate if this is a multipart form (default: false)" />
    <jsp:directive.attribute name="idField" type="java.lang.String" required="false" rtexprvalue="true" description="Specify the field name of the id field (default 'id')" />
    <jsp:directive.attribute name="saveButtonLabel" type="java.lang.String" required="false" rtexprvalue="true" description="Label of the save button"  />
    <jsp:directive.attribute name="cancelUrl" type="java.lang.String" required="false" rtexprvalue="true" description="Cancel button url"  />    
    <jsp:directive.attribute name="ajaxMode" type="java.lang.Boolean" required="false" rtexprvalue="true"/>
    <jsp:directive.attribute name="ajaxCallback" type="java.lang.String" required="false" rtexprvalue="true" />
    <jsp:directive.attribute name="onSubmitButtonClick" type="java.lang.String" required="false" rtexprvalue="true"/>
    <jsp:directive.attribute name="render" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Indicate if the contents of this tag and all enclosed tags should be rendered (default 'true')" />
    
    <!-- fragments -->
    <jsp:directive.attribute name="buttons" fragment="true" />
    
    <c:if test="${empty render or render}">
	    
	    <c:set var="enctype" value="application/x-www-form-urlencoded" />
	    <c:if test="${multipart}">
	        <c:set var="enctype" value="multipart/form-data" />
	    </c:if>    
	
	    <c:if test="${empty idField}">
	        <c:set value="id" var="idField" />
	    </c:if>    
	    
        <c:if test="${empty cancelUrl}">
            <c:url value="/" var="cancelUrl"/>
        </c:if> 	    
	    
        <c:if test="${empty ajaxMode}">
            <c:set value="false" var="ajaxMode" />
        </c:if>	    
	    
        <c:if test="${empty ajaxCallback}"> 
            <c:set var="ajaxCallback" value="null" />
        </c:if>	    
	    
        <c:if test="${empty onSubmitButtonClick}">  
            <c:set var="onSubmitButtonClick" value="null" />
        </c:if>	    
	    
	    <c:if test="${empty saveButtonLabel}">
	       <spring:message code="SAVE_BTN" var="saveButtonLabel" htmlEscape="false" />
	    </c:if>
	
		<form:form id="${id}" action="${fn:escapeXml(path)}" method="POST" modelAttribute="${modelAttribute}" enctype="${enctype}" novalidate="">            
		    
		    <form:errors cssClass="errors" delimiter="&lt;p/&gt;" />

		    <jsp:doBody />
		    
		    <div class="dockPanel">
		        <div>				        
			        <input class="button" id="submitBtn" name="${mode}" type="submit" value="${saveButtonLabel}" />
                    <jsp:invoke fragment="buttons"/>					        
			        <a class="button" href="${cancelUrl}"><spring:message code="CANCEL"/></a>
			        <c:if test="${idField ne 'none'}">
			            <form:hidden id="_${fn:escapeXml(idField)}_id" path="${fn:escapeXml(idField)}" />
			        </c:if>					        
		        </div>
		    </div>
		</form:form>

        <script type="text/javascript">
        <![CDATA[

            $(document).ready(function() {
                Parasoft.Kendo.initForm({
                    formId:"${id}", 
                    formUrl: "${fn:escapeXml(path)}", 
                    method: "POST", 
                    ajax: ${ajaxMode}, 
                    ajaxCallback: ${ajaxCallback},
                    onSubmitButtonClick: ${onSubmitButtonClick}
                });
            });         

        ]]>
        </script>	
    </c:if>
</jsp:root>