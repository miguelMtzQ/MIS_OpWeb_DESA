<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMasterEmpty.master" AutoEventWireup="false" CodeFile="Login.aspx.vb" Inherits="Pages_Login" %>
<%@ MasterType VirtualPath="~/Pages/SiteMasterEmpty.master" %>

<asp:Content ID="Content2" ContentPlaceHolderID="cph_principal" Runat="Server">
    <div class="clear padding50"></div>

    <script type="text/javascript">
        $(document).keypress(function (e) {
            if (e.which == 13) {
                __doPostBack('ctl00$cph_principal$btn_Aceptar', '')
            }
        });
    </script>

    <div id="cuadro_login" class="panel-encabezado" >
        <div class="cuadro-titulo">
            <strong>INICIAR SESIÓN</strong>
        </div>

        <div class="clear padding30"></div>
        <asp:UpdatePanel runat="server" ID="upLogin">
            <ContentTemplate>
                <table>
                    <tr>
                        <td>
                            <img class="profile-img" src ="../Images/Login.png" alt=""/>
                        </td>
                        <td>
           
                            <div class="input-group"> 
                                <asp:label runat="server" class="col-md-1 etiqueta-control" Width="90px">Usuario</asp:label>

                                <span class="input-group-addon">
                                     <img src="../Images/user_text.png" height="15" width="15" />
                                </span>
                                <asp:TextBox runat="server" ID="txt_usuario" Width="163px" CssClass="form-control etiqueta-simple" Font-Size="12px" ></asp:TextBox>
                            </div>
     
                            <div class="clear padding10"></div>

                            <div class="input-group"> 
                                <asp:label runat="server" class="col-md-1 etiqueta-control" Width="90px">Contraseña</asp:label>
                                <span class="input-group-addon">
                                    <img src="../Images/pass_icon.png" height="15" width="15" />
                                </span>
                                <asp:TextBox runat="server" ID="txt_contraseña" Width="163px" CssClass="form-control etiqueta-simple" TextMode="Password" ></asp:TextBox>
                            </div>

                            <div class="clear padding10"></div>

                            <div style="width:100%; padding-left:90px;">
                                <asp:LinkButton id="btn_Aceptar" runat="server" class="btn botones Aceptar"  Width="205px">
                                    <span>
                                        Iniciar Sesión
                                    </span>
                                </asp:LinkButton>
                            </div>   

                            <div class="clear padding10"></div>

                            <div style="width:100%; padding-left:80px; text-align:center">
                                <asp:linkbutton runat="server" class="etiqueta-control">¿Olvidó su Contraseña?</asp:linkbutton>
                            </div>
                            <div style="width:100%; padding-left:80px; text-align:center">
                                <asp:linkbutton runat="server" class="etiqueta-control">Solicitud de Registro</asp:linkbutton>
                            </div>
                        </td>
                    </tr>
                </table>
            </ContentTemplate>
        </asp:UpdatePanel>
        
    </div>

</asp:Content>

