Imports System
Imports System.Data
Imports Telerik.Web.UI

Partial Class Pages_Inicio
    Inherits System.Web.UI.Page


    'Protected Sub RadTreeView1_HandleDrop(ByVal sender As Object, ByVal e As RadTreeNodeDragDropEventArgs)
    '    Dim sourceNode As RadTreeNode = e.SourceDragNode
    '    Dim destNode As RadTreeNode = e.DestDragNode
    '    Dim dropPosition As RadTreeViewDropPosition = e.DropPosition

    '    If destNode IsNot Nothing Then
    '        'drag&drop is performed between trees
    '        If ChbBetweenNodes.Checked Then
    '            'dropped node will at the same level as a destination node
    '            If sourceNode.TreeView.SelectedNodes.Count <= 1 Then
    '                PerformDragAndDrop(dropPosition, sourceNode, destNode)
    '            ElseIf sourceNode.TreeView.SelectedNodes.Count > 1 Then
    '                'Needed to preserve the order of the dragged items
    '                If dropPosition = RadTreeViewDropPosition.Below Then
    '                    For i As Integer = sourceNode.TreeView.SelectedNodes.Count - 1 To 0 Step -1
    '                        PerformDragAndDrop(dropPosition, sourceNode.TreeView.SelectedNodes(i), destNode)
    '                    Next
    '                Else
    '                    For Each node As RadTreeNode In sourceNode.TreeView.SelectedNodes
    '                        PerformDragAndDrop(dropPosition, node, destNode)
    '                    Next
    '                End If
    '            End If
    '        Else
    '            'dropped node will be a sibling of the destination node
    '            If sourceNode.TreeView.SelectedNodes.Count <= 1 Then
    '                If Not sourceNode.IsAncestorOf(destNode) Then
    '                    sourceNode.Owner.Nodes.Remove(sourceNode)
    '                    destNode.Nodes.Add(sourceNode)
    '                End If
    '            ElseIf sourceNode.TreeView.SelectedNodes.Count > 1 Then
    '                For Each node As RadTreeNode In RadTreeView1.SelectedNodes
    '                    If Not node.IsAncestorOf(destNode) Then
    '                        node.Owner.Nodes.Remove(node)
    '                        destNode.Nodes.Add(node)
    '                    End If
    '                Next
    '            End If
    '        End If

    '        destNode.Expanded = True
    '        sourceNode.TreeView.UnselectAllNodes()
    '    ElseIf e.HtmlElementID = RadGrid1.ClientID Then
    '        Dim dt As DataTable = DirectCast(Session("DataTable"), DataTable)
    '        For Each node As RadTreeNode In e.DraggedNodes
    '            AddRowToGrid(dt, node)
    '        Next
    '    End If
    'End Sub

    'Private Sub PopulateGrid()
    '    Dim values As String() = {"One", "Two", "Three"}

    '    Dim dt As New DataTable()
    '    dt.Columns.Add("Text")
    '    dt.Columns.Add("Value")
    '    dt.Columns.Add("Category")
    '    dt.Rows.Add(values)
    '    dt.Rows.Add(values)
    '    dt.Rows.Add(values)
    '    Session("DataTable") = dt

    '    RadGrid1.DataSource = dt
    '    RadGrid1.DataBind()
    'End Sub

    'Private Sub AddRowToGrid(ByVal dt As DataTable, ByVal node As RadTreeNode)
    '    Dim values As String() = {node.Text, node.Value}
    '    dt.Rows.Add(values)

    '    RadGrid1.DataSource = dt
    '    RadGrid1.DataBind()
    'End Sub

    'Private Shared Sub PerformDragAndDrop(ByVal dropPosition As RadTreeViewDropPosition, ByVal sourceNode As RadTreeNode, ByVal destNode As RadTreeNode)
    '    If sourceNode.Equals(destNode) OrElse sourceNode.IsAncestorOf(destNode) Then
    '        Return
    '    End If
    '    sourceNode.Owner.Nodes.Remove(sourceNode)

    '    Select Case dropPosition
    '        Case RadTreeViewDropPosition.Over
    '            ' child
    '            If Not sourceNode.IsAncestorOf(destNode) Then
    '                destNode.Nodes.Add(sourceNode)
    '            End If
    '            Exit Select

    '        Case RadTreeViewDropPosition.Above
    '            ' sibling - above                    
    '            destNode.InsertBefore(sourceNode)
    '            Exit Select

    '        Case RadTreeViewDropPosition.Below
    '            ' sibling - below
    '            destNode.InsertAfter(sourceNode)
    '            Exit Select
    '    End Select
    'End Sub

    'Private Sub Pages_Inicio_Load(sender As Object, e As EventArgs) Handles Me.Load
    '    If Not Page.IsPostBack Then
    '        RadTreeView1.LoadContentFile("treeView.xml")
    '        RadTreeView1.ExpandAllNodes()
    '        PopulateGrid()
    '    End If
    'End Sub

    'Protected Sub ChbMultipleSelect_CheckedChanged(ByVal sender As Object, ByVal e As EventArgs)
    '    RadTreeView1.MultipleSelect = Not RadTreeView1.MultipleSelect
    'End Sub

    'Protected Sub ChbBetweenNodes_CheckedChanged(ByVal sender As Object, ByVal e As EventArgs)
    '    RadTreeView1.EnableDragAndDropBetweenNodes = Not RadTreeView1.EnableDragAndDropBetweenNodes
    'End Sub
End Class
