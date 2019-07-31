Imports System.Data
Imports System.Data.SqlClient
Imports System.Web
Imports System.Web.Script.Services
Imports System.Web.Services
Imports System.Web.Services.Protocols
Imports Funciones

' To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line.
' <System.Web.Script.Services.ScriptService()> _
<WebService(Namespace:="http://tempuri.org/")>
<WebServiceBinding(ConformsTo:=WsiProfiles.BasicProfile1_1)>
<ScriptService>
Public Class ConsultaBD
    Inherits System.Web.Services.WebService

    <System.Web.Services.WebMethod>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function ObtieneDatos(ByVal Consulta As String) As List(Of Catalogo)
        Dim OcultaCampo1 As String
        Dim OcultaCampo2 As String
        Dim OcultaCampo3 As String
        Dim dt As New DataTable

        Consulta = Replace(Consulta, "==", "'")
        Consulta = Replace(Consulta, "|", "'")

        fn_Consulta(Consulta, dt)

        Dim Lista = New List(Of Catalogo)

        Dim varCatalogo As Catalogo

        For Each dr In dt.Rows
            varCatalogo = New Catalogo
            OcultaCampo1 = IIf(IsDBNull(dr("OcultaCampo1")), "", dr("OcultaCampo1"))
            OcultaCampo2 = IIf(IsDBNull(dr("OcultaCampo2")), "", dr("OcultaCampo2"))
            OcultaCampo3 = IIf(IsDBNull(dr("OcultaCampo3")), "", dr("OcultaCampo3"))
            varCatalogo.Catalogo(dr("Clave"), dr("Descripcion"), OcultaCampo1, OcultaCampo2, OcultaCampo3)
            Lista.Add(varCatalogo)
        Next
        Return Lista
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetFase(ByVal Id As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try

            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Fas", "Where id_fase=" & Id.ToString(), "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetDeptos(ByVal Id As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Sec", "Where cod_sector=" & Id, "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetAsegurado(ByVal prefix As String) As String()
        Dim ws As New ws_Generales.GeneralesClient
        Dim ArrAsegurado As New List(Of String)()
        Dim dtResult As New DataTable
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Ase", prefix, "").ToList)

            For Each row In dtResult.Rows
                ArrAsegurado.Add(String.Format("{0}|{1}", row("Descripcion"), row("Clave")))
            Next

        Catch ex As Exception
            Mensaje.MuestraMensaje("", ex.Message, 2)
        End Try
        Return ArrAsegurado.ToArray()
    End Function
    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetEventoCat(ByVal prefix As String) As String()
        Dim ws As New ws_Generales.GeneralesClient
        Dim ArrEveCat As New List(Of String)()
        Dim dtResult As New DataTable
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Eve", prefix, "").ToList)

            For Each row In dtResult.Rows
                ArrEveCat.Add(String.Format("{0}|{1}", row("Descripcion"), row("Clave")))
            Next

        Catch ex As Exception
            Mensaje.MuestraMensaje("", ex.Message, 2)
        End Try
        Return ArrEveCat.ToArray()
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetAclaracion(ByVal id_pv As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim Salida As String = vbNullString
        Try
            Salida = ws.ObtieneAclaraciones(id_pv)
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetSucursal(ByVal Id As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Suc", "AND cod_suc=" & Id.ToString(), "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetAgente(ByVal Id As Integer, ByVal Tipo As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Age", "AND cod_agente=" & Id.ToString(), " AND cod_tipo_agente = " & Tipo.ToString).ToList)

            If Not dtResult Is Nothing And dtResult.Rows.Count > 0 Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetProducto(ByVal Id As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Pro", "And cod_ramo=" & Id.ToString(), "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetCompañia(ByVal Id As Integer) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Rea", "And cod_cia_reas=" & Id.ToString(), "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetAutocompletar(ByVal catalogo As String, ByVal prefix As String, ByVal strSel As String) As String()
        Dim ws As New ws_Generales.GeneralesClient
        Dim ArrAsegurado As New List(Of String)()
        Dim dtResult As New DataTable
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo(catalogo, prefix, strSel).ToList)

            For Each row In dtResult.Rows
                ArrAsegurado.Add(String.Format("{0}|{1}", row("Descripcion"), row("Clave")))
            Next

        Catch ex As Exception
            Mensaje.MuestraMensaje("", ex.Message, 2)
        End Try
        Return ArrAsegurado.ToArray()
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetFacultativo(ByVal Id As String) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Fac", " And id_contrato= '" & Id & "'", "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

    <WebMethod()>
    <ScriptMethod(ResponseFormat:=ResponseFormat.Json)>
    Public Function GetPoliza(ByVal Id As String) As String
        Dim ws As New ws_Generales.GeneralesClient
        Dim dtResult As New DataTable
        Dim Salida As String = vbNullString
        Try
            dtResult = Funciones.Lista_A_Datatable(ws.ObtieneCatalogo("Pol", " WHERE CAST(cod_suc AS VARCHAR) + '-' + CAST(cod_ramo AS VARCHAR) + '-' + CAST(nro_pol AS VARCHAR) + '-' + CAST(aaaa_endoso AS VARCHAR) + '-' + CAST(nro_endoso AS VARCHAR) = '" & Id & "'", "").ToList)

            If Not dtResult Is Nothing Then
                Salida = dtResult.Rows(0).ItemArray(2).ToString & "|" & dtResult.Rows(0).ItemArray(3).ToString
            End If
        Catch ex As Exception
            Salida = vbNullString
        End Try
        Return Salida
    End Function

End Class