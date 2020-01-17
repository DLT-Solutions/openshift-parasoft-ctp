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
  <jsp:directive.attribute name="disabled" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Specify if this field should be enabled" />
  <jsp:directive.attribute name="disableFormBinding" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Set to true to disable Spring form binding" />
  <jsp:directive.attribute name="cssClass" type="java.lang.String" required="false" rtexprvalue="true" description="CSS class name" />
  <jsp:directive.attribute name="cssStyle" type="java.lang.String" required="false" rtexprvalue="true" description="CSS class name" />
  <jsp:directive.attribute name="type" type="java.lang.String" required="false" rtexprvalue="true" description="Set field type (default 'text', or 'password' or 'email' or 'tel' or)" />
  <jsp:directive.attribute name="min" type="java.lang.Integer" required="false" rtexprvalue="true" />
  <jsp:directive.attribute name="max" type="java.lang.Integer" required="false" rtexprvalue="true" />
  <jsp:directive.attribute name="format" type="java.lang.String" required="false" rtexprvalue="true" />
  <jsp:directive.attribute name="render" type="java.lang.Boolean" required="false" rtexprvalue="true" description="Indicate if the contents of this tag and all enclosed tags should be rendered (default 'true')" />
  
  
  <c:if test="${empty render or render}">
    <c:if test="${empty type}">
      <c:set value="text" var="type" />
    </c:if>
    
    <c:if test="${empty disabled}">
      <c:set value="false" var="disabled" />
    </c:if>
    
    <c:if test="${empty min}">
      <c:set value="null" var="min" />
    </c:if>
    
    <c:if test="${empty max}">
      <c:set value="null" var="max" />
    </c:if>        
    
    <c:if test="${empty required}">
      <c:set value="false" var="required" />
    </c:if>
    
    <c:if test="${empty cssClass}">
      <c:set value="" var="cssClass" />
    </c:if> 
    
    <c:if test="${empty cssStyle}">
      <c:set value="" var="cssStyle" />
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
                    <c:choose>
                        <c:when test="${type eq 'password'}">
                            <form:password id="_${id}_id" path="${sec_field}" disabled="${disabled}" required="true" showPassword="true" cssClass="${cssClass}" autocomplete="off"/>
                        </c:when>
                        <c:otherwise>
                            <form:input id="_${id}_id" path="${sec_field}" disabled="${disabled}" required="true" cssStyle="${cssStyle}" cssClass="${cssClass}" autocomplete="off"/>
                        </c:otherwise>
                    </c:choose>
                </c:when>
                <c:otherwise>
                    <c:choose>
                        <c:when test="${type eq 'password'}">
                            <form:password id="_${id}_id" path="${sec_field}" disabled="${disabled}" showPassword="true" cssClass="${cssClass}" autocomplete="off"/>
                        </c:when>
                        <c:otherwise>
                            <form:input id="_${id}_id" path="${sec_field}" disabled="${disabled}" cssClass="${cssClass}" cssStyle="${cssStyle}" autocomplete="off"/>
                        </c:otherwise>
                    </c:choose>                     
                </c:otherwise>
            </c:choose>

            <form:errors cssClass="error" id="_${id}_error_id" path="${sec_field}" />
        </c:otherwise>
    </c:choose>
    <c:if test="${type == 'number'}">
        <script type="text/javascript">             
          $(document).ready(function(){                 
            $("#_${sec_field}_id").kendoNumericTextBox({
            	format: "${format}",
                min: ${min},
                max: ${max}
            });
          });
         </script>
     </c:if>
    
  </c:if>
</jsp:root>