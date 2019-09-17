<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false" CodeFile="OrdenPagoCTO.aspx.vb" Inherits="Siniestros_OrdenPago" %>
<%@ MasterType VirtualPath="~/Pages/SiteMaster.master" %>

<asp:Content ID="Content2" ContentPlaceHolderID="cph_principal" runat="Server">
    <asp:HiddenField runat="server" ID="hid_Ventanas" Value="1|1|0" />
    <script src="../Scripts/Siniestros/OrdenPago.js"></script>
    <style>
        .table>tbody>tr>td{
            padding: 0px;
        }

        .table>tbody>tr>td>input, .table>tbody>tr>td>select{
            border: 0px;
        }

        .chkeliminar{
            border: 0px;
        }

        .table>tbody>tr>th{
            padding: 2px;
        }

        .zona-principal{
            padding-right: 10px;
        }

        .btnEjemplo{
            margin-top: 20px;
        }

        @media (max-width:1080px){
            
            .zona-fechas{
               display:none;
            }

            .zona-form{
                padding-left:20px;
            }
        }

    </style>
    <div class="zona-principal" style="overflow-x: hidden; overflow-y: hidden">

        <asp:UpdatePanel runat="server" ID="upGenerales">
            <ContentTemplate>
                <div class="cuadro-titulo panel-encabezado">
                    <input type="image" src="../Images/contraer_mini_inv.png" id="coVentana1" class="contraer" />
                    <input type="image" src="../Images/expander_mini_inv.png" id="exVentana1" class="expandir" />
                     Solicitud de pago <asp:Label ID="lblTitulo" runat="server" Text=""></asp:Label>
                </div>
                <asp:HiddenField runat="server" ID="hid_Operacion" Value="0" />
                <div class="panel-contenido ventana1">
                    <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Pagar a</asp:Label>
                            <asp:DropDownList Autopostback="true" ID="cmbTipoUsuario" runat="server" ClientIDMode="Static" CssClass="estandar-control tipoUsuario Tablero" OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                <asp:ListItem Value="7">ASEGURADO</asp:ListItem> <%--A--%>
                                <asp:ListItem Value="8">TERCERO</asp:ListItem>   <%--T--%>
                                <asp:ListItem Value="10">PROVEEDOR</asp:ListItem> <%--P--%>
                            </asp:DropDownList>
                        </div>
                        <div id="Onbase" runat="server">
                            <div class="form-group col-md-2">
                                <asp:Label ID="lblObBase" runat="server" class="etiqueta-control">Folio Onbase</asp:Label>
                                <%--<asp:TextBox AutoPostBack="True" OnBlur="__doPostBack(this.id, '');"  ID="txtOnBase" runat="server" Text='<%# Eval("Onbase") %>' OnTextChanged="txt_TextChanged" CssClass="estandar-control onbase Tablero Centro" placeholder="Folio Onbase"></asp:TextBox>--%>
                                 <asp:TextBox AutoPostBack="True"   ID="txtOnBase" runat="server" OnTextChanged="txtOnBase_TextChanged" Text='<%# Eval("Onbase") %>' CssClass="estandar-control onbase Tablero Centro" placeholder="Folio Onbase"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Siniestro</asp:Label>
                            <%--<asp:TextBox AutoPostBack="True" OnBlur="__doPostBack(this.id, '');" OnTextChanged="txt_TextChanged" ID="txtSiniestro" runat="server" Text='<%# Eval("Siniestro") %>' CssClass="estandar-control siniestro Tablero Centro" placeholder="Número de siniestro"></asp:TextBox>--%>
                                <asp:TextBox AutoPostBack="True" ID="txtSiniestro" runat="server" OnTextChanged="txtSiniestro_TextChanged" Text='<%# Eval("Siniestro") %>' CssClass="estandar-control siniestro Tablero Centro" placeholder="Número de siniestro"></asp:TextBox>
                        </div>
                         <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Póliza</asp:Label>
                            <asp:TextBox ID="txtPoliza" runat="server" CssClass="estandar-control poliza Tablero Centro" ReadOnly="true" placeholder="Número de póliza"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Moneda de la póliza</asp:Label>
                            <asp:TextBox ID="txtMonedaPoliza" runat="server" Text='<%# Eval("Moneda") %>' CssClass="estandar-control onbase Tablero Centro" ReadOnly="true" placeholder="Moneda de la póliza"></asp:TextBox>
                        </div>
                        <div id="divconcepto" runat="server">
                            <div  class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Concepto</asp:Label>
                                <%--<asp:DropDownList ID="cmbSubsiniestro" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero Centro"></asp:DropDownList>--%>
                                <asp:DropDownList ID="cmbConcepto" AutoPostBack="True" runat="server" CssClass="estandar-control poliza Tablero Centro" OnTextChanged="txt_textChangedConcepto" placeholder="concepto"></asp:DropDownList>
                            </div>                        
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Codigo de cuenta</asp:Label>
                                <asp:TextBox ID="txtCodigoCuenta" runat="server" CssClass="estandar-control poliza Tablero Centro" ReadOnly="true" placeholder="Codigo de cuenta"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-4">
                                <asp:Label runat="server" class="etiqueta-control">Descripcion de cuenta</asp:Label>
                                <asp:TextBox ID="txtDescCuenta" runat="server" Text='<%# Eval("Moneda") %>' CssClass="estandar-control onbase Tablero Centro" ReadOnly="true" placeholder="Descripcion de cuenta"></asp:TextBox>
                            </div>
                        </div>
                        <%--<div id="divproveedor" runat="server"> --%>  
                           <%-- <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Concepto de pago</asp:Label>
                                <asp:DropDownList AutoPostBack="True" ID="cmbconceptoProveedor" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero Centro">
                                </asp:DropDownList>
                            </div>--%>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Código Proveedor</asp:Label>
                                <asp:TextBox ID="txtcod_pres" runat="server" CssClass="estandar-control Tablero Centro" ReadOnly="true" placeholder="Código de tercero, proveedor o asegurado"></asp:TextBox>
                            </div>
                        <%--</div>--%>
                    </div>
                    <div class="row">                        
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">RFC</asp:Label>
                            <asp:TextBox ID="txtRFC" runat="server" Text='<%# Eval("RFC") %>' CssClass="estandar-control Tablero Centro" placeholder="RFC"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Código</asp:Label>
                            <asp:TextBox ID="txtCodigoBeneficiario_stro" runat="server" CssClass="estandar-control Tablero Centro" ReadOnly="true" placeholder="Código de tercero, proveedor o asegurado"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-4">
                            <asp:Label runat="server" class="etiqueta-control">Nombre / Razón social</asp:Label>
                            <asp:TextBox ID="txtBeneficiario_stro" runat="server" Text='<%# Eval("Nombre") %>' CssClass="estandar-control Tablero Centro" autocomplete="off" placeholder="Nombre o razón social"></asp:TextBox>
                        </div>                         
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Moneda de pago</asp:Label>
                            <asp:DropDownList AutoPostBack="True" ID="cmbMonedaPago" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero Centro" OnSelectedIndexChanged="CalcularTotales">
                                <asp:ListItem Value="0">NACIONAL</asp:ListItem>
                                <asp:ListItem Value="1">DOLAR AMERICANO</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Tipo de cambio</asp:Label>
                            <asp:TextBox ID="txtTipoCambio" runat="server" CssClass="estandar-control Tablero Centro" ReadOnly="true" placeholder="1.00"></asp:TextBox>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Fecha de registro</asp:Label>
                            <asp:TextBox ID="txtFechaRegistro" runat="server" CssClass="estandar-control Tablero Centro" placeholder="DD/MM/YYYY" autocomplete="off" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Fecha estimada de pago</asp:Label>
                            <asp:TextBox ID="txtFechaEstimadaPago" runat="server" CssClass="estandar-control Tablero Fecha Centro" autocomplete="off" placeholder="DD/MM/YYYY"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Fecha contable</asp:Label>
                            <%--<asp:TextBox ID="txtFechaContable" OnTextChanged="txt_TextChanged" runat="server" CssClass="estandar-control fechaContable Tablero Centro" placeholder="DD/MM/YYYY" autocomplete="off" ReadOnly="true"></asp:TextBox>--%>
                            <asp:TextBox ID="txtFechaContable" runat="server" CssClass="estandar-control fechaContable Tablero Centro" placeholder="DD/MM/YYYY" autocomplete="off" ReadOnly="true"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">D/C</asp:Label>
                            <asp:DropDownList ID="cmbDebitoCredito" runat="server" Enabled="false" ClientIDMode="Static" CssClass="estandar-control Tablero">
                                <asp:ListItem Value="D">Debito</asp:ListItem>
                                <asp:ListItem Value="C">Credito</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Analista Solicitante</asp:Label>
                            <asp:DropDownList ID="cmbAnalistaSolicitante" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero">
                                <asp:ListItem Value="AARROYO">ANDREA ARROYO URIOSTEGUI</asp:ListItem>
                                <asp:ListItem Value="RMARTINEZ">ADRIÁN ROGELIO MARTINEZ PELAEZ</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                    </div>
                    <div id="pnlProveedor" class="row" runat="server">
                        <div class="form-group col-md-2">
                            <div class="form-check Centrado">
                                <asp:CheckBox runat="server" ID="chkVariosConceptos" Text="Varios Conceptos" CssClass="etiqueta-control" />
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <div class="form-check Centrado">
                                <asp:CheckBox runat="server" ID="chkVariasFacturas" Text="Varias Facturas" CssClass="etiqueta-control" />
                            </div>
                        </div>
                        <div id="Comprobantes">
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Nro Factura</asp:Label>
                                <asp:TextBox ID="txtidfactura" runat="server" CssClass="estandar-control onbase Tablero Centro" ReadOnly="true" placeholder="Fecha del Documento"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Tipo Documento</asp:Label>
                                    <asp:DropDownList AutoPostBack="True" ID="cmbTipoDocumento" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero Centro">
                                    <asp:ListItem Value="10">Factura</asp:ListItem>
                                </asp:DropDownList>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Número comprobante</asp:Label>
                                <asp:TextBox ID="txtNumeroComprobante" runat="server" Text='<%# Eval("NumeroComprobante") %>' CssClass="estandar-control Tablero Centro" readonly="true"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Fecha comprobante</asp:Label>
                                <asp:TextBox ID="txtFechaComprobante" runat="server" Text='<%# Eval("FechaComprobante") %>' CssClass="estandar-control Tablero Fecha Centro" autocomplete="off" readonly="true"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                    <div id="divauto_nes_varias" runat="server">
                        <div style="width: 100%; text-align: left">
                        <asp:LinkButton ID="btnAgregarFila" runat="server" class="btn btn-primary btn-xs" style="background-color: #003A5D;" OnClientClick="return ValidarBeneficiario();">
                            <span>
                                <img class="btn-añadir"/> AÑADIR REGISTRO
                            </span>
                        </asp:LinkButton>
                        <asp:LinkButton ID="btnQuitarFila" runat="server" class="btn btn-danger btn-xs">
                            <span>
                                <img class="btn-eliminar"/> QUITAR REGISTRO
                            </span>
                        </asp:LinkButton>
                        </div>                  
                    <div class="row">
                        <div class="panel-contenido ventana2">
                            <div class="panel-subcontenido">
                                <asp:Panel runat="server"  Width="100%" Height="100px" ScrollBars="Both">
                                    <asp:GridView ID="grd" runat="server" DataKeyNames="Siniestro" AutoGenerateColumns="false" 
                                        CssClass="table grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                        OnRowDeleting="grd_RowDeleting" OnRowDataBound="grd_RowDataBound"
                                        GridLines="Vertical"  ShowHeaderWhenEmpty="true">
                                        <Columns>
                                            <asp:BoundField DataField="RowNumber" HeaderText="Número fila" Visible="false" />
                                            <asp:TemplateField HeaderText="">
                                                <ItemTemplate>
                                                    <asp:CheckBox ID="eliminar" runat="server" CssClass="estandar-control chkeliminar" />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Folio Onbase">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("FolioOnbase") %>' CssClass="estandar-control factura"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Factura">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("Factura") %>' CssClass="estandar-control factura"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Siniestro">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("Siniestro") %>' CssClass="estandar-control"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="RFC">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("RFC") %>' CssClass="estandar-control"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Póliza" Visible="false">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("Poliza") %>' CssClass="estandar-control poliza"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Moneda">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("Moneda") %>' CssClass="estandar-control"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Clase de pago">
                                                <ItemTemplate>
                                                     <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("ClasePago") %>' CssClass="estandar-control"></asp:TextBox>
                                                    <%--<asp:DropDownList AutoPostBack="True" runat="server" ClientIDMode="Static" CssClass="estandar-control clase_pago" OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                                    </asp:DropDownList>--%>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Concepto de pago">
                                                <ItemTemplate>
                                                     <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("ConceptoPago") %>' CssClass="estandar-control"></asp:TextBox>
                                                    <%--<asp:DropDownList AutoPostBack="True" runat="server" ClientIDMode="Static" CssClass="estandar-control concepto_pago" OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                                    </asp:DropDownList>--%>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Origen Pago">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("OrigenPago") %>' CssClass="estandar-control pago"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Pago">
                                                <ItemTemplate>
                                                    <asp:TextBox AutoPostBack="True" OnTextChanged="grid_TextChanged" runat="server" Text='<%# Eval("Pago") %>' CssClass="estandar-control pago" autocomplete="off" placeholder="0.00"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Deducibles">
                                                <ItemTemplate>
                                                    <asp:TextBox AutoPostBack="True" OnTextChanged="grid_TextChanged" runat="server" Text='<%# Eval("Deducible") %>' CssClass="estandar-control deducibles" autocomplete="off"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Sub Total">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("SubTotal") %>' CssClass="estandar-control"></asp:TextBox>
                                                   <%--<asp:DropDownList  Autopostback="true" runat="server" ClientIDMode="Static" CssClass="estandar-control tipo_pago"  OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                                        <asp:ListItem Value="P">PARCIAL</asp:ListItem>
                                                        <asp:ListItem Value="F">FINAL</asp:ListItem>
                                                    </asp:DropDownList>--%>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="row"><%--importes de la poliza --%> 
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Importes en Moneda de la Póliza</asp:Label>                            
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total autorización</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalAutorizacion" runat="server" Text='<%# Eval("TotalAutorizacion") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total impuestos</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalImpuestos" runat="server" Text='<%# Eval("TotalImpuestos") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total retenciones</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalRetenciones" runat="server" Text='<%# Eval("TotalRetenciones") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotal" runat="server" Text='<%# Eval("Total") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            <asp:TextBox visible="false" ID="txtTotalNacional" runat="server" CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                    </div>
                          <%--importe del pago--%> 
                <div class="row">   
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Importes en Moneda del Pago</asp:Label>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:TextBox ReadOnly="true" ID="iptxtTotalAutorizacion" runat="server"  CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:TextBox ReadOnly="true" ID="iptxtTotalImpuestos" runat="server"  CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:TextBox ReadOnly="true" ID="iptxtTotalRetenciones" runat="server"  CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:TextBox ReadOnly="true" ID="iptxtTotal" runat="server"  CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            <asp:TextBox visible="false" ID="iptxtTotalNacional" runat="server" CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>                        
                    </div>
                     
                    <%--importes de la Factura--%> 
                    <div id="Facturas0" runat="server">
                        <div  class="row">
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Importes de las Facturas Relacionadas</asp:Label>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control"> </asp:Label>
                                <asp:TextBox ReadOnly="true" ID="txtTotalAutorizacionFac" runat="server" Text='<%# Eval("TotalAutorizacionFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control"></asp:Label>
                                <asp:TextBox ReadOnly="true" ID="txtTotalImpuestosFac" runat="server" Text='<%# Eval("TotalImpuestosFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control"></asp:Label>
                                <asp:TextBox ReadOnly="true" ID="txtTotalRetencionesFac" runat="server" Text='<%# Eval("TotalRetencionesFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control"></asp:Label>
                                <asp:TextBox ReadOnly="true" ID="txtTotalFac" runat="server" Text='<%# Eval("TotalFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                                <asp:TextBox visible="false" ID="txtTotalNacionalFac" runat="server" CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            </div>
                        </div>
                    </div>
                     <div id="Facturas1" runat="server">
                         <div  class="row">
                             <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control"></asp:Label>                            
                            </div>                         
                              <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Descuentos</asp:Label>
                                <asp:TextBox ReadOnly="true" ID="txtDescuentos" runat="server" Text='<%# Eval("TotalAutorizacionNacionalFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            </div>
                             <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">SubTotal</asp:Label>
                                <asp:TextBox ReadOnly="true" ID="txtTotalAutorizacionNacionalFac" runat="server" Text='<%# Eval("TotalRetenciones") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            </div>
                            <div class="form-group col-md-2">
                                <asp:Label ID="lbldescuento" runat="server" ForeColor="Red" class="etiqueta-control"></asp:Label>                            
                            </div>
                        </div>
                     </div> 
                </div>
                <div class="cuadro-titulo panel-encabezado">
                    <input type="image" src="../Images/contraer_mini_inv.png" id="coVentana2" class="contraer" />
                    <input type="image" src="../Images/expander_mini_inv.png" id="exVentana2" class="expandir" />
                    Orden de pago
                </div>
                <asp:HiddenField runat="server" ID="oBancoT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oSucursalT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oBeneficiarioT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oMonedaT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oTipoCuentaT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oCuentaBancariaT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oPlazaT_stro" Value="" />
                <asp:HiddenField runat="server" ID="oAbaT_stro" Value="" />
                <div class="panel-contenido ventana2">
                    <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Sucursal</asp:Label>
                            <asp:DropDownList readonly="true" ID="cmbSucursal" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero">
                                <asp:ListItem Value="1">CIUDAD DE MEXICO</asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="form-group col-md-4">
                            <asp:Label runat="server" class="etiqueta-control">Beneficiario</asp:Label>
                            <asp:TextBox ID="txtBeneficiario" runat="server" CssClass="estandar-control Tablero Centro" ReadOnly="true" placeholder="Beneficiario"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-6">
                            <asp:Label runat="server" class="etiqueta-control">Descripcion Orden de pago</asp:Label>
                            <asp:TextBox ID="txtDescripcionOP" runat="server" Text='<%# Eval("ConceptoOP") %>' CssClass="estandar-control Tablero" ReadOnly="true" placeholder="Descripcion de orden de pago"></asp:TextBox>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Origen de pago</asp:Label>
                            <asp:DropDownList ID="cmbOrigendePago" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero"></asp:DropDownList>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Tipo de pago</asp:Label>
                            <asp:DropDownList Autopostback="true" ID="cmbTipoPagoOP" runat="server" ClientIDMode="Static" CssClass="estandar-control tipo_pago_OP Tablero" OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                <asp:ListItem Value="0">CHEQUE</asp:ListItem>
                                <asp:ListItem Value="-1">TRANSFERENCIA</asp:ListItem>
                            </asp:DropDownList>
                        </div>  
                        <div class="form-group col-md-2">
                            <div style="width: 100%; text-align: left; margin-top: 14px;">
                                <asp:LinkButton ID="btnVerCuentas" runat="server" class="btn btn-primary btn-xs" style="background-color: #003A5D;">
                                    <span>
                                        <img class="btn-añadir"/> VER CUENTAS
                                    </span>
                                </asp:LinkButton>
                            </div>
                        </div>        
                                        
                    </div>
                    <div style="width:100%; text-align: left">
                                <asp:LinkButton ID="btnGrabarOP" runat="server" class="btn btn-primary btn-sm" style="background-color: #006AA9;">
                                    <span>
                                        <img class="btn-guardar"/> GENERAR OP
                                    </span>
                                </asp:LinkButton>
                            </div>
                    <div style="width:100%; text-align: right">
                                <asp:LinkButton ID="btnLimpiar" runat="server" class="btn btn-primary btn-sm" style="background-color: #006AA9;">
                                    <span>
                                        <img class="btn-limpiar"/> LIMPIAR
                                    </span>
                                </asp:LinkButton>
                     </div>
                    
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
        <br /><br />
    </div>

</asp:Content>
