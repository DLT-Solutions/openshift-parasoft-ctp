<jsp:root xmlns:c="http://java.sun.com/jsp/jstl/core" 
    xmlns:fn="http://java.sun.com/jsp/jstl/functions" 
    xmlns:spring="http://www.springframework.org/tags" 
    xmlns:form="http://www.springframework.org/tags/form" 
    xmlns:jsp="http://java.sun.com/JSP/Page" 
    version="2.0">
  <jsp:output omit-xml-declaration="yes" />

  <jsp:directive.attribute name="id" type="java.lang.String" required="true" rtexprvalue="true" description="The identifier for this tag (do not change!)" />
  <jsp:directive.attribute name="field" type="java.lang.String" required="true" rtexprvalue="true" description="The field exposed from the form backing object" />
  <jsp:directive.attribute name="required" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Indicates if this field is required (default false)" />
  <jsp:directive.attribute name="dataSourceUrl" type="java.lang.String" required="true" rtexprvalue="true" description="Url from where read combo box items" />
  <jsp:directive.attribute name="itemLabel" type="java.lang.String" required="false" rtexprvalue="true" description="Name of the property mapped to the inner text of the 'option' tag" />
  <jsp:directive.attribute name="itemValue" type="java.lang.String" required="false" rtexprvalue="true" description="The identifier used as value in the combo box" />  
  <jsp:directive.attribute name="disabled" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Specify if this field should be enabled" />
  <jsp:directive.attribute name="disableFormBinding" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Set to true to disable Spring form binding" />
  <jsp:directive.attribute name="cssClass" type="java.lang.String" required="false" rtexprvalue="true" description="CSS class name" />
  <jsp:directive.attribute name="render" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Indicate if the contents of this tag and all enclosed tags should be rendered (default 'true')" />
  
  <spring:message code="SELECT_COMBO_VALUE" var="SELECT_COMBO_VALUE"/>
  
  <c:if test="${empty render or render}">
    
    <c:if test="${empty disabled}">
      <c:set value="false" var="disabled" />
    </c:if>       
    
    <c:if test="${empty required}">
      <c:set value="false" var="required" />
    </c:if>
    
    <c:if test="${empty cssClass}">
      <c:set value="" var="cssClass" />
    </c:if>        
    
    <c:set var="sec_field">
      <spring:escapeBody javaScriptEscape="true" >${field}</spring:escapeBody>
    </c:set>

    <c:choose>
        <c:when test="${disableFormBinding}">
            <input id="_${id}_id" name="${sec_field}" type="${fn:escapeXml(type)}"/>
        </c:when>
        <c:otherwise>
            <c:choose>
                <c:when test="${required}">
                    <form:input id="_${id}_id" path="${sec_field}" disabled="${disabled}" required="true" cssClass="${cssClass}"/>
                </c:when>
                <c:otherwise>
                    <form:input id="_${id}_id" path="${sec_field}" disabled="${disabled}" cssClass="${cssClass}"/>                     
                </c:otherwise>
            </c:choose>

            <form:errors cssClass="error" id="_${id}_error_id" path="${sec_field}" />
        </c:otherwise>
    </c:choose>
    <c:choose>
        <c:when test="${empty itemLabel or empty itemValue}">
	        <script type="text/javascript">             
	          $(document).ready(function(){                 
	            $("#_${sec_field}_id").kendoComboBox({
	                dataSource: {
	                    transport: {
	                        read: "${dataSourceUrl}"
	                    }
	                },
	                autoBind: false,
	                placeholder: "${SELECT_COMBO_VALUE}"
	            });
	          });
	         </script>        
        </c:when>
        <c:otherwise>
	        <script type="text/javascript">             
	          $(document).ready(function(){                 
	            $("#_${sec_field}_id").kendoComboBox({
	                dataTextField: "${itemLabel}",
	                dataValueField: "${itemValue}",
	                dataSource: {
	                    transport: {
	                        read: "${dataSourceUrl}"
	                    }
	                },
	                autoBind: true,
	                placeholder: "${SELECT_COMBO_VALUE}"
	            });
	          });
	         </script>        
        </c:otherwise>
    </c:choose>
    
  </c:if>
</jsp:root>