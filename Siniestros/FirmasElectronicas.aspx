<%@ Page Title="" Language="VB" MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false" CodeFile="FirmasElectronicas.aspx.vb" Inherits="Siniestros_FirmasElectronicas" %>

<%@ Register Assembly="System.Web.DataVisualization, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI.DataVisualization.Charting" TagPrefix="asp" %>
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
            Filtros
        </div>

        <div class="panel-contenido ventana0" >
            <asp:UpdatePanel runat="server" ID="upFiltros">
                <ContentTemplate>
                    <asp:HiddenField runat="server" ID="hid_Ventanas" Value="0|1|1|1|1|1|1|1|" />
                    <asp:Timer ID="tim_Actualizacion" runat="server" Enabled="false" Interval="600000"></asp:Timer>
                    <div class="row">
                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="20%">Orden Pago</asp:label>
                            <asp:TextBox runat="server" ID="txt_NroOP" CssClass="col-md-1 estandar-control" PlaceHolder="Ejemplo: 84162,102201" Width="30%"></asp:TextBox>
                             <asp:label runat="server" class="col-md-1 etiqueta-control" Width="14%">Módulo</asp:label>
                            <asp:DropDownList runat="server" ID="cmbModuloOP" CssClass="col-md-1 estandar-control" Width="36%">
                                <asp:ListItem Text="Seleccione módulo" Value="0"></asp:ListItem>
                                <asp:ListItem Text="Ordenes de pago de siniestros" Value="1"></asp:ListItem>
                                <asp:ListItem Text="Autorizaciones varias" Value="2"></asp:ListItem>
                                <asp:ListItem Text="Circuito de ordenes de pago" Value="3"></asp:ListItem>
                            </asp:DropDownList>
                        </div>
                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="25%">Asegurado</asp:label>
                            <asp:HiddenField runat="server" ID="hidClaveAse" Value="" />
                            <asp:textbox runat="server" ID="txtAsegurado" CssClass="estandar-control" Width="75%" ></asp:textbox>
                        </div>
                    </div>

                    <div class="clear padding5"></div>

                    <div class="row">
                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="20%">Moneda</asp:label>
                            <asp:DropDownList runat="server" ID="cmbMoneda" CssClass="estandar-control" Width="80%" ></asp:DropDownList>
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
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="20%">Monto</asp:label>
                            <asp:TextBox runat="server" ID="txtMontoDesde" CssClass="col-md-1 estandar-control Monto Derecha" Width="36%" ></asp:TextBox>
                            <asp:label runat="server" class="col-md-1 etiqueta-control">A</asp:label>
                            <asp:TextBox runat="server" ID="txtMontoHasta" CssClass="estandar-control Monto Derecha" Width="35.5%" ></asp:TextBox>
                        </div>

                        <div class="col-md-6">
                            <asp:label runat="server" class="col-md-1 etiqueta-control" Width="25%">Fecha Pago</asp:label>
                            <asp:TextBox runat="server" ID="txtFechaPagoDesde" CssClass="col-md-1 estandar-control Fecha Centro" Width="33.2%" ></asp:TextBox>
                            <asp:label runat="server" class="col-md-1 etiqueta-control">A</asp:label>
                            <asp:TextBox runat="server" ID="txtFechaPagoHasta" CssClass="estandar-control Fecha Centro" Width="33.2%" ></asp:TextBox>
                        </div>

                    </div>
                </ContentTemplate>
            </asp:UpdatePanel>

            <div class="clear padding5"></div>

            <div class="row">
                <div class="col-md-6">
                    <div class="cuadro-subtitulo">
                        <input type="image" src="../Images/contraer_mini.png" id="coVentana2" class="contraer"  />
                        <input type="image" src="../Images/expander_mini.png"   id="exVentana2" class="expandir"  />
                        Usuario Solicitante
                    </div>
                    <div class="panel-subcontenido ventana2">
                        <asp:UpdatePanel runat="server" ID="upSolicitante">
                           <ContentTemplate>
                               <asp:Panel runat="server" ID="pnlUsuario" Width="100%" Height="100px" ScrollBars="Both">
                                    <asp:GridView runat="server" ID="gvd_Usuario" AutoGenerateColumns="false" 
                                                   CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                                   GridLines="Horizontal"  ShowHeaderWhenEmpty="true" >
                                        <Columns>
                                            <asp:TemplateField HeaderText="">
                                                <ItemTemplate>
                                                        <asp:HiddenField runat="server" ID="chk_SelUsu" value="false"/>
                                                </ItemTemplate>
                                            </asp:TemplateField >
                                            <asp:TemplateField HeaderText="Clave">
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lbl_ClaveUsu" Text='<%# Eval("Clave") %>' Width="100px" ></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Descripción">
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lbl_Desc" Text='<%# Eval("Descripcion") %>' Width="310px"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField>
                                                <ItemTemplate>
                                                    <asp:imagebutton ImageUrl="~/Images/delete_rojo.png" CommandName="Delete" Height="26" runat="server" CssClass="btn Delete" />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                    </asp:GridView>
                               </asp:Panel>
                               <div style="width:100%;  text-align:right">
                                    <asp:LinkButton id="btn_AddUsuario" runat="server" class="btn botones AgregaUsuario" data-toggle="modal" data-target="#EsperaModal">
                                        <span>
                                            <img class="btn-añadir"/>
                                            Añadir
                                        </span>
                                    </asp:LinkButton>
                                </div>
                           </ContentTemplate>
                        </asp:UpdatePanel>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="cuadro-subtitulo">
                        <input type="image" src="../Images/contraer_mini.png" id="coVentana3" class="contraer"  />
                        <input type="image" src="../Images/expander_mini.png"   id="exVentana3" class="expandir"  />
                        Estatus Orden Pago
                    </div>
                    <div class="panel-subcontenido ventana3">
                        <asp:UpdatePanel runat="server" ID="upEstatus">
                           <ContentTemplate>
                               <asp:Panel runat="server" ID="pnlEstatus" Width="100%" Height="100px" ScrollBars="Both">
                                    <asp:GridView runat="server" ID="gvd_Estatus" AutoGenerateColumns="false" 
                                                  CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                                  GridLines ="Horizontal"  ShowHeaderWhenEmpty="true" >
                                        <Columns>
                                            <asp:TemplateField HeaderText="">
                                                <ItemTemplate>
                                                        <asp:HiddenField runat="server" ID="chk_SelEst" value="false"/>
                                                </ItemTemplate>
                                            </asp:TemplateField >
                                            <asp:TemplateField HeaderText="Clave">
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lbl_ClaveEst" Text='<%# Eval("Clave") %>' Width="60px" Font-Size="10px" ></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Descripción">
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lbl_Desc" Text='<%# Eval("Descripcion") %>' Width="350px" Font-Size="10px"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField>
                                                <ItemTemplate>
                                                    <asp:imagebutton ImageUrl="~/Images/delete_rojo.png" CommandName="Delete" Height="26" runat="server" CssClass="btn Delete" />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                        <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
                                    </asp:GridView>
                               </asp:Panel>
                               <div style="width:100%;  text-align:right">
                                    <asp:LinkButton id="btn_AddEstatus" runat="server" class="btn botones AgregaEstatus" data-toggle="modal" data-target="#EsperaModal">
                                        <span>
                                            <img class="btn-añadir"/>
                                            Añadir
                                        </span>
                                    </asp:LinkButton>
                                </div>
                           </ContentTemplate>
                        </asp:UpdatePanel>
                    </div>
                </div>
            </div>
            <div class="clear padding5"></div>
            <%--<div class="row">
                <div class="col-md-6">
                    <div class="cuadro-subtitulo">
                        <input type="image" src="../Images/contraer_mini.png" id="coVentana4" class="contraer"  />
                        <input type="image" src="../Images/expander_mini.png"   id="exVentana4" class="expandir"  />
                        Broker
                    </div>
                    <div class="panel-subcontenido ventana4">
                            <asp:UpdatePanel runat="server" ID="upBroker">
                                <ContentTemplate>
                                    <asp:Panel runat="server" ID="pnlBroker" Width="100%" Height="100px" ScrollBars="Both">
                                            <asp:GridView runat="server" ID="gvd_Broker" AutoGenerateColumns="false" 
                                                            CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                                            GridLines="Horizontal"  ShowHeaderWhenEmpty="true" >
                                                <Columns>
                                                    <asp:TemplateField HeaderText="">
                                                        <ItemTemplate>
                                                                <asp:HiddenField runat="server" ID="chk_SelBro" value="false"/>
                                                        </ItemTemplate>
                                                    </asp:TemplateField >
                                                    <asp:TemplateField HeaderText="Clave">
                                                        <ItemTemplate>
                                                            <asp:Label runat="server" ID="lbl_ClaveBro" Text='<%# Eval("Clave") %>' Width="50px"></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Descripción">
                                                        <ItemTemplate>
                                                            <asp:Label runat="server" ID="lbl_Desc" Text='<%# Eval("Descripcion") %>' Width="360px"></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField>
                                                        <ItemTemplate>
                                                            <asp:imagebutton ImageUrl="~/Images/delete_rojo.png" CommandName="Delete" Height="26" runat="server" CssClass="btn Delete" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                </Columns>
                                            </asp:GridView>
                                        </asp:Panel>
                                        <div style="width:100%;  text-align:right">
                                            <asp:LinkButton id="btn_AddBroker" runat="server" class="btn botones AgregaBroker" data-toggle="modal" data-target="#EsperaModal">
                                                <span>
                                                    <img class="btn-añadir"/>
                                                    Añadir
                                                </span>
                                            </asp:LinkButton>
                                        </div>
                                </ContentTemplate>
                            </asp:UpdatePanel>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="cuadro-subtitulo">
                        <input type="image" src="../Images/contraer_mini.png" id="coVentana5" class="contraer"  />
                        <input type="image" src="../Images/expander_mini.png"   id="exVentana5" class="expandir"  />
                        Reasegurador
                    </div>
                    <div class="panel-subcontenido ventana5">
                            <asp:UpdatePanel runat="server" ID="upCompañia">
                                <ContentTemplate>
                                    <asp:Panel runat="server" ID="pnlCompañia" Width="100%" Height="100px" ScrollBars="Both">
                                            <asp:GridView runat="server" ID="gvd_Compañia" AutoGenerateColumns="false" 
                                                            CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                                            GridLines="Horizontal"  ShowHeaderWhenEmpty="true">
                                                <Columns>
                                                    <asp:TemplateField HeaderText="" ItemStyle-CssClass="SelCia">
                                                        <ItemTemplate>
                                                            <asp:HiddenField runat="server" ID="chk_SelCia" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Clave" ItemStyle-CssClass="ClaveCia">
                                                        <ItemTemplate>
                                                            <asp:Label runat="server" ID="lbl_ClaveCia" Text='<%# Eval("Clave") %>' Width="50px" ></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Descripción" ItemStyle-CssClass="DescripcionCia">
                                                        <ItemTemplate>
                                                            <asp:Label runat="server" ID="lbl_Desc" Text='<%# Eval("Descripcion") %>' Width="360px"></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField>
                                                        <ItemTemplate>
                                                            <asp:imagebutton ImageUrl="~/Images/delete_rojo.png" CommandName="Delete" Height="26" runat="server" CssClass="btn Delete" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                </Columns>
                                            </asp:GridView>
                                        </asp:Panel>
                                        <div style="width:100%;  text-align:right">
                                            <asp:LinkButton id="btn_AddCia" runat="server" class="btn botones AgregaCia" data-toggle="modal" data-target="#EsperaModal">
                                                <span>
                                                    <img class="btn-añadir"/>
                                                    Añadir
                                                </span>
                                            </asp:LinkButton>
                                        </div>
                                </ContentTemplate>
                            </asp:UpdatePanel> 
                    </div>
                </div>
            </div>--%>
            <div class="clear padding5"></div>
            <div class="row">
                <div class="col-md-6">
                    <div class="cuadro-subtitulo">
                        <input type="image" src="../Images/contraer_mini.png" id="coVentana6" class="contraer"  />
                        <input type="image" src="../Images/expander_mini.png"   id="exVentana6" class="expandir"  />
                        Póliza
                    </div>
                    <div class="panel-subcontenido ventana6">
                            <asp:UpdatePanel runat="server" ID="upPoliza">
                                <ContentTemplate>
                                    <asp:HiddenField runat="server" ID="hid_HTML" Value="" />
                                    <div class="clear padding5"></div>

                                    <asp:Panel runat="server" ID="pnlPoliza" Width="100%" Height="100px" ScrollBars="Both">
                                            <asp:GridView runat="server" ID="gvd_Poliza" AutoGenerateColumns="false" 
                                                            CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                                            GridLines="Horizontal"  ShowHeaderWhenEmpty="true" >
                                                <Columns>
                                                    <asp:TemplateField HeaderText="">
                                                        <ItemTemplate>
                                                            <asp:HiddenField runat="server" ID="chk_SelPol" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Clave">
                                                        <ItemTemplate>
                                                            <asp:Label runat="server" ID="lbl_ClavePol" Text='<%# Eval("Clave") %>' Width="100px"></asp:Label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                        <asp:TemplateField HeaderText="Grupo Endoso">
                                                        <ItemTemplate>
                                                            <asp:label runat="server" ID="lbl_DescripcionPol" Enabled="false" Text='<%# Eval("Descripcion")   %>' Width="310px"></asp:label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField HeaderText="Id_Pv" Visible="false">
                                                        <ItemTemplate>
                                                            <asp:label runat="server" ID="lbl_idpv" Text='<%# Eval("id_pv") %>'  ></asp:label>
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                    <asp:TemplateField>
                                                        <ItemTemplate>
                                                            <asp:imagebutton ImageUrl="~/Images/delete_rojo.png" CommandName="Delete" Height="26" runat="server" CssClass="btn Delete" />
                                                        </ItemTemplate>
                                                    </asp:TemplateField>
                                                </Columns>
                                            </asp:GridView>
                                        </asp:Panel>
                                        <div style="width:100%;  text-align:right">
                                            <asp:LinkButton id="btn_AddPol" runat="server" class="btn botones">
                                                <span>
                                                    <img class="btn-añadir"/>
                                                    Añadir
                                                </span>
                                            </asp:LinkButton>
                                        </div>
                                </ContentTemplate>
                            </asp:UpdatePanel>       
                    </div>   
                </div>
                <div class="col-md-6">
                    <div class="cuadro-subtitulo">
                        <input type="image" src="../Images/contraer_mini.png" id="coVentana7" class="contraer"  />
                        <input type="image" src="../Images/expander_mini.png"   id="exVentana7" class="expandir"  />
                        Ramo Contable
                    </div>
                    <div class="panel-subcontenido ventana7">
                            <asp:UpdatePanel runat="server" ID="upRamoContable">
                            <ContentTemplate>
                                    <asp:Panel runat="server" ID="pn_RamoContable" Width="100%" Height="100px" ScrollBars="Both">
                                    <asp:GridView runat="server" ID="gvd_RamoContable" AutoGenerateColumns="false" 
                                                    CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                                                    GridLines="Horizontal"  ShowHeaderWhenEmpty="true" >
                                        <Columns>
                                            <asp:TemplateField HeaderText="">
                                                <ItemTemplate>
                                                        <asp:HiddenField runat="server" ID="chk_SelRamC" value="false"/>
                                                </ItemTemplate>
                                            </asp:TemplateField >
                                            <asp:TemplateField HeaderText="Clave">
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lbl_ClaveRamC" Text='<%# Eval("Clave") %>' Width="50px"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField HeaderText="Descripción">
                                                <ItemTemplate>
                                                    <asp:Label runat="server" ID="lbl_Desc" Text='<%# Eval("Descripcion") %>' Width="360px"></asp:Label>
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                            <asp:TemplateField>
                                                <ItemTemplate>
                                                    <asp:imagebutton ImageUrl="~/Images/delete_rojo.png" CommandName="Delete" Height="26" runat="server" CssClass="btn Delete" />
                                                </ItemTemplate>
                                            </asp:TemplateField>
                                        </Columns>
                                    </asp:GridView>
                                </asp:Panel>
                                <div style="width:100%;  text-align:right">
                                    <asp:LinkButton id="btn_AddRamoContable" runat="server" class="btn botones AgregaRamoCont" data-toggle="modal" data-target="#EsperaModal">
                                        <span>
                                            <img class="btn-añadir"/>
                                            Añadir
                                        </span>
                                    </asp:LinkButton>
                                </div>
                            </ContentTemplate>
                            </asp:UpdatePanel>
                    </div>
                </div>
            </div>

            <div class="clear padding5"></div>
            
            <%--<div class="row">
                <div class="col-md-12">
                    <div class="cuadro-subtitulo">
                        Naturaleza de Orden de Pago
                    </div>
                    <div class="panel-subcontenido">
                        <asp:UpdatePanel ID="upNaturaleza" runat="server">
                            <ContentTemplate>

                                <div class="col-md-4">
                                    <asp:CheckBox runat="server" ID="chk_Devolucion" Text="Devolución de Impuestos a Reasegurador" CssClass="etiqueta-control" />
                                </div>
                                <div class="col-md-4">
                                    <asp:CheckBox runat="server" ID="chk_ConISR" Text="Con Retención de Impuestos a Reasegurador" CssClass="etiqueta-control" />
                                </div>
                                <div class="col-md-4">
                                    <asp:CheckBox runat="server" ID="chk_SinISR" Text="Sin Retención de Impuestos a Reasegurador" CssClass="etiqueta-control" />
                                </div>

                            </ContentTemplate>
                        </asp:UpdatePanel>
                    </div>
                </div>--%>
            </div>

            <div class="clear padding5"></div>

            <div class="row">
                <asp:UpdatePanel ID="up_Firmas" runat="server">
                    <ContentTemplate>
                        <div class="col-md-12">
                            <div class="cuadro-subtitulo">

                                <table style="width:50%">
                                    <tr>
                                        <td><asp:label runat="server" class="etiqueta-control">Firmas Electrónicas:</asp:label></td>
                                        <td><asp:RadioButton runat="server" ID="chk_Pendiente" Text="Pendientes de Firma" CssClass="etiqueta-control" OnCheckedChanged="chk_Pendiente_CheckedChanged" AutoPostBack="true" /></td>
                                        <td><asp:RadioButton runat="server" ID="chk_Autorizada"  Text="Firmada por" CssClass="etiqueta-control" OnCheckedChanged="chk_Autorizada_CheckedChanged" AutoPostBack="true" /></td>
                                    </tr>
                                </table>
                                
                            </div>
                            <div class="panel-subcontenido">
                                  <table style="width:100%">
                                     <tr>
                                       <%--  <td style="width:14.28%;padding-left:15px;"><asp:CheckBox runat="server" ID="chk_Solicitante" Enabled="false"  Text="Solicitante" CssClass="etiqueta-control" /> </td>
                                         <td style="width:14.28%;"><asp:CheckBox runat="server" ID="chk_JefeDirecto"  Enabled="false" Text="Jefe Inmediato" CssClass="etiqueta-control" /> </td>
                                         <td style="width:14.28%;"><asp:CheckBox runat="server" ID="chk_SubDirector"  Enabled="false" Text="Subdirector" CssClass="etiqueta-control" /> </td>
                                         <td style="width:14.28%;"><asp:CheckBox runat="server" ID="chk_Director"  Enabled="false"   Text="Director" CssClass="etiqueta-control" /> </td>
                                         <td style="width:14.28%;"><asp:CheckBox runat="server" ID="chk_DirectorGral"  Enabled="false"    Text="Director Gral." CssClass="etiqueta-control" /> </td>
                                         <td style="width:14.28%;"><asp:CheckBox runat="server" ID="chk_Tesoreria"  Enabled="false"  Text="Tesoreria" CssClass="etiqueta-control" /> </td>--%>
                                        <asp:DropDownList runat="server" ID="ddlRolFilter" CssClass="col-md-1 estandar-control" Width="36%">
                                            <asp:ListItem Text="Seleccione Rol" Value="0"></asp:ListItem>
                                            <asp:ListItem Text="Solicitante" Value="1"></asp:ListItem>
                                            <asp:ListItem Text="Jefe Directo" Value="2"></asp:ListItem>
                                             <asp:ListItem Text="SubGerente" Value="3"></asp:ListItem>
                                            <asp:ListItem Text="SubDirector" Value="4"></asp:ListItem>
                                            <asp:ListItem Text="Director" Value="5"></asp:ListItem>
                                            <asp:ListItem Text="Director General" Value="6"></asp:ListItem>
                                            <asp:ListItem Text="Tesoreria" Value="7"></asp:ListItem>

                                        </asp:DropDownList>
                                        <%-- <td style="width:14.28%;"><asp:CheckBox runat="server" ID="chk_Contabilidad"   Enabled="false"   Text="Contabilidad" CssClass="etiqueta-control" /></td>--%>
                                     </tr>
                                 </table>
                            </div>
                        </div>
                    </ContentTemplate>
                </asp:UpdatePanel>
            </div>
        </div>


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
            <asp:UpdatePanel runat="server" ID="upOrdenes">
              <ContentTemplate>
                     <table style="width:100%;">
                        <tr>
                            <td style="width:4%;"></td>
                            <td style="width:6%;border-radius:0px 0px 10px 10px;" class="cuadro-seccion-grid">NRO</td>
                            <td style="width:36%;border-radius:0px 0px 10px 10px;" class="cuadro-seccion-grid">ASEGURADO(S)</td>
                            <td style="width:35%;border-radius:0px 0px 10px 10px;" class="cuadro-seccion-grid">PAGAR A</td>
                            <td style="width:14%;border-radius:0px 0px 10px 10px;" class="cuadro-seccion-grid">MONTO</td>
                        </tr>
                     </table>

                     <asp:HiddenField runat="server" ID="hid_rechazo" Value="0" />
                     <asp:Panel runat="server" id="pnlOrdenP" width="100%">
                         <asp:GridView runat="server" ID="grdOrdenPago" Width="100%" AutoGenerateColumns="false"  ShowHeader="false"
                             CssClass="grid-view" HeaderStyle-CssClass="header" AlternatingRowStyle-CssClass="altern"
                             GridLines="None"  ShowHeaderWhenEmpty="true" AllowPaging="true" PageSize="20" 
                             DataKeyNames="nro_op,	FechaGeneracion,	FechaBaja,	NumeroRecibo,	NombreSucursal,	NombreSucursalPago,	CodigoAbona,	NombreModifica,	NombreUsuario,
                                           txt_cheque_a_nom,	FechaEstimadaPago,	imp_total,	Observaciones,	NombreAbona,	Direccion,	Calle,	NumeroExterior,	NumeroInterior,
                                           Colonia,	CodigoPostal,	Municipio,	Ciudad,	Departamento,	Sector,	Transferencia,	CodigoBanco,	NombreBanco,	Swift,	Aba,	NumeroCuenta,
                                           Moneda,	txt_moneda,	CodigoAnulacion,	Concepto,	ClaveProveedor,	TipoTransferencia,	NumeroPoliza,	Contratante,	SubRamoContable,	NumeroSiniestro,
                                           ClasePago, Solicitante, Jefe, Tesoreria, Subdirector, Director, DirectorGeneral, Subgerente, NombreSolicitante,	NombreJefe, NombreTesoreria, 
                                           NombreSubdirector, NombreDirector, NombreDirectorGeneral, NombreSubgerente,	FirmaSolicitante, FirmaJefe, FirmaTesoreria, FirmaSubdirector, FirmaDirector,			
                                           FirmaDirectorGeneral, FirmaSubgerente, FirmadoSolicitante, FirmadoJefe, FirmadoTesoreria, FirmadoSubdirector, FirmadoDirector, FirmadoDirectorGeneral,FirmadoSubgerente,	FechaFirmaSolicitante,
                                           FechaFirmaJefe, FechaFirmaTesoreria ,FechaFirmaSubdirector ,FechaFirmaDirector ,FechaFirmaDirectorGeneral,FechaFirmaSubgerente, NivelAutorizacion, Preautorizada">

                             <Columns>
                                 <%--Usado para mostrar u ocultar la orden de pago--%>
                                  <asp:TemplateField HeaderText="" HeaderStyle-CssClass="Centro" ItemStyle-CssClass="Centrado" ItemStyle-Width="2%" ItemStyle-VerticalAlign="Top">
                                    <ItemTemplate>
                                        <div style="padding-top:10px;">
                                            <asp:CheckBox runat="server"  ID="chkSeleccionOP" Checked="false" Visible='<%# CBool(Eval("Preautorizada")) %>' />
                                            <input type="image" src="../Images/contraer_mini.png" class="Ocultar" runat="server" id="inp_Ocultar" />
                                            <input type="image" src="../Images/expander_mini.png" class="Mostrar" runat="server" id="inp_Mostrar" />
                                            <asp:TextBox runat="server" ID="txt_Estado" Text='1' CssClass="NoDisplay Estado" ></asp:TextBox>
                                        </div>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                
                                <%--Este es el template completo que tendra la orden de pago--%>
                                <asp:TemplateField HeaderText="" ItemStyle-Width="98%" >
                                    <ItemTemplate>
                                        
                                        <div style="background-color:white;">
                                            <div class="cuadro-titulo-flotante" style="text-align:left;vertical-align:central;">
                                                <%--Datos de encabezado de la orden de pago--%>
                                                <table style="width:100%;">
                                                    <tr>
                                                        <td style="width:2%;"><asp:CheckBox runat="server"  ID="chkImpresion" Checked='true'/></td>
                                                        <td style="width:6%;"><asp:Label runat="server" ID="lblOrdenPago" Text='<%# Eval("nro_op")%>'  Width="100%"></asp:Label></td>
                                                        <td style="width:35%;"><asp:Label runat="server" ID="txtAsegurado" Text='<%# Eval("contratante") %>' Width="100%" ></asp:Label></td>
                                                        <td style="width:35%;"><asp:Label runat="server" ID="lblMoneda" Text='<%# Eval("txt_cheque_a_nom") %>' CssClass="Derecha" Width="100%"  ></asp:Label></td>
                                                        <td style="width:11%;"> <asp:Label runat="server" ID="lblMonto" Text='<%# String.Format("{0:#,#0.00}", CDbl(Eval("imp_total")))  %>' Width="100%" CssClass="Monto"></asp:Label></td>
                                                    </tr>
                                                </table>

                                            </div>
                                        </div>

                                        
                                        <div class="Ventana" id="div_ventana" runat="server">
                                            <table style="width: 100%;">
                                                <tr>
                                                    <td style="width: 5%;"></td>
                                                    <td style="width: 10%;">
                                                        <asp:Image runat="server" ImageUrl="~/Images/gmx_mini.png" Width="100%" Height="70px" /></td>
                                                    <td style="width: 55%;" class="cuadro-titulo-orden">ORDEN DE PAGO</td>
                                                    <td style="width: 25%; text-align: left; border: solid; border-width: 1px; font-size: 13px; padding-right: 5px; font-weight: bold;">
                                                        <asp:Label runat="server" class="col-md-1" Text="Nro Orden:" Width="70%"></asp:Label>
                                                        <asp:LinkButton ID="lnk_OrdenPago" CommandName="OrdenPago" runat="server" ForeColor="Red" ToolTip="Click para detalle de Orden de Pago" Text='<%# Eval("nro_op") %>' Width="30%" CssClass="Derecha"></asp:LinkButton>
                                                        <div class="clear padding5"></div>
                                                        <asp:Label runat="server" class="col-md-1" Text="Fecha Generación:" Width="70%"></asp:Label>
                                                        <asp:Label runat="server" Text='<%# Eval("FechaGeneracion") %>' Width="30%" CssClass="Derecha"></asp:Label>
                                                        <%--<div class="clear padding5"></div>--%>
                                                    </td>
                                                    <td style="width: 5%;"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 100%; height: 5px;" colspan="5"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 5%;"></td>
                                                    <td style="width: 90%; text-align: left; font-size: 11px;" colspan="3">
                                                        <div class="row" style="border-style: inset; border-width: 1px;">
                                                            <div class="clear padding20"></div>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Sucursal de emisión:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("NombreSucursal") %>'></asp:Label>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Número de póliza:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("NumeroPoliza") %>'></asp:Label>
                                                                </div>
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Departamento:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("Sector") %>'></asp:Label>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Contratante:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("Contratante") %>'></asp:Label>
                                                                </div>
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Elaborado por:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("NombreUsuario") %>'></asp:Label>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Subramo contable:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("SubRamoContable") %>'></asp:Label>
                                                                </div>
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Cheque a nombre:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("txt_cheque_a_nom") %>'></asp:Label>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Número de siniestro:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("NumeroSiniestro") %>'></asp:Label>
                                                                </div>
                                                                <div class="clear padding10"></div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Fecha estimada pago:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("FechaEstimadaPago") %>'></asp:Label>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Clase de pago:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("ClasePago") %>'></asp:Label>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="clear padding20"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Monto" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# String.Format("{0:#,#0.00}", CDbl(Eval("imp_total")))  %>'></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("txt_moneda") %>'></asp:Label>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Solicitud de:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-4" Text='<%# Eval("TipoTransferencia") %>'></asp:Label>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Clave bancaria:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-8" Text='<%# String.Format("{0} {1}", Eval("NumeroCuenta"), Eval("NombreBanco")) %>'></asp:Label>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-6">
                                                                    <asp:Label runat="server" class="col-md-4" Text="Nombre/Dirección:" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-8" Text='<%# String.Format("Calle:  {0}", Eval("Calle")) %>'></asp:Label>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="clear padding10"></div>
                                                                <div class="col-md-12">
                                                                    <asp:Label runat="server" class="col-md-2" Text="" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" class="col-md-8" Text='<%# String.Format("Colonia:  {0}  C.P. {1}  Municipio: {2}", Eval("Colonia"), Eval("CodigoPostal"), Eval("Municipio")) %>'></asp:Label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style="width: 5%;"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 5%;"></td>
                                                    <td style="width: 90%; text-align: left; font-size: 10px;" colspan="3">
                                                        <div class="row" style="border-style: inset; border-width: 1px;">
                                                            <div style="width: 100%; border-bottom: inset; border-width: 1px; text-align: center;">
                                                                <asp:Label runat="server" Font-Bold="true">DETALLE DE PAGO</asp:Label>
                                                            </div>
                                                            <asp:Label runat="server" ID="lblObservaciones" Text='<%# Eval("Observaciones") %>' CssClass="multiline" Width="100%"></asp:Label>
                                                        </div>
                                                    </td>
                                                    <td style="width: 5%;"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 5%;"></td>
                                                    <td style="width: 90%; text-align: left; font-size: 10px;" colspan="3">
                                                        <div class="row" style="border-style: inset; border-width: 1px;">
                                                            <div style="width: 100%; border-bottom: inset; border-width: 1px; text-align: center;">
                                                                <asp:Label runat="server" Font-Bold="true">DETALLE DE LA FACTURA</asp:Label>
                                                            </div>
                                                            <asp:Panel runat="server" ID="pnlDetalleFactura" Width="100%" ScrollBars="None">
                                                                <asp:GridView runat="server" ID="grdDetalleFactura" AutoGenerateColumns="false"
                                                                    GridLines="None" ShowHeaderWhenEmpty="true" CssClass="table grid-view" CellPadding="0">
                                                                    <Columns>

                                                                        <asp:TemplateField HeaderText="Tipo de documento" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# Eval("tipo_doc") %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <asp:TemplateField HeaderText="Número de comprobante" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# Eval("nro_comp") %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <asp:TemplateField HeaderText="Fecha del comprobante" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# Eval("fec_comp") %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                    </Columns>
                                                                </asp:GridView>
                                                            </asp:Panel>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 5%;"></td>
                                                    <td style="width: 90%; text-align: left; font-size: 10px;" colspan="3">
                                                        <div class="row" style="border-style: inset; border-width: 1px;">
                                                            <div style="width: 100%; border-bottom: inset; border-width: 1px; text-align: center;">
                                                                <asp:Label runat="server" Font-Bold="true">CONTABILIDAD EN TRANSITO</asp:Label>
                                                            </div>
                                                            <asp:Panel runat="server" ID="Panel1" Width="100%" ScrollBars="None">
                                                                <asp:GridView runat="server" ID="grdContabilidadTransito" AutoGenerateColumns="false"
                                                                    GridLines="None" ShowHeaderWhenEmpty="true" CssClass="table grid-view">
                                                                    <Columns>

                                                                        <asp:TemplateField HeaderText="Cuenta" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid Centro" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="aspNetDisabled etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate><%# Eval("txt_clave_con") %></ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <asp:TemplateField HeaderText="Analisis" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="aspNetDisabled etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# Eval("cod_ccosto") %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <asp:TemplateField HeaderText="C.C." HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="aspNetDisabled etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# Eval("cod_concepto") %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <asp:TemplateField HeaderText="Descripción" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="aspNetDisabled etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# Eval("txt_denomin") %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                        <asp:TemplateField HeaderText="monto" HeaderStyle-CssClass="Centrado etiqueta-subseccion-grid" ItemStyle-HorizontalAlign="Center" ItemStyle-CssClass="aspNetDisabled etiqueta-vacia-grid Centro">
                                                                            <ItemTemplate>
                                                                                <%# String.Format("{0:#,#0.00}", Eval("imp_mo")) %>
                                                                            </ItemTemplate>
                                                                        </asp:TemplateField>

                                                                    </Columns>
                                                                </asp:GridView>
                                                            </asp:Panel>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 5%;"></td>
                                                    <td style="width: 90%; text-align: left; font-size: 10px;" colspan="3">
                                                        <div class="row" style="border-style: inset; border-width: 1px;">
                                                            <div style="width: 100%; border-bottom: inset; border-width: 1px; text-align: center;">
                                                                <asp:Label runat="server" Font-Bold="true">AUTORIZACIONES</asp:Label>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaJefe" Checked='<%# CBool(Eval("FirmadoJefe")) %>' Enabled='<%# Eval("Jefe") = Master.cod_usuario  %>' AutoPostBack="true" Visible='<%# Eval("NivelAutorizacion") = 1  %>' OnCheckedChanged="chkFirmaJefe_CheckedChanged"  />
                                                                    <%--<asp:Image runat="server" ID="img_BlankJefe" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreJefe")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="img_FirmaJefe" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaJefe"))  %>' Visible='<%# Eval("NivelAutorizacion") = 1  %>' CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div runat="server" style="width: 100%; border-style: inset; border-width: 1px;" visible='<%# Eval("NivelAutorizacion") = 1 %>'></div>
                                                                    <asp:LinkButton runat="server" ID="lnk_SelJefe" Text='<%# Eval("NombreJefe") %>' Width="100%" OnClick="lnk_SelJefe_Click" Visible='<%# Eval("NivelAutorizacion") = 1 %>'></asp:LinkButton>
                                                                    <asp:Label runat="server" Text="SUPERVISOR" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") = 1  %>'></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaJefe" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") = 1 AndAlso Not CBool(Eval("FirmadoJefe")) %>'></asp:Label>
                                                                     <asp:HiddenField runat="server" ID="hidJefe" Value='<%# Eval("Jefe") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       <asp:HiddenField runat="server" ID="hid_CodJefe" Value='<%# Eval("cod_usuario_jefe") %>' ></asp:HiddenField>
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaDirector" Checked='<%# CBool(Eval("FirmadoDirector"))  %>' Enabled='<%# Eval("Director") = Master.cod_usuario  %>' AutoPostBack="true" Visible='<%# Eval("NivelAutorizacion") >= 4  %>' OnCheckedChanged="chkFirmaDirector_CheckedChanged"  />
                                                                    <%--<asp:Image runat="server" ID="Image1" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreContabilidad")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="Image2" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaDirector"))  %>' Visible='<%# Eval("NivelAutorizacion") >= 4  %>' CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div runat="server" style="width: 100%; border-style: inset; border-width: 1px;" visible='<%# Eval("NivelAutorizacion") >= 4  %>'></div>
                                                                    <asp:LinkButton runat="server" ID="LinkButton1" Text='<%# Eval("NombreDirector") %>' Width="100%" OnClick="lnk_SelJefe_Click" Visible='<%# Eval("NivelAutorizacion") >= 4  %>'></asp:LinkButton>
                                                                    <asp:Label runat="server" Text="DIRECCION SINIESTROS" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") >= 4  %>'></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaDirector" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") >= 4 AndAlso Not CBool(Eval("FirmadoDirector"))  %>'></asp:Label>
                                                                    <asp:HiddenField runat="server" ID="hidDirector" Value='<%# Eval("Director") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaSubgerente" Checked='<%# CBool(Eval("FirmadoSubgerente")) %>' Enabled='<%# Eval("Subgerente") = Master.cod_usuario  %>' AutoPostBack="true" Visible='<%# Eval("NivelAutorizacion") = 2  %>' OnCheckedChanged="chkFirmaSubgerente_CheckedChanged" />
                                                                    <%--<asp:Image runat="server" ID="img_BlankJefe" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreJefe")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="Image4" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaSubgerente"))  %>' Visible='<%# Eval("NivelAutorizacion") = 2  %>' CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div runat="server" style="width: 100%; border-style: inset; border-width: 1px;" visible='<%# Eval("NivelAutorizacion") = 2  %>'></div>
                                                                    <asp:LinkButton runat="server" ID="LinkButton4" Text='<%# Eval("NombreSubgerente") %>' Width="100%" OnClick="lnk_SelJefe_Click" Visible='<%# Eval("NivelAutorizacion") = 2  %>'></asp:LinkButton>
                                                                    <asp:Label runat="server" Text="SUBGERENTE" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") = 2  %>'></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaSubgerente" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") = 2 AndAlso Not CBool(Eval("FirmadoSubgerente")) %>'></asp:Label>
                                                                    <asp:HiddenField runat="server" ID="hidSubgerente" Value='<%# Eval("Subgerente") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaSolicitante" Checked='<%# CBool(Eval("FirmadoSolicitante"))  %>' Enabled='<%# Eval("Solicitante") = Master.cod_usuario  %>' AutoPostBack="true" OnCheckedChanged="chkFirmaSolicitante_CheckedChanged" />
                                                                    <%--<asp:Image runat="server" ID="img_BlankJefe" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreJefe")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="Image1" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaSolicitante"))  %>' Visible="true" CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div style="width: 100%; border-style: inset; border-width: 1px;"></div>
                                                                    <asp:LinkButton runat="server" ID="LinkButton2" Text='<%# Eval("NombreSolicitante") %>' Width="100%" OnClick="lnk_SelJefe_Click"></asp:LinkButton>
                                                                    <asp:Label runat="server" Text="SOLICITANTE" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaSolicitante" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%# Not CBool(Eval("FirmadoSolicitante"))  %>'></asp:Label>
                                                                    <asp:HiddenField runat="server" ID="hidSolicitante" Value='<%# Eval("Solicitante") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaTesoreria" Checked='<%# CBool(Eval("FirmadoTesoreria")) %>' Enabled='<%# Eval("Tesoreria") = Master.cod_usuario  %>' AutoPostBack="true" OnCheckedChanged="chkFirmaTesoreria_CheckedChanged" />
                                                                    <%--<asp:Image runat="server" ID="img_BlankJefe" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreJefe")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="Image5" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaTesoreria"))  %>' Visible="true" CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div style="width: 100%; border-style: inset; border-width: 1px;"></div>
                                                                    <asp:Label runat="server" Text="TESORERIA" Font-Bold="true"></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaTesoreria" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%#  Not CBool(Eval("FirmadoTesoreria")) %>'></asp:Label>
                                                                    <asp:HiddenField runat="server" ID="hidTesoreria" Value='<%# Eval("Tesoreria") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaSubdirector" Checked='<%# CBool(Eval("FirmadoSubdirector"))  %>' Enabled='<%# Eval("Subdirector") = Master.cod_usuario  %>' AutoPostBack="true" Visible='<%# Eval("NivelAutorizacion") >= 3 Or Eval("Transferencia") = 0 %>'  OnCheckedChanged="chkFirmaSubdirector_CheckedChanged" />
                                                                    <%--<asp:Image runat="server" ID="Image1" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreContabilidad")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="Image3" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaSubdirector"))  %>' Visible='<%# Eval("NivelAutorizacion") >= 3 Or Eval("Transferencia") = 0  %>' CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div runat="server" style="width: 100%; border-style: inset; border-width: 1px;" visible='<%# Eval("NivelAutorizacion") >= 3 Or Eval("Transferencia") = 0   %>'></div>
                                                                    <asp:LinkButton runat="server" ID="LinkButton3" Text='<%# Eval("NombreSubdirector") %>' Width="100%" OnClick="lnk_SelJefe_Click" Visible='<%# Eval("NivelAutorizacion") >= 3 Or Eval("Transferencia") = 0   %>'></asp:LinkButton>
                                                                    <asp:Label runat="server" Text="SUBDIRECTOR" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") >= 3 Or Eval("Transferencia") = 0   %>'></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaSubdirector" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%#  (Eval("NivelAutorizacion") >= 3 Or Eval("Transferencia") = 0) AndAlso Not CBool(Eval("FirmadoSubdirector"))  %>'></asp:Label>
                                                                    <asp:HiddenField runat="server" ID="hidSubdirector" Value='<%# Eval("Subdirector") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>

                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-4 Centro">
                                                                </div>
                                                                <div class="col-md-4 Centro">
                                                                    <asp:CheckBox runat="server" ID="chkFirmaDirectorGeneral" Checked='<%# CBool(Eval("FirmadoDirectorGeneral"))  %>' Enabled='<%# Eval("DirectorGeneral") = Master.cod_usuario  %>' AutoPostBack="true" Visible='<%# Eval("NivelAutorizacion") >= 5  %>' />
                                                                    <%--<asp:Image runat="server" ID="Image1" ImageUrl="~/Images/Firmas/BLANK.jpg" Visible='<%# String.IsNullOrWhiteSpace(Eval("NombreContabilidad")) %>' CssClass="img-firma" />--%>
                                                                    <asp:Image runat="server" ID="Image8" ImageUrl='<%# "data:image/png;base64," + Convert.ToBase64String(Eval("FirmaDirectorGeneral"))  %>' Visible='<%# Eval("NivelAutorizacion") >= 5  %>' CssClass="img-firma" />
                                                                    <%--<asp:Label runat="server" ID="lbl_Fechajefe" Text='<%# Eval("fec_firma_jefe") %>' Width="100%" Font-Bold="true" CssClass="Centro" ForeColor="#003A5D"></asp:Label>--%>
                                                                    <div runat="server" style="width: 100%; border-style: inset; border-width: 1px;" visible='<%# Eval("NivelAutorizacion") >= 5  %>'></div>
                                                                    <asp:LinkButton runat="server" ID="LinkButton6" Text='<%# Eval("NombreDirectorGeneral") %>' Width="100%" OnClick="lnk_SelJefe_Click" Visible='<%# Eval("NivelAutorizacion") >= 5  %>'></asp:LinkButton>
                                                                    <asp:Label runat="server" Text="DIRECCION GENERAL" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") >= 5  %>'></asp:Label>
                                                                    <asp:Label runat="server" ID="lblPendienteFirmaDirectorGeneral" Text="¡Pendiente de Firma!" ForeColor="Red" Font-Bold="true" Visible='<%# Eval("NivelAutorizacion") >= 5 AndAlso Not CBool(Eval("FirmadoDirectorGeneral"))  %>'></asp:Label>
                                                                    <asp:HiddenField runat="server" ID="hidDirectorGeneral" Value='<%# Eval("DirectorGeneral") %>' ></asp:HiddenField>
                                                                    <%--<asp:HiddenField runat="server" ID="hid_SelJefe" Value='<%# Eval("user_id_jefe") %>' ></asp:HiddenField>
                                                                                       
                                                                                       <asp:HiddenField runat="server" ID="hid_MailJefe" Value='<%# Eval("mail_jefe") %>' ></asp:HiddenField>--%>
                                                                </div>
                                                                <div class="col-md-4 Centro">
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </ItemTemplate>
                                </asp:TemplateField>                             
                             </Columns>
                             <PagerStyle CssClass="pager" />
                            <PagerSettings Mode="NumericFirstLast" FirstPageText="Primero" LastPageText="Ultimo" />
                                                          
                         </asp:GridView>

                      <%--Aqui iba el gird original--%>
                    </asp:Panel>
              </ContentTemplate>
            </asp:UpdatePanel>
        </div>

        <asp:UpdatePanel runat="server" ID="upFirma">
            <ContentTemplate>
                <div class="row" style="width:100%; border-top-style:inset; border-width:1px; border-color:#003A5D">
                    <div class="col-md-4">
                        <div style="width:100%">
                            <asp:LinkButton id="btn_Todas" runat="server" class="btn botones">
                                <span>
                                    <img class="btn-todos"/>
                                    Todas
                                </span>
                            </asp:LinkButton>

                            <asp:LinkButton id="btn_Ninguna" runat="server" class="btn botones">
                                <span>
                                    <img class="btn-ninguno"/>
                                    Ninguna
                                </span>
                            </asp:LinkButton>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div style="width:100%; text-align:right;">
                            <asp:LinkButton id="btn_Imprimir" runat="server" class="btn botones">
                                <span>
                                    <img class="btn-imprimir"/>
                                    Imprimir
                                </span>
                            </asp:LinkButton>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div style="width:100%; text-align:right;">
                            <asp:LinkButton id="btn_Rechazar" runat="server" class="btn botones Autorizacion">
                                <span>
                                    <img class="btn-cancelar"/>
                                    Rechazar
                                </span>
                            </asp:LinkButton>

                            <asp:LinkButton id="btn_Firmar" runat="server" class="btn botones Autorizacion">
                                <span>
                                    <img class="btn-modificar"/>
                                    Autorizar
                                </span>
                            </asp:LinkButton>

                            <asp:LinkButton id="btn_Confirmar" runat="server" class="NoDisplay">
                            </asp:LinkButton>
                        </div>
                    </div>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>



    <!-- Modal -->
    <div id="Destinatario" style="width:50%" class="modal-catalogo" >
        <asp:UpdatePanel runat="server" ID="upDestinatarios">
            <ContentTemplate>
                <div class="cuadro-titulo" style="height:30px">
                    <button type="button" class="close"  data-dismiss="modal">&times;</button>
                    <div class="titulo-modal">Destinatario</div>
                </div>

                <div class="panel-contenido">  
                    <asp:HiddenField runat="server" ID="hid_Persona" Value="" /> 
                    <asp:Panel runat="server" ID="pnlDestinatarios" Width="100%" Height="200px" ScrollBars="Vertical">
                        <asp:GridView runat="server"  ID="gvd_Destinatarios" AutoGenerateColumns="false"   DataKeyNames="firma,usuario_id,mail"
                                        GridLines="None"  ShowHeaderWhenEmpty="true" CssClass="grid-view"
                                        HeaderStyle-CssClass="header" >
                            <Columns>
                                <asp:TemplateField HeaderText="Clave" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txt_Clave" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("cod_usuario") %>' Width="100px"></asp:textbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Destinatario" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txt_Nombre" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("usuario") %>' Width="200px"></asp:textbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Correo" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txt_Correo" CssClass="estandar-control Tablero" Enabled="false" Text='<%# Eval("mail") %>' Width="200px"></asp:textbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Default" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:checkbox runat="server" ID="chk_Predeterminado"  Checked='<%# Eval("sn_default") %>' onclick="fn_CambioSeleccion('gvd_Destinatarios',this,'Unica','chk_Predeterminado')" CssClass="Select Centro"></asp:checkbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Máximo" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txt_MontoMaximo" CssClass="estandar-control Tablero Derecha" Enabled="false" Text='<%# Eval("monto_maximo") %>' Width="90px"></asp:textbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                                <asp:TemplateField HeaderText="Moneda" HeaderStyle-CssClass="Centro">
                                    <ItemTemplate>
                                        <asp:textbox runat="server" ID="txt_Moneda" CssClass="estandar-control Tablero Centro" Enabled="false" Text='<%# Eval("moneda") %>' Width="110px"></asp:textbox>
                                    </ItemTemplate>
                                </asp:TemplateField>
                            </Columns>
                        </asp:GridView>
                    </asp:Panel>
                </div>

                <div style="width:100%;text-align:right; border-top-style:inset; border-width:1px; border-color:#003A5D">
                    <asp:LinkButton id="btnCambia" runat="server" class="btn botones">
                        <span>
                            <img class="btn-guardar"/>
                            Guardar
                        </span>
                    </asp:LinkButton>
                    <asp:LinkButton id="btnCancela" runat="server" data-dismiss="modal" class="btn botones CierraFirma">
                        <span>
                            <img class="btn-cancelar"/>
                            Cancelar
                        </span>
                    </asp:LinkButton>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

    <div id="Rechazo" style="width:30%" class="modal-catalogo" >
        <asp:UpdatePanel runat="server" ID="upRechazo">
            <ContentTemplate>
                <div class="cuadro-titulo" style="height:30px">
                    <button type="button" class="close"  data-dismiss="modal">&times;</button>
                    <div class="titulo-modal">Motivo de Rechazo</div>
                </div>

                <asp:HiddenField runat="server" ID="hid_IndexRechazo" Value="-1" />
                <asp:TextBox ID="txt_MotivoRechazo" runat="server" CssClass="estandar-control" TextMode ="MultiLine"  Width="100%" Height="150px"></asp:TextBox>

                <div style="width:100%; text-align:right;border-top-style:inset; border-width:1px; border-color:#003A5D">
                    <asp:LinkButton id="btn_GuardaMotivo" runat="server" class="btn botones">
                        <span>
                            <img class="btn-guardar"/>
                            Guardar
                        </span>
                    </asp:LinkButton>
                    <asp:LinkButton id="btn_CancelaMotivo" runat="server" data-dismiss="modal" class="btn botones CierraFirma">
                        <span>
                            <img class="btn-cancelar"/>
                            Cancelar
                        </span>
                    </asp:LinkButton>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

    <div id="Impresion" style="width:50%" class="modal-catalogo" >
        <asp:UpdatePanel runat="server" ID="upImpresion">
            <ContentTemplate>
                <div class="cuadro-titulo" style="height:30px">
                    <button type="button" class="close"  data-dismiss="modal">&times;</button>
                    <div class="titulo-modal">Impresión de Ordenes de Pago</div>
                </div>


                <div style="width:100%; text-align:right;border-top-style:inset; border-width:1px; border-color:#003A5D">
                    <asp:LinkButton id="btn_ConfirmaImpresión" runat="server" class="btn botones">
                        <span>
                            <img class="btn-guardar"/>
                            Imprimir
                        </span>
                    </asp:LinkButton>
                </div>
            </ContentTemplate>
        </asp:UpdatePanel>
    </div>

    <div id="Grafica" style="width:420px; height:270px"  class="modal-catalogo">
         <asp:UpdatePanel runat="server" ID="upGrafica" >          
             <ContentTemplate>
                 <div class="cuadro-titulo" style="height:30px">
                    <button type="button" class="close"  data-dismiss="modal">&times;</button>
                    <div class="titulo-modal"><asp:label runat="server" ID="lbl_TituloGrafica">GRAFICA</asp:label></div>
                </div>
                 
             </ContentTemplate>
        </asp:UpdatePanel>
    </div>


    

    
    <div class="clear padding100"></div> 
</asp:Content>

