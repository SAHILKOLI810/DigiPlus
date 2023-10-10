import react, { useState } from "react";
import "./App.css";

function App() {
  const [nodes, setNodes] = useState([]);
  const [nodeType, setNodeType] = useState("");
  const [nodeValue, setNodeValue] = useState("");
  const [parentChildNodes, setParentChildNodes] = useState([])
  const [selectedNodeValue, setSelectedNodeValue] = useState("");
  const [selectedNode, setSelectedNode] = useState("");

  const handleEdit = () => {
    setNodes(
      nodes.map((node) => {
        if (node.id === selectedNode)
          return { id: node.id, value: selectedNodeValue };
        return node;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nodeType === 'Parent Node') {
      setParentChildNodes({id: Math.random, type: 'PN', value:nodeValue, childs: [] })
    } else if (nodeType === 'Child Node') {
      setParentChildNodes((prev) => {
        const newNodes = prev.childs.push(nodeValue);
        return newNodes;
      })
    } else if (nodeType === 'Single Node') {
      setNodes((prev) => {
        return [...prev, { id: Math.random(), value: nodeValue }];
      });
      setNodeValue("");
    }
  };

  const handleDelete = () => {
    const newNodes = nodes.filter(node => {
      return node.id !== selectedNode
    })
    setNodes(newNodes);
    setSelectedNodeValue('');
  }

  return (
    <div className="bg-container">
      <form className="form" onSubmit={handleSubmit}>
        <label>Node Type</label>
        <select
          onChange={(e) => {
            setNodeType(e.target.value);
          }}
        >
          <option selected>Select One</option>
          <option value="Single Node">Single Node</option>
          <option value="Parent Node">Parent Node</option>
          <option value="Child Node">Child Node</option>
        </select>
        <label>Node Value</label>
        <input
          type="text"
          onChange={(e) => {
            setNodeValue(e.target.value);
          }}
          value={nodeValue}
        />
        <button type="Submit">Add Node</button>
      </form>
      <h1>Single Nodes</h1>
      <div className="nodes">
        {nodes.map((node) => (
          <div
            onClick={() => {
              setSelectedNode(node.id);
              setSelectedNodeValue(node.value);
            }}
          >
            {node.value}
          </div>
        ))}
      </div>
      <h1>Hierarchical Nodes</h1>
      <div>
            {parentChildNodes.map(nodes => {
              return (
                <ul>
                  {nodes.childs.map(n => {
                    return <li>{n}</li>
                  })}
                </ul>
              )
              
            })}
      </div>
      <input
        type="text"
        placeholder="Selected Node"
        value={selectedNodeValue}
        onChange={(e) => {
          setSelectedNodeValue(e.target.value);
        }}
      />
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default App;
