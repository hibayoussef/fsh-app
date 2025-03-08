import { useRef } from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const chartData = {
  id: "1",
  name: "Apex Financial Group",
  children: [
    {
      id: "2",
      name: "Merchant 1",
      children: [
        { id: "4", name: "Branch 1" },
        { id: "5", name: "Branch 2" },
      ],
    },
    { id: "3", name: "Merchant 2" },
  ],
};

const PartnersAsChart = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-[#222B45] font-semibold">[Partner name] Chart</h2>
      <div className="px-5 py-8 bg-white rounded-[4px]">
        <Tree
          lineWidth={"1px"}
          lineColor={"#64748B"}
          lineBorderRadius={"10px"}
          label={<h2>Root</h2>}
        >
          <TreeNode label={<h2>Child 1</h2>}>
            <TreeNode label={<h2>Grand Child</h2>} />
          </TreeNode>
          <TreeNode label={<h2>Child 2</h2>}>
            <TreeNode label={<h2>Grand Child</h2>}>
              <TreeNode label={<h2>Great Grand Child 1</h2>} />
              <TreeNode label={<h2>Great Grand Child 2</h2>} />
            </TreeNode>
          </TreeNode>
          <TreeNode label={<h2>Child 3</h2>}>
            <TreeNode label={<h2>Grand Child 1</h2>} />
            <TreeNode label={<h2>Grand Child 2</h2>} />
          </TreeNode>
        </Tree>
      </div>
    </div>
  );
};

export default PartnersAsChart;
