<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false" CodeFile="CancelacionOps.aspx.vb" Inherits="Siniestros_CancelacionOps" %>
<%@ MasterType VirtualPath="~/Pages/SiteMaster.master" %>
<asp:Content ID="Content2" ContentPlaceHolderID="cph_principal" Runat="Server">
     <script src="../Scripts/Siniestros/FirmasElectronicas.js"></script>

    <script type="text/javascript"> 
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(PageLoadFirmas);
        Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(PageLoadFirmas);
    </script> 

    <div class="zona-principal" style="overflow-x:hidden;overflow-y:hidden">
        <div class="cuadro-titulo panel-encabezado">
            <input type="image" src="../Images/contraer_mini_inv.png" id="coVentana0" class="contraer"  />
            <input type="image" src="../Images/expander_mini_inv.png"   id="exVentana0" class="expandir"  />
            Filtros - Cancelación de Ordenes de Pago Tradicional
        </div>


        <div class="panel-contenido ventana0" >
            <asp:UpdatePanel runat="server" ID="upFiltros">
                <ContentTemplate>
                    <asp:HiddenField runat="server" ID="hid_Ventanas" Value="0|1|" />
                    <asp:HiddenField runat="server" ID="hid_Clave" Value="" />
                    <div class="row">
                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="20%">Orden Pago</asp:label>
                            <asp:TextBox runat="server" ID="txt_NroOP" CssClass="col-md-1 estandar-control" PlaceHolder="Ejemplo: 84162,102201" Width="80%"></asp:TextBox>
                        </div>
                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="25%">Fecha Genera</asp:label>
                            <asp:TextBox runat="server" ID="txtFechaGeneracionDesde" CssClass="col-md-1 estandar-control Fecha Centro" Width="33.2%" ></asp:TextBox>
                            <asp:label runat="server" class="col-md-1 etiqueta-control">A</asp:label>
                            <asp:TextBox runat="server" ID="txtFechaGeneracionHasta" CssClass="estandar-control Fecha Centro" Width="33.2%" ></asp:TextBox>
                        </div>
                    </div>

                    <div class="clear padding5"></div>

                    <div class="row">
                        <div class="col-md-6">
                           <asp:label runat="server" class="col-md-1 etiqueta-control" Width="20%">Siniestro</asp:label>
                            <asp:textbox runat="server" ID="txtSiniestro" CssClass="estandar-control" Width="80%" ></asp:textbox>
                        </div>
                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="25%">Elaborado por</asp:label>
                             <asp:DropDownList runat="server" ID="cmbElaborado" CssClass="col-md-1 estandar-control" Width="70%">
                            </asp:DropDownList>
                        </div>
                    </div>

                    <%--Estatus--%>

                    <div class="clear padding5"></div>

                    <div class="row">
                        <asp:UpdatePanel ID="up_Estatus" runat="server" Visible="false">
                            <ContentTemplate>
                                <div class="col-md-12">
                                    <div class="cuadro-subtitulo">

                                        <table style="width:80%">
                                            <tr>
                                                <td><asp:label runat="server" class="etiqueta-control"  Visible="false" >Estatus Orden Pago:</asp:label></td>
                                                <%--<td><asp:RadioButton runat="server" ID="chk_Todas" Text="Todas" CssClass="etiqueta-control" OnCheckedChanged="chk_Todas_CheckedChanged" Width="80px" AutoPostBack="true" /></td>--%>
                                                <td><asp:RadioButton runat="server" ID="chk_PorRevisar" Text="Por Revisar" CssClass="etiqueta-control" OnCheckedChanged="chk_PorRevisar_CheckedChanged"  Width="100px" AutoPostBack="true" Visible="false" /></td>
                                                <td><asp:RadioButton runat="server" ID="chk_Pendiente" Text="Pendientes" CssClass="etiqueta-control" OnCheckedChanged="chk_Pendiente_CheckedChanged"  Width="100px" AutoPostBack="true"  Visible="false" /></td>
                                                <td><asp:RadioButton runat="server" ID="chk_Rechazadas" Text="Rechazadas" CssClass="etiqueta-control" OnCheckedChanged="chk_Rechazadas_CheckedChanged"  Width="100px" AutoPostBack="true"  Visible="false" /></td>
                                            </tr>
                                        </table>
                                
                                    </div>

                                </div>
                            </ContentTemplate>
                        </asp:UpdatePanel>
                    </div>

                
                </ContentTemplate>
            </asp:UpdatePanel>
         </div>
    </div>  <%-- Principal--%>

        <div class="clear padding5"></div>

        <div style="width:100%; text-align:right; border-top-style:inset; border-width:1px; border-color:#003A5D">
            <asp:UpdatePanel runat="server" ID="upBusqueda">
                <ContentTemplate>
                    <asp:LinkButton id="btn_BuscaOP" runat="server" class="btn botones">
                        <span>
                            <img class="btn-buscar"/>
                            Buscar
                        </span>
                    </asp:LinkButton>

                    <asp:LinkButton id="btn_Limpiar" runat="server" class="btn botones">
                        <span>
                            <img class="btn-cancelar"/>
                            Cancelar
                        </span>
                    </asp:LinkButton>
                </ContentTemplate>
            </asp:UpdatePanel>
        </div>

        <div class="clear padding5"></div>

         <div class="cuadro-titulo panel-encabezado">
            <input type="image" src="../Images/contraer_mini_inv.png" id="coVentana1" class="contraer"  />
            <input type="image" src="../Images/expander_mini_inv.png"   id="exVentana1" class="expandir"  />
            Listado Ordenes de Pago
        </div>
        <div class="panel-contenido ventana1" >
            <asp:UpdatePanel runat="server" ID="upOrdenes" >
              <ContentTemplate>

                  <asp:HiddenField runat="server" ID="hid_rechazo" Value="0" />
                     <asp:Panel runat="server" id="pnlOrdenP" width="100%" Height="300px" ScrollBars="Vertical">
                         <asp:GridView runat="server" ID="grdOrdenPago" Width="100%" AutoGenerateColumns="false"  ShowHeader="True"
                             CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                             GridLines="None"  ShowHeaderWhenEmpty="true"
                             DataKeyNames="FolioOnbase, nro_op,	FechaGeneracion,	FechaBaja,	NumeroRecibo,	NombreSucursal,	NombreSucursalPago,	CodigoAbona,	NombreModifica,	NombreUsuario,
                                           txt_cheque_a_nom,	FechaEstimadaPago,	imp_total,	Observaciones,	NombreAbona,	Direccion,	Calle,	NumeroExterior,	NumeroInterior,
                                           Colonia,	CodigoPostal,	Municipio,	Ciudad,	Departamento,	Sector,	Transferencia,	CodigoBanco,	NombreBanco,	Swift,	Aba,	NumeroCuenta,
                                           Moneda,	txt_moneda,	CodigoAnulacion,	Concepto,	ClaveProveedor,	TipoTransferencia,	NumeroPoliza,	Contratante,	SubRamoContable,	NumeroSiniestro,
                                           ClasePago, Solicitante, Jefe, Tesoreria, Subdirector, Director, DirectorGeneral, Subgerente, NombreSolicitante,	NombreJefe, NombreTesoreria, 
                                           NombreSubdirector, NombreDirector, NombreDirectorGeneral, NombreSubgerente,	FirmaSolicitante, FirmaJefe, FirmaTesoreria, FirmaSubdirector, FirmaDirector,			
                                           FirmaDirectorGeneral, FirmaSubgerente, FirmadoSolicitante, FirmadoJefe, FirmadoTesoreria, FirmadoSubdirector, FirmadoDirector, FirmadoDirectorGeneral,FirmadoSubgerente,	FechaFirmaSolicitante,
                                           FechaFirmaJefe, FechaFirmaTesoreria ,FechaFirmaSubdirector ,FechaFirmaDirector ,FechaFirmaDirectorGeneral,FechaFirmaSubgerente, NivelAutorizacion, Preautorizada,Rechazada">

                             <Columns>
                                 <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Nro.OP">
                                        <ItemTemplate>
                                            <asp:Label ReadOnly="true" ID="nro_op_" runat="server" Text='<%# Eval("nro_op") %>'  Width="80px"></asp:Label>
                                        </ItemTemplate>
                                 </asp:TemplateField>
                                 <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Siniestro">
                                    <ItemTemplate>
                                        <asp:Label ReadOnly="true" runat="server" Text='<%# Eval("NumeroSiniestro") %>'  Width="120px"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                 <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Beneficiario">
                                    <ItemTemplate>
                                        <asp:Label ReadOnly="True" runat="server" Text='<%# Eval("txt_cheque_a_nom") %>' Width="240px"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                 <asp:TemplateField HeaderStyle-HorizontalAlign="Right" HeaderText="Monto">
                                    <ItemTemplate>
                                        <asp:Label ReadOnly="true" runat="server" Text='<%# String.Format("{0:#,#0.00}", CDbl(Eval("imp_total")))  %>' CssClass="text-right" Width="100px"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>       
                                 <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Moneda">
                                    <ItemTemplate>
                                        <asp:Label ReadOnly="true" runat="server" Text='<%# Eval("Moneda") %>'  Width="40px"></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>  
                                 <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Concepto de Cancelación">
                                    <ItemTemplate>
                                        <asp:DropDownList AutoPostBack="True" ID="cmbConcepto" runat="server" ClientIDMode="Static" OnSelectedIndexChanged="cmbConcepto_SelectedIndexChanged">
                                              <asp:ListItem Value="0" Text="--Seleccione--"></asp:ListItem>
                                            <asp:ListItem Value="1" Text="Importe incorrecto"></asp:ListItem>
                                            <asp:ListItem Value="2" Text="Error en la cuenta bancaria"></asp:ListItem>
                                            <asp:ListItem Value="3" Text="Error en el concepto de pago"></asp:ListItem> 
                                            <asp:ListItem Value="4" Text="Error en la forma de pago"></asp:ListItem>
                                            <asp:ListItem Value="5" Text="Error en la moneda de pago"></asp:ListItem>
                                            <asp:ListItem Value="6" Text="Beneficiario incorrecto"></asp:ListItem>
                                            <asp:ListItem Value="7" Text="Error en el tipo de pago"></asp:ListItem>
                                            <asp:ListItem Value="8" Text="Error en el número del Siniestro o Subsiniestro"></asp:ListItem>
                                            <asp:ListItem Value="9" Text="Siniestro improcedente de pago"></asp:ListItem>
                                            <asp:ListItem Value="10" Text="No autorizada en tiempo (vencida)"></asp:ListItem>
                                            <asp:ListItem Value="11" Text="Otros (especificar)"></asp:ListItem>
                                        </asp:DropDownList>
                                        <asp:TextBox runat="server" ID="txtOtros" CssClass="estandar-control" Font-Size="Small" Width="180px" Visible="false" ></asp:TextBox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderStyle-HorizontalAlign="Center" HeaderText="Cancelar">
                                 <ItemTemplate>
                                        <asp:CheckBox runat="server" TextAlign="Right"  ID="chkCancel" Checked='false'/>
                                 </ItemTemplate> 
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Ver OP">
                                        <ItemTemplate>
                                                <asp:imagebutton ID="btn_VerPDF" ImageUrl="~/Images/pdf14.png" Height="26" CommandName="Visualizar" CommandArgument="<%# Container.DataItemIndex %>" runat="server"/>
                                        </ItemTemplate>
                                </asp:TemplateField>
                                  <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Folio" Visible="false">
                                    <ItemTemplate>
                                        <asp:Label ReadOnly="true" runat="server" ID="folioonbase" Text='<%# Eval("FolioOnbase") %>'  Width="40px" Visible="false" ></asp:Label>
                                    </ItemTemplate>
                                </asp:TemplateField>  
                             </Columns>
                        </asp:GridView>
                    </asp:Panel>


              </ContentTemplate>
                <triggers>
                        <asp:PostBackTrigger ControlID="grdOrdenPago"></asp:PostBackTrigger>
                </triggers>
            </asp:UpdatePanel>
        </div>

         <asp:UpdatePanel runat="server" ID="upBotones">
            <ContentTemplate>
                <div class="row" style="width:100%; border-top-style:inset; border-width:1px; border-color:#003A5D">
                     <div class="col-md-4">

                            <asp:LinkButton id="btn_Firmar" runat="server" class="btn botones">
                                <span>
                                    <img class="btn-aceptar"/>
                                    Aceptar
                                </span>
                            </asp:LinkButton>

                            
                    </div>
                </div>
            </ContentTemplate>
         </asp:UpdatePanel>

        <div id="Resumen" style="width:30%" class="modal-catalogo" >
        <asp:UpdatePanel runat="server" ID="upRechazo">
            <ContentTemplate>
                <div class="cuadro-titulo" style="height:30px">
                    <button type="button" class="close"  data-dismiss="modal">&times;</button>
                    <div class="titulo-modal">Resumen de Cancelaciones de Ops</div>
                </div>

                <div class="panel-contenido">  
                    <asp:Panel runat="server" ID="Panel3" Width="100%" Height="200px" ScrollBars="Vertical">
                        <asp:GridView runat="server"  ID="gvd_Canceladas" AutoGenerateColumns="false"   DataKeyNames=""
                                        GridLines="None"  ShowHeaderWhenEmpty="true" CssClass="grid-view"
                                        HeaderStyle-CssClass="header" >
                            <Columns>
                                <asp:TemplateField HeaderText="No.Orden" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txtNoOP" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("noOP") %>' Width="100px"></asp:textbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Justificación" HeaderStyle-CssClass="Izquierda">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txtJustif" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("Justificacion") %>' Width="200px"></asp:textbox>
                                    </ItemTemplate>
                                 </asp:TemplateField>
                            </Columns>
                               
                        </asp:GridView>
                    </asp:Panel>
                </div>
                    
                 <div style="width:100%;text-align:right; border-top-style:inset; border-width:1px; border-color:#003A5D">
                 
                    <asp:LinkButton id="lnkAceptarProc" runat="server" class="btn botones">
                        <span>
                            <img class="btn-aceptar"/>
                            Aceptar
                        </span>
                    </asp:LinkButton>
                    <asp:LinkButton id="lnkCancelaProc" runat="server" data-dismiss="modal" class="btn botones CierraFirma">
                        <span>
                            <img class="btn-cancelar"/>
                            Cancelar
                        </span>
                    </asp:LinkButton>
                </div>
              
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>
     <div class="clear padding40"></div>
</asp:Content>

