
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Services

Imports System.IO
Imports Mensaje

Partial Class Siniestros_OrdenPagoMasivo
    Inherits System.Web.UI.Page


    Sub Page_Load(ByVal Sender As Object, ByVal e As EventArgs) Handles Me.Load

        cmbTipoComprobante.Items.Clear()
        Dim dt As New DataTable
        Funciones.fn_Consulta("sp_Catalogos_OPMasivas 'COMPROBANTE','',''", dt)



        If cmbTipoComprobante.Items.Count = 0 Then

            cmbTipoComprobante.DataSource = dt
            cmbTipoComprobante.DataTextField = "Descripcion"
            cmbTipoComprobante.DataValueField = "CodigoComprobante"
            cmbTipoComprobante.DataBind()


        End If
        If Not IsPostBack Then
            Me.txtFechaEstimadaPago.Text = FechaEstimPago()
        End If


    End Sub




    Protected Sub btn_Revisar_Click(sender As Object, e As EventArgs) Handles btn_Revisar.Click

        Dim ws As New ws_Generales.GeneralesClient
        Dim server As String = ws.ObtieneParametro(9)
        Dim RptFilters As String
        RptFilters = "&NumLote=" & txt_NumLote.Text


        server = Replace(Replace(server, "@Reporte", "RevisionOrdenPagoMasiva"), "@Formato", "EXCEL")
        server = Replace(server, "ReportesGMX_UAT", "ReportesOPSiniestros")
        server = server & RptFilters
        Funciones.EjecutaFuncion("window.open('" & server & "');")





    End Sub


    Protected Sub btn_Aceptar_Click(sender As Object, e As EventArgs) Handles btn_Aceptar.Click



        Dim cadena As String
        Dim datos() As String
        cadena = HttpContext.Current.User.Identity.Name.ToString()
        datos = cadena.Split("|")



        Dim oDatos As DataSet
        Dim oTabla As DataTable
        Dim oParametros As New Dictionary(Of String, Object)


        oParametros.Add("Num_Lote", txt_NumLote.Text)
        oParametros.Add("salida", "2")


        oDatos = Funciones.ObtenerDatos("sp_recupera_lote_OP_Masivo", oParametros)
        oTabla = oDatos.Tables(0)



        For Each row As DataRow In oTabla.Rows

            oDatos = New DataSet

            oParametros = New Dictionary(Of String, Object)
            oParametros.Add("NumLote", txt_NumLote.Text)
            oParametros.Add("UsuarioSII", Master.cod_usuario.ToString())
            oParametros.Add("Folio_Onbase", row("Folio_Onbase").ToString())


            oDatos = Funciones.ObtenerDatos("usp_CrearSolicitudPago_stro_Masivo", oParametros)

        Next

        Response.Redirect("ResumenOPMasivo.aspx?Num_Lote=" & txt_NumLote.Text)

    End Sub


    Protected Sub btnLimpiar_Click(sender As Object, e As EventArgs) Handles btnLimpiar.Click
        Response.Redirect("OrdenPagoMasivo.aspx")

    End Sub

    Public Sub txt_TextChanged(sender As Object, e As EventArgs)


        If Convert.ToDateTime(Me.txtFechaEstimadaPago.Text) < Now.ToShortDateString Then
            Mensaje.MuestraMensaje("OrdenPagoSiniestros", "No Puede ingresar una fecha menor al dia de hoy", TipoMsg.Advertencia)
            Me.txtFechaEstimadaPago.Text = Now.ToString("dd/MM/yyyy")
        End If




    End Sub

    Private Function FechaEstimPago() As String
        Dim oParametros As New Dictionary(Of String, Object)
        Dim oDatos As DataSet
        Dim dt As DataTable
        Dim result As String
        Try
            oParametros = New Dictionary(Of String, Object)







            oDatos = New DataSet

            oDatos = Funciones.ObtenerDatos("usp_Obtener_fecha_estimada_pago", oParametros)

            If Not oDatos Is Nothing AndAlso oDatos.Tables(0).Rows.Count > 0 Then
                result = oDatos.Tables(0).Rows(0).Item(0)
            Else
                result = ""
            End If


        Catch ex As Exception

            Mensaje.MuestraMensaje("OrdenPagoSiniestros", String.Format("ObtenerTipoCambio error: {0}", ex.Message), TipoMsg.Falla)
        End Try

        FechaEstimPago = result
    End Function
End Class
