Imports Microsoft.VisualBasic

Public Class Mensaje
    Public Enum TipoMsg
        Advertencia = 0
        Confirma
        Falla
        Pregunta

    End Enum

    Public Shared Function MuestraMensaje(ByVal strSegmento As String, ByVal strMsg As String, ByVal Tipo As TipoMsg) As Boolean
        Dim page As Page = HttpContext.Current.CurrentHandler
        ScriptManager.RegisterClientScriptBlock(page, GetType(Page), "MuestraMensaje", "fn_MuestraMensaje('" & strSegmento & "','" & Replace(Replace(strMsg, "'", ""), vbCrLf, " ") & "'," & Tipo & ");", True)
        Return True
    End Function
End Class
