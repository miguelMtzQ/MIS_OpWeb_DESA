<%@ Page Title="" Language="VB"  MasterPageFile="~/Pages/SiteMaster.master" AutoEventWireup="false"  CodeFile="Inicio.aspx.vb" Inherits="Pages_Inicio" %>


<%@ MasterType VirtualPath="~/Pages/SiteMaster.master" %>


<asp:Content ID="Content2" ContentPlaceHolderID="cph_principal" Runat="Server">
    <asp:HiddenField runat="server" ID="hid_Ventanas" Value="0|0|0|1|" />
    <script src="../Scripts/TreeView.js"></script>

    <%--<telerik:RadScriptBlock runat="Server" ID="RadScriptBlock1">
        <script type="text/javascript" src="scripts.js"></script>
        <script type="text/javascript">
            Sys.Application.add_load(function () {
                demo.grid = $find("<%= RadGrid1.ClientID %>");
                demo.firstTreeView = $find('<%= RadTreeView1.ClientID %>');
                demo.checkbox = document.getElementById('<%= ChbClientSide.ClientID %>');
            });
        </script>
    </telerik:RadScriptBlock>

    <asp:UpdatePanel runat="server" ID="upTree">
        <ContentTemplate>
            <div class="row">
                <div class="col-md-6">
                     <asp:Panel runat="server" ID="Panel1" CssClass="Panel1">
                        <span class="label">RadTreeView1</span>
                        <telerik:RadTreeView RenderMode="Lightweight" ID="RadTreeView1" runat="server"  EnableDragAndDrop="True"
                            OnNodeDrop="RadTreeView1_HandleDrop" OnClientNodeDropping="onNodeDropping" OnClientNodeDragging="onNodeDragging"
                            MultipleSelect="true" EnableDragAndDropBetweenNodes="true">
                        </telerik:RadTreeView>
                    </asp:Panel>
                </div>
                <div class="col-md-6">
                     <span class="label">RadGrid</span>
                    <telerik:RadGrid RenderMode="Lightweight" runat="server" ID="RadGrid1"  Width="220px">
                    </telerik:RadGrid>
     
                    <asp:CheckBox ID="ChbClientSide" runat="server" Checked="true" Text="Client-side drag &amp;amp; drop"></asp:CheckBox>
 
                    <asp:CheckBox ID="ChbMultipleSelect" runat="server" Text="Multiple node selection"
                        Checked="True" AutoPostBack="True" OnCheckedChanged="ChbMultipleSelect_CheckedChanged"></asp:CheckBox>
 
                    <asp:CheckBox ID="ChbBetweenNodes" runat="server" Text="Drag and drop between nodes" Checked="True"
                        AutoPostBack="True" OnCheckedChanged="ChbBetweenNodes_CheckedChanged"></asp:CheckBox>
                </div>
            </div>
        </ContentTemplate>
    </asp:UpdatePanel>
    
    



   --%>

   
</asp:Content>

