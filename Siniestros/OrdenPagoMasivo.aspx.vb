
Imports System.Data
Imports System.Web.Script.Services
Imports System.Web.Services

Imports System.IO

Partial Class Siniestros_OrdenPagoMasivo
    Inherits System.Web.UI.Page


    Sub Page_Load(ByVal Sender As Object, ByVal e As EventArgs) Handles Me.Load

        cmbTipoComprobante.Items.Clear()
        Dim dt As New DataTable
        Funciones.fn_Consulta("spS_CatalogosSIR 'COMPROBANTE','',''", dt)

        If cmbTipoComprobante.Items.Count = 0 Then

            cmbTipoComprobante.DataSource = dt
            cmbTipoComprobante.DataTextField = "Descripcion"
            cmbTipoComprobante.DataValueField = "CodigoComprobante"
            cmbTipoComprobante.DataBind()


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
End Class
