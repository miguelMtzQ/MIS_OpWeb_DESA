<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false" CodeFile="OrdenPago.aspx.vb" Inherits="Siniestros_OrdenPago" %>
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
                    Solicitud de pago Tradicional
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
                                <asp:TextBox AutoPostBack="True" OnBlur="__doPostBack(this.id, '');"  ID="txtOnBase" runat="server" Text='<%# Eval("Onbase") %>' OnTextChanged="txt_TextChanged" CssClass="estandar-control onbase Tablero Centro" placeholder="Folio Onbase"></asp:TextBox>
                            </div>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Siniestro</asp:Label>
                            <asp:TextBox AutoPostBack="True" OnBlur="__doPostBack(this.id, '');" OnTextChanged="txt_TextChanged" ID="txtSiniestro" runat="server" Text='<%# Eval("Siniestro") %>' CssClass="estandar-control siniestro Tablero Centro" placeholder="Número de siniestro"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Subsiniestro</asp:Label>
                            <asp:DropDownList ID="cmbSubsiniestro" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero Centro"></asp:DropDownList>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Póliza</asp:Label>
                            <asp:TextBox ID="txtPoliza" runat="server" CssClass="estandar-control poliza Tablero Centro" ReadOnly="true" placeholder="Número de póliza"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Moneda de la póliza</asp:Label>
                            <asp:TextBox ID="txtMonedaPoliza" runat="server" Text='<%# Eval("Moneda") %>' CssClass="estandar-control onbase Tablero Centro" ReadOnly="true" placeholder="Moneda de la póliza"></asp:TextBox>
                        </div>
                    </div>

                    <div class="row">
                        <div  id="RFC" runat="server">
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">RFC</asp:Label>
                                <asp:TextBox AutoPostBack="True" ID="txtRFC" runat="server" Text='<%# Eval("OcultaCampo1") %>' CssClass="estandar-control RFC Tablero Centro" placeholder="RFC"></asp:TextBox>
                                <%--<asp:TextBox AutoPostBack="True" ID="TextBox1" runat="server" Text='<%# Eval("OcultaCampo1") %>' CssClass="estandar-control RFC Tablero Centro" OnTextChanged="txt_TextChanged" placeholder="RFC"></asp:TextBox>--%>
                            </div>
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
                            <asp:TextBox ID="txtFechaEstimadaPago" AutoPostBack="True" OnTextChanged="txt_TextChanged" runat="server" CssClass="estandar-control fechadepago Tablero Fecha Centro" autocomplete="off" placeholder="DD/MM/YYYY"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Fecha contable</asp:Label>
                            <asp:TextBox ID="txtFechaContable" OnTextChanged="txt_TextChanged" runat="server" CssClass="estandar-control fechaContable Tablero Centro" placeholder="DD/MM/YYYY" autocomplete="off" ReadOnly="true"></asp:TextBox>
                        </div>
                    </div>
                    <div id="pnlProveedor" class="row" runat="server">
                        <div class="form-group col-md-2">
                            <div class="form-check Centrado">
                                <asp:CheckBox runat="server" ID="chkVariasFacturas" Text="Varias facturas" CssClass="etiqueta-control" />
                            </div>
                        </div>
                        <div id="Comprobantes">
                            <div class="form-group col-md-2">
                                <asp:Label runat="server" class="etiqueta-control">Tipo comprobante</asp:Label>
                                <asp:DropDownList ID="cmbTipoComprobante" runat="server" ClientIDMode="Static" CssClass="estandar-control Tablero Centro" readonly="true" Enabled="false"></asp:DropDownList>
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
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Subsiniestro">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("Subsiniestro") %>' CssClass="estandar-control"></asp:TextBox>
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
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Concepto de pago">
                                                <ItemTemplate>
                                                    <asp:DropDownList AutoPostBack="True" runat="server" ClientIDMode="Static" CssClass="estandar-control concepto_pago" OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                                    </asp:DropDownList>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Clase de pago">
                                                <ItemTemplate>
                                                    <asp:DropDownList AutoPostBack="True" runat="server" Enabled="false" ClientIDMode="Static" CssClass="estandar-control clase_pago">
                                                    </asp:DropDownList>
                                                </ItemTemplate>
                                            </asp:TemplateField>                                                                                                                                    
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Pago">
                                                <ItemTemplate>
                                                    <asp:TextBox AutoPostBack="True" OnSelectedIndexChanged="cmb_SelectedIndexChanged" OnTextChanged="grid_TextChanged" runat="server" Text='<%# Eval("Pago") %>' CssClass="estandar-control pago" autocomplete="off" placeholder="0.00"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Descuentos">
                                                <ItemTemplate>
                                                    <asp:TextBox AutoPostBack="True" OnTextChanged="grid_TextChanged" runat="server" Text='<%# Eval("Descuentos") %>' CssClass="estandar-control descuentos" autocomplete="off"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="RFC">
                                                <ItemTemplate>
                                                    <asp:TextBox ReadOnly="true" runat="server" Text='<%# Eval("RFC") %>' CssClass="estandar-control"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>                                            
                                            <%--  <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Deducibles">
                                                <ItemTemplate>
                                                    <asp:TextBox AutoPostBack="True" OnTextChanged="grid_TextChanged" runat="server" Text='<%# Eval("Deducible") %>' CssClass="estandar-control deducibles" autocomplete="off"></asp:TextBox>
                                                </ItemTemplate>
                                            </asp:TemplateField>--%>
                                            <asp:TemplateField HeaderStyle-HorizontalAlign="Left" HeaderText="Tipo de pago">
                                                <ItemTemplate>
                                                   <asp:DropDownList  Autopostback="true" runat="server" ClientIDMode="Static" CssClass="estandar-control tipo_pago"  OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                                        <asp:ListItem Value="P">PARCIAL</asp:ListItem>
                                                        <asp:ListItem Value="F">FINAL</asp:ListItem>
                                                    </asp:DropDownList>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total autorización (MXN)</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalAutorizacionNacional" runat="server" Text='<%# Eval("TotalAutorizacionNacional") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
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
                     <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total Fac autorización  (MXN)</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalAutorizacionNacionalFac" runat="server" Text='<%# Eval("TotalAutorizacionNacionalFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total Fac autorización</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalAutorizacionFac" runat="server" Text='<%# Eval("TotalAutorizacionFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total Fac impuestos</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalImpuestosFac" runat="server" Text='<%# Eval("TotalImpuestosFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total Fac retenciones</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalRetencionesFac" runat="server" Text='<%# Eval("TotalRetencionesFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Total Fac</asp:Label>
                            <asp:TextBox ReadOnly="true" ID="txtTotalFac" runat="server" Text='<%# Eval("TotalFac") %>' CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
                            <asp:TextBox visible="false" ID="txtTotalNacionalFac" runat="server" CssClass="estandar-control Tablero" placeholder="0.00"></asp:TextBox>
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
                            <asp:Label runat="server" class="etiqueta-control">Concepto de orden de pago</asp:Label>
                            <asp:TextBox ID="txtConceptoOP" runat="server" Text='<%# Eval("ConceptoOP") %>' CssClass="estandar-control Tablero" ReadOnly="true" placeholder="Concepto de orden de pago"></asp:TextBox>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Origen</asp:Label>
                            <asp:DropDownList ID="cmbOrigenOP" runat="server" ClientIDMode="Static" Enabled="false" ReadOnly="true" CssClass="estandar-control Tablero"></asp:DropDownList>
                        </div>
                        <div class="form-group col-md-2">
                            <asp:Label runat="server" class="etiqueta-control">Tipo de pago</asp:Label>
                            <asp:DropDownList Autopostback="true" ID="cmbTipoPagoOP" runat="server" ClientIDMode="Static" CssClass="estandar-control tipo_pago_OP Tablero" OnSelectedIndexChanged="cmb_SelectedIndexChanged">
                                <asp:ListItem Value="C">CHEQUE</asp:ListItem>
                                <asp:ListItem Value="T">TRANSFERENCIA</asp:ListItem>
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
