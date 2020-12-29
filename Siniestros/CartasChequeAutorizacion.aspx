<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false" CodeFile="CartasChequeAutorizacion.aspx.vb" Inherits="Siniestros_CartasChequeAutorizacion" %>

<%@ MasterType VirtualPath="~/Pages/SiteMaster.master" %>

<asp:Content ID="Content2" ContentPlaceHolderID="cph_principal" runat="Server">
    <script src="../Scripts/Siniestros/CartasChequeAutorizacion.js"></script>


    <div class="zona-principal" style="overflow-x: hidden; overflow-y: hidden">

        <div class="cuadro-titulo panel-encabezado">
            <input type="image" src="../Images/contraer_mini_inv.png" id="coVentana0" class="contraer" />
            <input type="image" src="../Images/expander_mini_inv.png" id="exVentana0" class="expandir" />
            Filtros - Cartas Cheque Autorización
        </div>

        <div class="panel-contenido ventana0">
            <asp:UpdatePanel runat="server" ID="upFiltros">
                <ContentTemplate>
                    <asp:HiddenField runat="server" ID="hid_Ventanas" Value="0|1" />
                    <div class="padding10"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <asp:Label runat="server" class="col-md-1 etiqueta-control" Width="20%">Folio Carta</asp:Label>
                            <asp:TextBox runat="server" ID="txt_folio_carta" CssClass="col-md-1 estandar-control" Width="36%" onkeypress="return soloNumeros(event)" PlaceHolder="Ej: 10"></asp:TextBox>
                        </div>

                        <div class="col-md-6">
                        </div>
                    </div>

                    <div class="clear padding5"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <asp:Label runat="server" class="col-md-1 etiqueta-control" Width="20%">Num OP</asp:Label>
                            <asp:TextBox runat="server" ID="txt_nro_op" CssClass="col-md-1 estandar-control" Width="36%" onkeypress="return soloNumeros(event)" PlaceHolder="Ej: 84162"></asp:TextBox>

                            <asp:Label runat="server" class="col-md-1 etiqueta-control">A</asp:Label>
                            <asp:TextBox runat="server" ID="txt_nro_op_hasta" CssClass="col-md-1 estandar-control" Width="35.5%" onkeypress="return soloNumeros(event)" PlaceHolder="Núm OP hasta"></asp:TextBox>
                        </div>

                        <div class="col-md-6">
                            <asp:Label runat="server" class="col-md-1 etiqueta-control" Width="25%">Num Cheque</asp:Label>
                            <asp:TextBox runat="server" ID="txt_nro_ch_desde" CssClass="col-md-1 estandar-control" Width="33.2%" onkeypress="return soloNumeros(event)" PlaceHolder="Núm cheque desde"></asp:TextBox>

                            <asp:Label runat="server" class="col-md-1 etiqueta-control">A</asp:Label>
                            <asp:TextBox runat="server" ID="txt_nro_ch_hasta" CssClass="col-md-1 estandar-control" Width="33.2%" onkeypress="return soloNumeros(event)" PlaceHolder="Núm cheque hasta"></asp:TextBox>
                        </div>
                    </div>

                    <div class="clear padding5"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <asp:Label runat="server" class="col-md-2 etiqueta-control" Width="20%">Siniestro</asp:Label>
                            <asp:TextBox runat="server" ID="txt_nro_stro" CssClass="col-md-1 estandar-control" PlaceHolder="Ej: 201308131" Width="80%" onkeypress="return soloNumeros(event)"></asp:TextBox>
                        </div>

                        <div class="col-md-6">
                            <asp:Label runat="server" class="col-md-1 etiqueta-control " Width="25%">Beneficiario</asp:Label>
                            <asp:TextBox runat="server" ID="txt_cheque_a_nom" CssClass="col-md-1 estandar-control" Width="75%" PlaceHolder="Ej: banco" OnFocusOut="convMayusculas('txt_cheque_a_nom')"></asp:TextBox>
                        </div>
                    </div>

                    <div class="clear padding20"></div>

                    <div class="row cuadro-subtitulo"  style="text-align: center">
                        <div class="col-md-3"></div>
                        <div class="col-md-6" style="text-align: center">
                                <table style="width:100%; text-align:center">
                                    <tr>
                                        <td></td>
                                        <td><asp:label runat="server" class="etiqueta-control">Estatus:</asp:label></td>                                                                            
                                        
                                        <td><asp:RadioButton runat="server" ID="chk_Todas" Text="&nbspTodas" CssClass="etiqueta-control" Width="100px" AutoPostBack="true" OnCheckedChanged="chk_Todas_CheckedChanged"/></td>
                                        <td><asp:RadioButton runat="server" ID="chk_Pendientes" Text="&nbspPendientes" CssClass="etiqueta-control" Width="160px" AutoPostBack="true" OnCheckedChanged="chk_Pendientes_CheckedChanged" /></td>                                      
                                        <td><asp:RadioButton runat="server" ID="chk_Autorizadas"  Text="&nbspAutorizadas" CssClass="etiqueta-control" Width="100px" AutoPostBack="true" OnCheckedChanged="chk_Autorizadas_CheckedChanged" /></td>                                                                               
                                        <td><asp:RadioButton runat="server" ID="chk_Rechazadas"  Text="&nbspRechazadas" CssClass="etiqueta-control" Width="100px" AutoPostBack="true" OnCheckedChanged="chk_Rechazadas_CheckedChanged" /></td>                                                                               
                                    </tr>
                                </table>
                                
                            </div>
                        <div class="col-md-3"></div>
                    </div>

                    <div class="padding5"></div>

                    

                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>

    <div style="width: 100%; text-align: right;">
        <div class="padding10">
            <asp:UpdatePanel runat="server" ID="upBusqueda">
                <ContentTemplate>
                    <asp:LinkButton ID="btn_BuscarOP" runat="server" class="btn botones" BorderWidth="2" BorderColor="White" Width="105px">
                        <span>
                            <img class="btn-buscar"/>&nbsp Buscar
                        </span>
                    </asp:LinkButton>
                    <asp:LinkButton ID="btnLimpiar" runat="server" class="btn botones" BorderWidth="2" BorderColor="White" Width="130px">
                        <span>
                            <img class="btn-limpiar"/>&nbsp&nbsp Limpiar Filtros
                        </span>
                    </asp:LinkButton>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>
    </div>

    <div class="padding20">
        <asp:UpdatePanel runat="server" ID="updGrd" UpdateMode="Conditional" Width="25%">
            <ContentTemplate>
                <asp:Panel runat="server" ID="pnlUsuario" Width="99%" Height="280" ScrollBars="Auto">
                   <%-- <asp:GridView ID="grd" runat="server" AutoGenerateColumns="False" CssClass="table-condensed table-hover" HeaderStyle-CssClass="header" GridLines="Vertical" ShowHeaderWhenEmpty="True" OnRowCommand="grd_RowCommand" DataKeyNames="folio_carta" HorizontalAlign="Center" Font-Size="11px" Height="35px" >
                  --%>
                    <asp:GridView ID="grd" runat="server" AutoGenerateColumns="False" CssClass="table grid-view table-condensed" HeaderStyle-CssClass="header" GridLines="Vertical" ShowHeaderWhenEmpty="True" OnRowCommand="grd_RowCommand" DataKeyNames="folio_carta" HorizontalAlign="Center" AlternatingRowStyle-CssClass="altern" Font-Size="11px" Height="35px" >
                         
                        <Columns>
                            <asp:TemplateField HeaderText="" ItemStyle-HorizontalAlign="Center" ShowHeader="False">
                                <ItemTemplate>
                                    <%--<asp:CheckBox ID="CheckBox1" runat="server" Checked="False" Enabled='<%# Eval("chk") %>' />--%>
                                    <asp:CheckBox ID="CheckBox1" runat="server" Checked="False" Enabled='False' />
                                </ItemTemplate>
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:TemplateField>

                            <asp:BoundField DataField="folio_carta" HeaderText="FOLIO" Visible="false" InsertVisible="False">
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                            </asp:BoundField>

                            <asp:BoundField DataField="folio_carta_gmx" HeaderText="FOLIO CARTA">
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                            </asp:BoundField>

                            <asp:BoundField DataField="imp_total" HeaderText="MONTO TOTAL" DataFormatString="{0:N2}" HeaderStyle-HorizontalAlign="Center">
                                <HeaderStyle Font-Size="12px" />
                                <ItemStyle HorizontalAlign="Right" VerticalAlign="Middle" />
                            </asp:BoundField>
                            
                            
                            <asp:BoundField DataField="txt_empresa" HeaderText="DESPACHO O EMPRESA DE DONDE VIENE" >
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center"  Wrap="True" />
                                <ItemStyle HorizontalAlign="Left" VerticalAlign="Middle" Wrap ="true" />
                            </asp:BoundField>

                            <asp:BoundField DataField="fecha_creacion" HeaderText="FECHA GENERADA" DataFormatString="{0:dd/MM/yyyy}">
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                            </asp:BoundField>

                            <asp:BoundField DataField="status" HeaderText="NUM_STATUS" Visible="false">
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                            </asp:BoundField>

                            <asp:BoundField DataField="txt_status" HeaderText="ESTADO">
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                            </asp:BoundField>

                            <asp:BoundField DataField="motivo_rechazo" HeaderText="MOTIVO RECHAZO">
                                <HeaderStyle Font-Size="12px" HorizontalAlign="Center" />
                                <ItemStyle HorizontalAlign="Center" VerticalAlign="Middle" />
                            </asp:BoundField>

                            <asp:TemplateField HeaderText="ACCION">
                                <ItemTemplate>
                                    <asp:DropDownList runat="server" ID="dropEstado" AutoPostBack="true" OnSelectedIndexChanged="dropEstado_SelectedIndexChanged" Enabled='<%# Eval("chk") %>'>
                                        <asp:ListItem Text="...." Value="1" Selected="true" />
                                        <asp:ListItem Text="Autorizada" Value="2" />
                                        <asp:ListItem Text="Rechazada" Value="3" />
                                    </asp:DropDownList>
                                    <div class="padding10"></div>
                                    <asp:Label runat="server" ID="lbl_mot_rech" Visible="false" Width="100%" Text="Motivo del Rechazo" />
                                    <%--<asp:TextBox runat="server" ID="txt_mot_rech" onblur = "return txtlen ();" Visible="false" Width="250px" Height="20px" AutoPostBack="true" 
