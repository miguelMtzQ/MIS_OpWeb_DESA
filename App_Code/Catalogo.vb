Imports Microsoft.VisualBasic

Public Class Catalogo
    Private _Clave As String
    Private _Descripcion As String
    Private _OcultaCampo1 As String
    Private _OcultaCampo2 As String
    Private _OcultaCampo3 As String

    Public Sub Catalogo(ByVal clave As String, ByVal descripcion As String, ByVal OcultaCampo1 As String, ByVal OcultaCampo2 As String, ByVal OcultaCampo3 As String)
        Me.Clave = clave
        Me.Descripcion = descripcion
        Me.OcultaCampo1 = OcultaCampo1
        Me.OcultaCampo2 = OcultaCampo2
        Me.OcultaCampo3 = OcultaCampo3
    End Sub

    Public Property Clave() As String
        Get
            Return _Clave
        End Get
        Set(ByVal value As String)
            _Clave = value
        End Set
    End Property

    Public Property Descripcion() As String
        Get
            Return _Descripcion
        End Get
        Set(ByVal value As String)
            _Descripcion = value
        End Set
    End Property

    Public Property OcultaCampo1() As String
        Get
            Return _OcultaCampo1
        End Get
        Set(ByVal value As String)
            _OcultaCampo1 = value
        End Set
    End Property

    Public Property OcultaCampo2() As String
        Get
            Return _OcultaCampo2
        End Get
        Set(ByVal value As String)
            _OcultaCampo2 = value
        End Set
    End Property

    Public Property OcultaCampo3() As String
        Get
            Return _OcultaCampo3
        End Get
        Set(ByVal value As String)
            _OcultaCampo3 = value
        End Set
    End Property


End Class
