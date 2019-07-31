(function () {
    var demo = window.demo = window.demo || {};

    function isMouseOverGrid(target) {
        parentNode = target;
        while (parentNode !== null) {
            if (parentNode.id === demo.grid.get_id()) {
                return parentNode;
            }
            parentNode = parentNode.parentNode;
        }

        return null;
    }

    function dropOnHtmlElement(args) {
        if (droppedOnInput(args))
            return;

        if (droppedOnGrid(args))
            return;
    }

    function droppedOnGrid(args) {
        var target = args.get_htmlElement();

        while (target) {
            if (target.id === demo.grid.get_id()) {
                args.set_htmlElement(target);
                return;
            }

            target = target.parentNode;
        }
        args.set_cancel(true);
    }

    function droppedOnInput(args) {
        var target = args.get_htmlElement();
        if (target.tagName === "INPUT") {
            target.style.cursor = "default";
            target.value = args.get_sourceNode().get_text();
            args.set_cancel(true);
            return true;
        }
    }

    function dropOnTree(args) {
        var text = "";

        if (args.get_sourceNodes().length) {
            var i;
            for (i = 0; i < args.get_sourceNodes().length; i++) {
                var node = args.get_sourceNodes()[i];
                text = text + ', ' + node.get_text();
            }
        }
    }

    function clientSideEdit(sender, args) {
        var destinationNode = args.get_destNode();

        if (destinationNode) {
            firstTreeView = demo.firstTreeView;

            firstTreeView.trackChanges();

            var sourceNodes = args.get_sourceNodes();
            var dropPosition = args.get_dropPosition();

            //Needed to preserve the order of the dragged items
            if (dropPosition == "below") {
                for (var i = sourceNodes.length - 1; i >= 0; i--) {
                    var sourceNode = sourceNodes[i];
                    sourceNode.get_parent().get_nodes().remove(sourceNode);

                    insertAfter(destinationNode, sourceNode);
                }
            }
            else {
                for (var j = 0; j < sourceNodes.length; j++) {
                    sourceNode = sourceNodes[j];
                    sourceNode.get_parent().get_nodes().remove(sourceNode);

                    if (dropPosition == "over")
                        destinationNode.get_nodes().add(sourceNode);
                    if (dropPosition == "above")
                        insertBefore(destinationNode, sourceNode);
                }
            }
            destinationNode.set_expanded(true);
            firstTreeView.commitChanges();

        }
    }

    function insertBefore(destinationNode, sourceNode) {
        var destinationParent = destinationNode.get_parent();
        var index = destinationParent.get_nodes().indexOf(destinationNode);
        destinationParent.get_nodes().insert(index, sourceNode);
    }

    function insertAfter(destinationNode, sourceNode) {
        var destinationParent = destinationNode.get_parent();
        var index = destinationParent.get_nodes().indexOf(destinationNode);
        destinationParent.get_nodes().insert(index + 1, sourceNode);
    }

    window.onNodeDragging = function (sender, args) {
        var target = args.get_htmlElement();

        if (!target) return;

        if (target.tagName == "INPUT") {
            target.style.cursor = "hand";
        }

        var grid = isMouseOverGrid(target)
        if (grid) {
            grid.style.cursor = "hand";
        }
    };

    window.onNodeDropping = function (sender, args) {
        var dest = args.get_destNode();
        if (dest) {
            var clientSide = demo.checkbox.checked;

            if (clientSide) {
                clientSideEdit(sender, args);
                args.set_cancel(true);
                return;
            }

            dropOnTree(args);
        }
        else {
            dropOnHtmlElement(args);
        }
    };
}());