OnTextChanged="txt_mot_rech_TextChanged"></asp:TextBox>--%>
                                    <div class="padding10"></div>
                                    <asp:TextBox runat="server" ID="txt_mot_rech" Visible="false" Width="150px" Height="20px"></asp:TextBox>
                                </ItemTemplate>
                                <ItemStyle HorizontalAlign="Center" />
                                <HeaderStyle Font-Size="12px" />
                            </asp:TemplateField>

                            <asp:ButtonField Text="" HeaderText="VER CARTA" CommandName="RepCarta" ButtonType="Image" ImageUrl="../Images/buscar_mini_inv.png" ItemStyle-HorizontalAlign="Center">
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:ButtonField>
                        </Columns>

                        <HeaderStyle CssClass="header" />
                        <RowStyle Height="28px" BorderStyle="Solid" BorderWidth="1px" />
                    </asp:GridView>
                    <div style="width: 100%; text-align: right;" class="padding10"></div>
                </asp:Panel>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="btn_BuscarOP" EventName="Click" />
                <%--<asp:AsyncPostBackTrigger ControlID="btn_Todas" EventName="Click" />
                <asp:AsyncPostBackTrigger ControlID="btn_Ninguna" EventName="Click" />--%>
            </Triggers>
        </asp:UpdatePanel>
    </div>



    <div class="padding20">
        <asp:UpdatePanel runat="server" ID="upPanelGenCartas" Width="99%" UpdateMode="Conditional">
            <ContentTemplate>
                <asp:Panel runat="server" ID="PanelGenCartas" HorizontalAlign="Right">
                    <div class="row" style="width: 100%">
                        <div class="col-md-1"></div>
                        <div class="col-md-5">
                            <div style="width: 100%; text-align: left">
                                <%-- Se comenta para los ajustes de cartas cheque, ya que se irán seleccionando conforme se elija el control de acción --%>
                               <%-- <asp:LinkButton ID="btn_Todas" runat="server" class="btn botones Centrado" BorderWidth="2" BorderColor="White" Width="105px" Visible="false">
                                    <span>
                                        <img class="btn-todos"/>&nbsp Todas
                                    </span>
                                </asp:LinkButton>

                                <asp:LinkButton ID="btn_Ninguna" runat="server" class="btn botones Centrado" BorderWidth="2" BorderColor="White" Width="105px" Visible="false">
                                    <span>
                                        <img class="btn-ninguno"/>&nbsp Ninguna
                                    </span>
                                </asp:LinkButton>--%>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div style="text-align: right">
                                <asp:LinkButton ID="btnAutorizar" runat="server" class="btn botones Centrado" BorderWidth="2" BorderColor="White" Width="110px" Visible="false">
                              <span>
																<img class="btn-modificar"/>&nbsp Continuar
														</span>
                                </asp:LinkButton>
                            </div>
                        </div>
                    </div>
                    <div class="padding10" />
                </asp:Panel>
            </ContentTemplate>
            <Triggers>
                <asp:AsyncPostBackTrigger ControlID="btn_BuscarOP" EventName="Click" />
            </Triggers>
        </asp:UpdatePanel>        
    </div>

    <div class="padding53"></div>
    

    <div id="Resumen" style="width: 30%; height:500px" class="modal-catalogo">
        <asp:UpdatePanel runat="server" ID="upRechazo">
            <ContentTemplate>
                <div class="cuadro-titulo" style="height: 25px">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <div class="padding4"></div>
                    <div class="titulo-modal padding3">Resumen de Autorizaciones y Rechazos de Cartas Cheque</div>
                </div>
                <div class="panel-contenido">
                    <asp:Label runat="server" Text="PARA AUTORIZAR" Font-Bold="true"></asp:Label>
                    <asp:Panel runat="server" ID="Panel2" Width="100%" Height="160px" ScrollBars="Vertical">
                        <asp:GridView runat="server" ID="gvd_Autorizadas" AutoGenerateColumns="false" DataKeyNames=""
                            GridLines="None" ShowHeaderWhenEmpty="true" CssClass="grid-view"
                            HeaderStyle-CssClass="header">
                            <Columns>
                                <asp:TemplateField HeaderText="&nbspAUTORIZADAS - No. FOLIO&nbsp&nbsp" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:TextBox runat="server" ID="folioCarta" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("folioCarta") %>' Width="100%" Font-Size="12px" Style="text-align: center"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </asp:Panel>
                    <asp:Label runat="server" Text="PARA CANCELAR" Font-Bold="true"></asp:Label>
                    <div class="padding20"></div>
                    <asp:Panel runat="server" ID="Panel3" Width="100%" Height="160px" ScrollBars="Vertical">
                        <asp:GridView runat="server" ID="gvd_Rechazadas" AutoGenerateColumns="false" DataKeyNames=""
                            GridLines="None" ShowHeaderWhenEmpty="true" CssClass="grid-view"
                            HeaderStyle-CssClass="header">
                            <Columns>
                                <asp:TemplateField HeaderText="&nbsp RECHAZADAS - No. FOLIO&nbsp&nbsp" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:TextBox runat="server" ID="folioCartaCh" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("folioCarta") %>' Width="100%" Font-Size="12px" Style="text-align: center"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="JUSTIFICACIÓN" HeaderStyle-CssClass="Centrado">
                                    <ItemTemplate>
                                        <asp:TextBox runat="server" ID="txtJustif" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("motRechazo") %>' Width="200px" Font-Size="12px" Style="text-align: center"></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </asp:Panel>
                </div>
                <asp:HiddenField runat="server" ID="hid_Token" Value="0" />
                <asp:Label runat="server" ID="lblToken" CssClass="estandar-control Tablero Izquierda" Text="Capture número de token para autorizar" Font-Bold="True" Font-Size="11px"></asp:Label>
                <asp:TextBox runat="server" ID="txtToken" Width="150px" Height="20px" CssClass="col-md-1 estandar-control" onkeypress="return soloNumeros(event)" Style="text-align: center"></asp:TextBox>

                <div class="padding30"></div>
                <div style="width: 100%; text-align: left;">
                    <asp:LinkButton ID="btnGenToken" runat="server" class="btn botones hover-state" BorderWidth="2" BorderColor="White" Width="150px">
                        <span>
                            <img class="btn-aceptar"/>
                            Generar Token
                        </span>
                    </asp:LinkButton>
                </div>
                <div style="width: 100%; text-align: right; border-top-style: inset; border-width: 1px; border-color: #003A5D">
                    <asp:LinkButton ID="lnkAceptarProc" runat="server" class="btn botones hover-state" BorderWidth="2" BorderColor="White" Width="105px">
                        <span>
                            <img class="btn-aceptar"/>
                            Aceptar
                        </span>
                    </asp:LinkButton>
                    <asp:LinkButton ID="lnkCancelaProc" runat="server" data-dismiss="modal" class="btn botones CierraFirma" BorderWidth="2" BorderColor="White" Width="105px">
                        <span>
                            <img class="btn-cancelar"/>
                            Cancelar
                        </span>
                    </asp:LinkButton>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
        <div class="padding100"></div>
    </div>

    <div id="modProcesado" class="modal-catalogo">
        <div class="cuadro-titulo-flotante">
            <div class="padding5"></div>
            <button type="button" data-dismiss="modal" class="close" hidden="hidden">&times;</button>
            <div>
                <label id="lbl_aut">Cartas Cheque</label>
            </div>
            <div class="padding5"></div>
        </div>
        <div class="padding5"></div>
        <asp:UpdatePanel runat="server" ID="UpdatePanel1">
            <ContentTemplate>
                <div class="input-group">
                    <br />
                    <div class="padding10"></div>
                    <asp:Label runat="server" class="col-md-12 etiqueta-control" Font-Size="13px">Autorización y/o Rechazo de Cartas cheque exitoso.
                    </asp:Label>
                    <div class="padding30"></div>
                    <br />
                    <br />
                </div>
                <asp:Panel runat="server" ID="PangrdProc" Width="100%" Height="200px" ScrollBars="Vertical">
                    <asp:GridView runat="server" ID="grdProc" AutoGenerateColumns="false" DataKeyNames=""
                        GridLines="None" ShowHeaderWhenEmpty="true" CssClass="grid-view"
                        HeaderStyle-CssClass="header">
                        <Columns>
                            <asp:TemplateField HeaderText="No. FOLIO" HeaderStyle-CssClass="Centrado">
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="gtxt_foliogmx" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("foliogmx") %>' Width="100%" Font-Size="12px" Style="text-align: center"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="ESTADO" HeaderStyle-CssClass="Centrado">
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="gtxt_status" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("status") %>' Width="200px" Font-Size="12px" Style="text-align: center"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>

                            <asp:TemplateField HeaderText="" HeaderStyle-CssClass="Centrado">
                                <ItemTemplate>
                                    <asp:TextBox runat="server" ID="gtxt_process" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("process") %>' Width="200px" Font-Size="12px" Style="text-align: center"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateField>

                        </Columns>
                    </asp:GridView>
                </asp:Panel>
                <div style="width: 100%; text-align: right;">
                    <asp:Button runat="server" ID="btnProcesado" class="btn botones" Text="Aceptar" />
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

    <%-- <div id="modMotRechazo" class="modal-catalogo">
        <div class="cuadro-titulo-flotante">
            <button type="button" data-dismiss="modal" class="close" hidden="hidden">&times;</button>
        <div>
                <label id="lbl_Catalogo">Motivo Rechazo</label></div>
        </div>
        <div class="clear padding5"></div>
        <asp:UpdatePanel runat="server" ID="upCatalogo">
            <ContentTemplate>
                <div class="input-group">
                    <br />
                     <br /> <br />
                    <asp:Label runat="server" class="col-md-12 etiqueta-control">El campo motivo de rechazo es obligatorio</asp:Label>                    
                    <br />
                     <br />
                    <br />
                </div>
                <div style="width: 100%; text-align: right;">
                    <asp:Button runat="server" ID="btnModAcept" data-dismiss="modal" class="btn botones" Text="Aceptar" />
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>--%>

    
</asp:Content>

