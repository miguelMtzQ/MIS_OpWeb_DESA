﻿
Imports System.Data
Imports Mensaje

Partial Class Siniestros_OrdenPagoMasivoFondos
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

        CargarAnalistasFondos()

        If Not IsPostBack Then
            Me.txtFechaEstimadaPago.Text = FechaEstimPago()
        End If


    End Sub




    Protected Sub btn_Revisar_Click(sender As Object, e As EventArgs) Handles btn_Revisar.Click

        Dim ws As New ws_Generales.GeneralesClient
        Dim server As String = ws.ObtieneParametro(3)
        Dim RptFilters As String
        RptFilters = "&NumLote=" & txt_NumLote.Text


        server = Replace(Replace(server, "@Reporte", "RevisionOrdenPagoMasiva"), "@Formato", "EXCEL")
        server = Replace(server, "ReportesGMX_DESA", "ReportesOPSiniestros_DESA")
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
        Dim snFondosSinIva As String
        Dim VariasFacturas As String

        oParametros.Add("Num_Lote", txt_NumLote.Text)
        oParametros.Add("salida", "2")

        oDatos = Funciones.ObtenerDatos("sp_recupera_lote_OP_Masivo", oParametros)
        oTabla = oDatos.Tables(0)

        If chkFondosSinIVA.Checked = True Then
            snFondosSinIva = "Y"
        Else
            snFondosSinIva = "N"
        End If

        If chkVariasFacturas.Checked = True Then
            VariasFacturas = "Y"
        Else
            VariasFacturas = "N"
        End If

        For Each row As DataRow In oTabla.Rows

            oDatos = New DataSet

            oParametros = New Dictionary(Of String, Object)
            oParametros.Add("NumLote", txt_NumLote.Text)
            oParametros.Add("UsuarioSII", Master.cod_usuario.ToString())
            oParametros.Add("Folio_Onbase", row("Folio_Onbase").ToString())

            oParametros.Add("Analista_Fondos", cmbAnalistaSolicitante.SelectedValue)
            oParametros.Add("snFondosSinIva", snFondosSinIva)
            oParametros.Add("VariasFacturas", VariasFacturas)


            oDatos = Funciones.ObtenerDatos("MIS_sp_solicitud_stro_grabar_op_Fondos_Masivo", oParametros)

        Next

        Response.Redirect("ResumenOPMasivo.aspx?Fondos=1&Num_Lote=" & txt_NumLote.Text)

    End Sub


    Protected Sub btnLimpiar_Click(sender As Object, e As EventArgs) Handles btnLimpiar.Click
        Response.Redirect("OrdenPagoMasivoFondos.aspx")

    End Sub

    Public Sub CargarAnalistasFondos()
        Try
            Dim oDatos As DataSet
            oDatos = New DataSet
            Dim oParametros As New Dictionary(Of String, Object)
            oParametros.Add("Accion", "1")
            oDatos = Funciones.ObtenerDatos("MIS_Catalago_Fondos", oParametros)
            Me.cmbAnalistaSolicitante.Items.Clear()
            If (oDatos.Tables(0).Rows.Count > 0) Then
                'With oDatos.Tables(0).Rows(0)
                '    Me.txtCodigoCuenta.Text = .Item("cod_cta_cble")
                '    Me.txtDescCuenta.Text = .Item("txt_denomin")
                'End With
                For Each fila In oDatos.Tables(0).Rows
                    Me.cmbAnalistaSolicitante.Items.Add(New ListItem(String.Format(fila.Item("AnalistaFondos")).ToUpper, fila.Item("usuarioanalista")))
                Next

            Else
                Mensaje.MuestraMensaje("Analistas de Fondos", "No hay Analista de Fondos", 1)
            End If
        Catch ex As Exception
            Mensaje.MuestraMensaje("OrdenPagoSiniestros", String.Format("grd_RowDataBound error: {0}", ex.Message), 1)
        End Try
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
