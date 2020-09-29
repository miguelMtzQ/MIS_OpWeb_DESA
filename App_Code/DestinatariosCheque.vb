Imports Microsoft.VisualBasic
Imports System.Data

Public Class DestinatariosCheque

    Dim _clave As String
    Dim _txt_empresa As String
    Dim _txt_calle As String
    Dim _cod_colonia As String
    Dim _cod_municipio As String
    Dim _cod_ciudad As String
    Dim _cod_dpto As String
    Dim _txt_cod_postal As String
    Dim _txt_atencion As String
    Dim _txt_telefonos As String
    Dim _activo As String

    Public Property Clave As String
        Get
            Return _clave
        End Get
        Set(value As String)
            _clave = value
        End Set
    End Property

    Public Property Txt_empresa As String
        Get
            Return _txt_empresa
        End Get
        Set(value As String)
            _txt_empresa = value
        End Set
    End Property

    Public Property Txt_calle As String
        Get
            Return _txt_calle
        End Get
        Set(value As String)
            _txt_calle = value
        End Set
    End Property

    Public Property Cod_colonia As String
        Get
            Return _cod_colonia
        End Get
        Set(value As String)
            _cod_colonia = value
        End Set
    End Property

    Public Property Cod_municipio As String
        Get
            Return _cod_municipio
        End Get
        Set(value As String)
            _cod_municipio = value
        End Set
    End Property

    Public Property Cod_ciudad As String
        Get
            Return _cod_ciudad
        End Get
        Set(value As String)
            _cod_ciudad = value
        End Set
    End Property

    Public Property Cod_dpto As String
        Get
            Return _cod_dpto
        End Get
        Set(value As String)
            _cod_dpto = value
        End Set
    End Property

    Public Property Txt_cod_postal As String
        Get
            Return _txt_cod_postal
        End Get
        Set(value As String)
            _txt_cod_postal = value
        End Set
    End Property

    Public Property Txt_atencion As String
        Get
            Return _txt_atencion
        End Get
        Set(value As String)
            _txt_atencion = value
        End Set
    End Property

    Public Property Txt_telefonos As String
        Get
            Return _txt_telefonos
        End Get
        Set(value As String)
            _txt_telefonos = value
        End Set
    End Property

    Public Property Activo As String
        Get
            Return _activo
        End Get
        Set(value As String)
            _activo = value
        End Set
    End Property

    Public Function Save() As Integer
        Dim oDatos As DataSet
        Dim oTabla As DataTable
        Dim iClave As Integer
        Dim oParametros As New Dictionary(Of String, Object)
        Try
            If Not Clave = "" Then oParametros.Add("clave", Clave)
            oParametros.Add("txt_empresa", Txt_empresa)
            oParametros.Add("txt_calle", Txt_calle)
            oParametros.Add("cod_colonia", Cod_colonia)
            oParametros.Add("cod_municipio", Cod_municipio)
            oParametros.Add("cod_ciudad", Cod_ciudad)
            oParametros.Add("cod_dpto", Cod_dpto)
            oParametros.Add("txt_cod_postal", Txt_cod_postal)
            oParametros.Add("txt_atencion", Txt_atencion)
            oParametros.Add("txt_telefonos", Txt_telefonos)
            oParametros.Add("sn_activo", Activo)



            oDatos = Funciones.ObtenerDatos("usp_grabar_dest_cheque", oParametros)
            oTabla = oDatos.Tables(0)

            iClave = oTabla.Rows(0)(0).ToString

            Return iClave

        Catch ex As Exception
            'MuestraMensaje("Exception", "BuscarOP: " & ex.Message, TipoMsg.Falla)
            Return -1
        End Try
    End Function

End Class
