﻿<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false" CodeFile="EnviosPagosInternacionales.aspx.vb" Inherits="Siniestros_EnviosPagosInternacionales" %>

<%@ MasterType VirtualPath="~/Pages/SiteMaster.master" %>
<asp:Content ID="Content2" ContentPlaceHolderID="cph_principal" runat="Server">
    <script src="../Scripts/Siniestros/PagoInter.js"></script>
    <asp:HiddenField runat="server" ID="hid_Ventanas" Value="0|1" />
    <div class="zona-principal" style="overflow-x: hidden; overflow-y: hidden">
        <div class="cuadro-titulo panel-encabezado" style="text-align: left; tab-size: 18px">
            <input type="image" src="../Images/contraer_mini_inv.png" id="coVentana0" class="contraer" />
            <input type="image" src="../Images/expander_mini_inv.png" id="exVentana0" class="expandir" />
            &nbsp&nbsp Filtros - Datos Para Pago Internacional
        </div>
        <div class="padding20"></div>

        <div class="row">

            <div class="col-md-4">
                <asp:Label runat="server" class="col-md-3 etiqueta-control">Num OP</asp:Label>
                <asp:TextBox runat="server" ID="txt_nro_op" CssClass="col-md-6 estandar-control" OnFocusOut="nroOPdesde('txt_nro_op')" onkeypress="return soloNumeros(event)" PlaceHolder="Ej: 84162"></asp:TextBox>

            </div>

            <div class="col-md-6">
                <asp:Label runat="server" class="col-md-3 etiqueta-control">Por Rango OP</asp:Label>
                <asp:TextBox runat="server" ID="txt_nro_op_ini" CssClass="col-md-3 estandar-control"  enabled="false" onkeypress="return soloNumeros(event)" PlaceHolder="Núm OP desde"></asp:TextBox>

                <asp:Label runat="server" class="col-md-1 etiqueta-control">A</asp:Label>
                <asp:TextBox runat="server" ID="txt_nro_op_fin" CssClass="col-md-3 estandar-control" onkeypress="return soloNumeros(event)" PlaceHolder="Núm OP hasta"></asp:TextBox>
            </div>
        </div>
        <br />
        <div class="row">



            <div class="col-md-4">
                <asp:Label runat="server" class="col-md-3 etiqueta-control">Siniestro</asp:Label>
                <asp:TextBox runat="server" ID="txt_siniestro" CssClass="col-md-6 estandar-control" onkeypress="return soloNumeros(event)" PlaceHolder="Siniestro"></asp:TextBox>

            </div>


            <div class="col-md-6">
                <asp:Label runat="server" class="col-md-3 etiqueta-control">Beneficiario</asp:Label>
                <asp:TextBox runat="server" ID="txt_beneficiario" CssClass="col-md-7 estandar-control"  OnFocusOut="convMayusculas('txt_beneficiario')" PlaceHolder="Beneficiario"></asp:TextBox>

            </div>


        </div>

        <br />
        <div style="width: 100%; text-align: right; border-top-style: inset; border-width: 1px; border-color: #003A5D"></div>


        <div class="padding10">
            <asp:LinkButton ID="btn_BuscarOP" runat="server" class="btn botones pull-right" BorderWidth="2" BorderColor="White" Width="105px">
                                <span>
                                    <img class="btn-buscar"/>&nbsp Buscar
                                </span>
            </asp:LinkButton>

           <%-- <asp:LinkButton ID="btn_Continuar" runat="server" class="btn botones" Width="153px" data-toggle="modal" data-target="#CorreosPI" Visible="TRUE">
                        <span>
                            <img class="btn-aceptar"/>&nbspModal
                        </span>
            </asp:LinkButton>

            <asp:LinkButton ID="LinkButton1" runat="server" class="btn botones" Width="153px" data-toggle="modal" data-target="#mailPI" Visible="TRUE">
                        <span>
                            <img class="btn-aceptar"/>&nbspModal
                        </span>
            </asp:LinkButton>--%>

        </div>
    </div>



    <div class="row">
        <center>
                   <asp:UpdatePanel runat="server" ID="UpdatePanel1" UpdateMode="Conditional" >
                       <ContentTemplate>

                                       <asp:Panel runat="server" ID="pnlUsuario" Width="100%" Height="300" ScrollBars="Auto" >
                                         <%--<asp:GridView ID="grd" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#003A5D" BorderStyle="None" BorderWidth="1px" CellPadding="3" GridLines="Vertical" Width="95%">--%>
                                           
                                           <asp:GridView ID="grd" runat="server" AutoGenerateColumns="False" OnRowCommand="grd_RowCommand" DataKeyNames="nro_OP" CssClass="table-condensed table-hover" Font-Size="11px" GridLines="Vertical" HeaderStyle-CssClass="header" Height="35px" HorizontalAlign="Center" ShowHeaderWhenEmpty="True">
                                             <AlternatingRowStyle BackColor="#DCDCDC" />
                                             <Columns>
                                                 
                                                 <asp:BoundField DataField="nro_OP" HeaderText="Nro OP" />
                                                 <asp:BoundField DataField="pais" HeaderText="Pais" />
                                                 <asp:BoundField DataField="banco" HeaderText="Banco" />
                                                 <asp:BoundField DataField="num_banco" HeaderText="Num Banco" />
                                                 <asp:BoundField DataField="domicilio" HeaderText="Domicilio" />
                                                 <asp:BoundField DataField="cuenta" HeaderText="Cuenta" />
                                                 <asp:BoundField DataField="aba_routing" HeaderText="Aba/Routing" />
                                                 <asp:BoundField DataField="swift" HeaderText="Swift" />
                                                 <asp:BoundField DataField="transit" HeaderText="Transit" />
                                                 <asp:BoundField DataField="iban" HeaderText="Iban" />
                                                 <asp:BoundField DataField="triangulado" HeaderText="Triangulado" />
                                                 <asp:BoundField DataField="banco_triang" HeaderText="Banco" />
                                                 <asp:BoundField DataField="cuenta_triang" HeaderText="Cuenta" />
                                                 <asp:BoundField DataField="aba_routing_triang" HeaderText="Aba/Routing" />                                                


                                                  <asp:ButtonField Text="" HeaderText="Ver" CommandName="comVer" ButtonType="Image" ImageUrl="../Images/buscar_mini_inv.png" ItemStyle-HorizontalAlign="Center">
                                                    <ItemStyle HorizontalAlign="Center" />
                                                </asp:ButtonField>
                                                  <asp:ButtonField Text="" HeaderText="Enviar" CommandName="comEnviar" ButtonType="Image" ImageUrl="../Images/email_mini.png" ItemStyle-HorizontalAlign="Center">
                                                    <ItemStyle HorizontalAlign="Center" />
                                                </asp:ButtonField>
                               
                                             </Columns>
                                             <FooterStyle BackColor="#CCCCCC" ForeColor="Black" />
                                             <HeaderStyle BackColor="#003A5D" Font-Bold="False" ForeColor="White" />
                                             <PagerStyle BackColor="#999999" ForeColor="Black" HorizontalAlign="Center" />
                                             <RowStyle BackColor="#EEEEEE" ForeColor="Black" />
                                             <SelectedRowStyle BackColor="#008A8C" Font-Bold="True" ForeColor="White" />
                                             <SortedAscendingCellStyle BackColor="#F1F1F1" />
                                             <SortedAscendingHeaderStyle BackColor="#0000A9" />
                                             <SortedDescendingCellStyle BackColor="#CAC9C9" />
                                             <SortedDescendingHeaderStyle BackColor="#000065" />
                                         </asp:GridView>
                                           </asp:Panel>

                       </ContentTemplate>
                       <Triggers>
                           
                            <asp:AsyncPostBackTrigger ControlID="btn_BuscarOP" EventName="Click" />
                            
                       </Triggers>
                   </asp:UpdatePanel> 
                      </center>
    </div>


    <div id="CorreosPI" class="modal-catalogo" style="width: 25%;">
        <asp:UpdatePanel runat="server" ID="upCorreos">
            <ContentTemplate>
                <div class="cuadro-titulo">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="titulo-modal">Enviar Correo</div>
                </div>
                <div class="clear padding5"></div>
                <div id="div_CorreoPI" style="width: 100%; height: 300px; overflow-y: scroll; overflow-x: hidden;">

                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-11">
                            <asp:Label runat="server" class="col-md-1 etiqueta-control">Para</asp:Label>
                        </div>
                        <div class="col-md-1"></div>
                        <div class="col-md-11">
                            <asp:TextBox runat="server" ID="TextBox1" CssClass=" col-md-1 estandar-control" Width="95%"></asp:TextBox>
                        </div>
                    </div>

                    <asp:Label runat="server" class="col-md-1 etiqueta-control" Width="100%">Para</asp:Label>
                    <asp:TextBox runat="server" ID="txt_Correo" CssClass="col-md-2 estandar-control" Width="92%"></asp:TextBox>
                    <div class="clear padding5"></div>
                    <asp:Label runat="server" class="col-md-1 etiqueta-control" Width="60%">CC</asp:Label>
                    <asp:TextBox runat="server" ID="txt_Copia" CssClass="col-md-1 estandar-control" Text='<%# Eval("mail_copia") %>' Width="92%"></asp:TextBox>
                    <div class="clear padding5"></div>
                    <asp:Label runat="server" class="col-md-1 etiqueta-control" Width="60%">Asunto</asp:Label>
                    <asp:TextBox runat="server" ID="txt_Asunto" CssClass="col-md-1 estandar-control" Text='<%# Eval("asunto") %>' Width="92%"></asp:TextBox>

                    <%--<asp:Panel runat="server" ID="pnl_Correos" Width="100%" Height="550px" ScrollBars="Vertical">--%>
                </div>


                <div style="width: 100%; text-align: right; border-top-style: inset; border-width: 1px; border-color: #003A5D">
                    <asp:LinkButton ID="btn_ConfirmaMail" runat="server" class="btn botones">
                        <span>
                            <img class="btn-enviar"/>
                            enviar
                        </span>
                    </asp:LinkButton>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

    <%--FCRUZ 10290 - Registro de terceros Datos Mínimos--%>
    <div id="mailPI" style="width: 400px; height: 220px" class="modal-catalogo">
        <div class="cuadro-titulo-flotante" style="height: 30px">
            <button type="button" id="btnClosemTer" class="close" hidden="hidden">&times;</button>
            <div>
                <label id="lbl_RegTercero">Envío de Correo Electrónico</label>
            </div>
        </div>
        <div class="modal-body" style="height: 450px">
            <asp:UpdatePanel runat="server" ID="UpdatePanel2">
                <ContentTemplate>
                    <asp:HiddenField runat="server" ID="hidOPmail" Value="" />
                    <asp:HiddenField runat="server" ID="HiddenField8" Value="" />
                    <asp:HiddenField runat="server" ID="HiddenField9" Value="" />
                    <%--<asp:Panel runat="server" ID="Panel1" Width="90%" Height="140px">--%>
                    <asp:Panel runat="server" ID="Panel1" Height="140px">
                        <div class="row">
                            <div class="col-md-12">

                                <div class="row">
                                    <div class="col-md-12">
                                        <asp:Label runat="server" class="etiqueta-control">Para</asp:Label>
                                    </div>
                                    <div class="col-md-12">
                                        <asp:TextBox runat="server" ID="txtPara" CssClass="estandar-control Tablero" placeholder="Ejemplo: correo1@gmx.com.mx ; correo2@gmx.com.mx"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <asp:Label runat="server" class="etiqueta-control">Cc</asp:Label>
                                    </div>
                                    <div class="col-md-12">
                                        <asp:TextBox runat="server" ID="txtCC" CssClass="estandar-control Tablero" placeholder="Ejemplo: correo1@gmx.com.mx ; correo2@gmx.com.mx"></asp:TextBox>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <asp:Label runat="server" class="etiqueta-control">Asunto</asp:Label>
                                    </div>
                                    <div class="col-md-12">
                                        <asp:TextBox runat="server" ID="txtAsunto" CssClass="estandar-control Tablero"></asp:TextBox>
                                    </div>
                                </div>
                                <%--<div class="row">
                                        <div class="col-md-12 padding20">
                                            <asp:HiddenField runat="server" ID="hidCodTercero" Value="0" />
                                            <asp:HiddenField runat="server" ID="hidNomTercero" Value="" />
                                            <asp:HiddenField runat="server" ID="hidrfcTercero" Value="" />
                                        </div>
                                    </div>--%>
                            </div>
                        </div>
                    </asp:Panel>
                    <div style="text-align: right;">
                        <asp:LinkButton ID="btnAcepmEmail" runat="server" class="btn botones">
                        <span>
                            <img class="btn-enviar"/>
                            Enviar
                        </span>
                        </asp:LinkButton>
                        <%--<asp:Button runat="server" ID="btnAcepmEmail" class="btn botones" Text="Enviar" />--%>
                        <asp:Button runat="server" ID="btnCancEmail" class="btn botones" Text="Cancelar" />
                        <%--<asp:Button runat="server" ID="btnCancEmail" class="btn botones" Text="Cancelar"  data-dismiss="modal" />--%>

                        <%-- <asp:LinkButton ID="btnCancela" runat="server" data-dismiss="modal" class="btn botones CierraFirma" Width="120px">
                                    <span>
                                        <img class="btn-cancelar"/>&nbspCancelar
                                    </span>
                                </asp:LinkButton>--%>
                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>

</asp:Content>


