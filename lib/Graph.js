/** Private class Edge.
 * @param {Node} nodeStart node which begins the edge.
 * @param {Node} nodeEnd node which terminates the edge.
 * @param {any} id edge's identifier (only string or number).
 * @param {Number} [weight=1] the edge's weight.
 */
function Edge(nodeStart, nodeEnd, id, weight, label){

  var privates = {};

  privates.id =  id;
  privates.nodeStart = nodeStart;
  privates.nodeEnd = nodeEnd;
  weight != null ? privates.weight = weight : privates.weight = 1;
  privates.label = label;

  /** This method returns edge's identifier.
   * @returns {any} edge's identifier (only string or number).
   */
  this.getId = function(){

    return privates.id;
  };

  /** This method returns node which begins the edge.
   * @returns {Node} node which begins the edge.
   */
  this.getNodeStart = function(){

    return privates.nodeStart;
  };

  /** This method returns node which terminates the edge.
   * @returns {Node} node which terminates the edge.
   */
  this.getNodeEnd = function(){

    return privates.nodeEnd;
  };

  /** This method returns edge's weight.
   * @returns {Number} edge's weight.
   */
  this.getWeight = function(){

    return privates.weight;
  };

  /** This method returns edge's label.
   * @returns {any} edge's label (only string).
   */
  this.getLabel = function(){

    return privates.label;
  };

  /** This method modifies edge's weight.
   * @param {Number} weight new edge's weight.
   */
  this.setWeight = function(weight){

    privates.weight = weight;
  };
};

/** Private class Node.
 * @param {any} object the object contained in node.
 * @param {any} id node's identifier (only string or number).
 */
function Node(object, id){

  var privates = {};

  privates.id = id;
  privates.content = object;

  /** This method returns node's identifier.
   * @returns {any} node's identifier (only string or number).
   */
  this.getId = function(){

    return privates.id;
  };

  /** This method returns node's content.
   * @returns {any} node's content.
   */
  this.getContent = function(){

    return privates.content;
  }

  /** This method modifies node's content.
   * @param {any} content new content for node.
   */
  this.setContent = function(content){

    privates.content = content;
  };
};

function equal(str1, str2){

  str1 = str1.toString();
  str2 = str2.toString();
  return str1.localeCompare(str2) == 0 ? true : false;
};

/** this class Graph.
 */
module.exports = function Graph(){

  var privates = {};

  privates.nodes = new Array();
  privates.edges = new Array();

  /** This method checks if a node exists in graph.
   * @param {any} id node's identifier (only string or number).
   * @returns {boolean} true if node exists, else false.
   */
  this.isNode = function(id){

    var result = false;

    for(var n in privates.nodes){

        if(equal(privates.nodes[n].getId(), id))
          result = true;
    }

    return result;
  };

  /** This method checks if an edge exists in graph.
   * @param {any} id edge's identifier (only string or number).
   * @returns {boolean} true if edge exists, else false.
   */
  this.isEdge = function(id){

    var result = false;

    for(var e in privates.edges){

      if(equal(privates.edges[e].getId(), id))
        result = true;
    }

    return result;
  };

  /** This method adds a node in graph.
   * @param {any} object the object contained in node.
   * @param {any} id node's identifier (only string or number).
   */
  this.addNode = function(object, id){

    if(object != null && id != null){

      if(!this.isNode(id)){

        var node = new Node(object, id);
        privates.nodes.push(node);
      }
      else
        console.error("Error : The node's id is already exists");
    }
    else
      console.error("Error : The node is not correctly defined");
  };

  /** This method adds an edge in graph.
   * @param {any} idNodeStart node's identifier which begins the edge.
   * @param {any} idNodeEnd node's identifier which terminates the edge.
   * @param {any} id edge's identifier (only string or number).
   * @param {Number} [weight=1] the edge's weight.
   * @param {any} label string label for the edge.
   */
  this.addEdge = function(idNodeStart, idNodeEnd, id, weight, label){

    if(idNodeStart != null && idNodeEnd != null && id != null){

      if(this.isNode(idNodeStart) && this.isNode(idNodeEnd)){

        if(!this.isEdge(id)){

          var edge = new Edge(this.getNode(idNodeStart), this.getNode(idNodeEnd), id, weight, label);
          privates.edges.push(edge);
        }
        else
          console.error("Error : The edge's id is already exists");
      }
      else
        console.error("Error : The edge is not create because one of nodes doesn't exist.");
    }
    else
      console.error("Error : The edge is not correctly defined.");
  };

  /** This method removes a node in graph.
   * @param {any} id node's identifier to be removed.
   */
  this.removeNode = function(id){

    var arrayIndex = new Array();

    for(var n in privates.nodes){

      if(equal(privates.nodes[n].getId(), id)){

        privates.nodes.splice(n, 1);
      }
    }

    for(var e in privates.edges){

      if(equal(privates.edges[e].getNodeStart().getId(), id) || equal(privates.edges[e].getNodeEnd().getId(), id)){

        arrayIndex.push(e);
      }
    }

    for(var i in arrayIndex){

      arrayIndex[i] -= i;
    }

    for(var i in arrayIndex){

      privates.edges.splice(arrayIndex[i], 1);
    }

    arrayIndex = [];

  };

  /** This method removes an edge in graph.
   * @param {any} id edge's identifier to be removed.
   */
  this.removeEdge = function(id){

    for(var e in privates.edges){

      if(equal(privates.edges[e].getId(), id)){

        privates.edges.splice(e, 1);
      }
    }
  };

  /** This method returns the list of node's predecessors.
   * @param {any} id node's identifier whose predecessors are sought.
   * @returns {Array} list of node's predecessors.
   */
  this.getPredecessors = function(id){

    var predecessors = new Array();

    for(var e in privates.edges){

      if(equal(privates.edges[e].getNodeEnd().getId(), id)){

        predecessors.push(privates.edges[e].getNodeStart());
      }
    }

    return predecessors;
  };

  /** This method returns the list of node's successors.
   * @param {any} id node's identifier whose predecessors are sought.
   * @returns {Array} list of node's successors.
   */
  this.getSuccessors = function(id){

    var successors = new Array();

    for(var e in privates.edges){

      if(equal(privates.edges[e].getNodeStart().getId(), id)){

        successors.push(privates.edges[e].getNodeEnd());
      }
    }

    return successors;
  };

  /** This method returns a node.
   * @param {any} id node's identifier searched.
   * @returns {Node} node searched.
   */
  this.getNode = function(id){

    var result = new Node();

    for(var n in privates.nodes){

      if(equal(privates.nodes[n].getId(), id)){

        result = privates.nodes[n];
      }
    }

    return result;
  };

  /** This method returns the list of graph's nodes.
   * @returns {Array} list of graph's nodes.
   */
  this.getNodes = function(){

    return privates.nodes;
  };

  /** This method returns an edge.
   * @param {any} id edge's identifier searched.
   * @returns {Edge} edge searched.
   */
  this.getEdge = function(id){

    var result = new Edge();

    for(var e in privates.edges){

      if(equal(privates.edges[e].getId(), id)){

        result = privates.edges[e];
      }
    }

    return result;
  };

  /** This method returns the list of graph's edges.
   * @returns {Array} list of graph's edges.
   */
  this.getEdges = function(){

    return privates.edges;
  };

};
