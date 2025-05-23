// import { Tree, TreeNode } from "react-organizational-chart";
// import Button from "../../components/ui/button/Button";
// import { PencilIcon, TrashBinIcon } from "../../icons";

// const Node = ({ text }: { text: string }) => {
//   return (
//     <div className="shadow-lg rounded-[4px] overflow-hidden max-w-[240px] mx-auto">
//       <div className="bg-[#172759] h-[5px] w-full relative"></div>
//       <div className="p-2 text-center mt-7">
//         <h2>{text}</h2>
//         <div className="mt-5 flex gap-1 justify-end">
//           <Button size="icon">
//             <PencilIcon />
//           </Button>
//           <Button size="icon">
//             <TrashBinIcon />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PartnersAsChart = () => {
//   return (
//     <div className="space-y-2">
//       <h2 className="text-[#222B45] font-semibold">Chart</h2>
//       <div className="px-5 py-8 bg-white rounded-[4px]">
//         <Tree
//           lineWidth={"1px"}
//           lineColor={"#64748B"}
//           lineBorderRadius={"10px"}
//           label={<Node text="Apex Financial Group" />}
//         >
//           <TreeNode label={<Node text="[Merchant name]" />}></TreeNode>
//           <TreeNode label={<Node text="[Merchant name]" />}>
//             <TreeNode label={<Node text="[Branch name]" />}></TreeNode>
//             <TreeNode label={<Node text="[Branch name]" />}></TreeNode>
//           </TreeNode>
//           <TreeNode label={<Node text="[Merchant name]" />}></TreeNode>
//         </Tree>
//       </div>
//     </div>
//   );
// };

import { Tree, TreeNode } from "react-organizational-chart";
import { usePartnerOrgTree } from "../../hooks/usePartners";
import Button from "../../components/ui/button/Button";
import { PencilIcon, TrashBinIcon } from "../../icons";
import { useParams } from "react-router";
import Loader from "../../components/ui/loder/loader";

const Node = ({ text }: { text: string }) => {
  return (
    <div className="shadow-lg rounded-[4px] overflow-hidden max-w-[240px] mx-auto">
      <div className="bg-[#172759] h-[5px] w-full relative"></div>
      <div className="p-2 text-center mt-7">
        <h2>{text}</h2>
        <div className="mt-5 flex gap-1 justify-end">
          <Button size="icon">
            <PencilIcon />
          </Button>
          <Button size="icon">
            <TrashBinIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

const renderTree = (node: any) => {
  return (
    <TreeNode key={node.id} label={<Node text={node.name} />}>
      {node.children?.map((child: any) => renderTree(child))}
    </TreeNode>
  );
};

const PartnersAsChart = () => {
  const {id} = useParams(); 

  const { data, isLoading } = usePartnerOrgTree(Number(id));

  if (isLoading) return <Loader />

  return (
    <div className="space-y-2">
      <h2 className="text-[#222B45] font-semibold">Chart</h2>
      <div className="px-5 py-8 bg-white rounded-[4px]">
        <Tree
          lineWidth={"1px"}
          lineColor={"#64748B"}
          lineBorderRadius={"10px"}
          label={<Node text={data.name} />}
        >
          {data.children?.map((child: any) => renderTree(child))}
        </Tree>
      </div>
    </div>
  );
};
export default PartnersAsChart;
