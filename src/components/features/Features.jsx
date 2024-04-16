import FeatureCard from './FeatureCard';
import { LuShapes } from "react-icons/lu";
import { FaImage } from "react-icons/fa6";
import { HiColorSwatch } from "react-icons/hi";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import Shapes from './Shapes';
import Colors from './Colors';
import Advanced from './Advanced';
import Image from './Image';

const Features = () => {
  const features = [
    {
      SVG: Shapes,
      iconComponent: <LuShapes size={40} />,
      title: "Drawing Tools",
      description: "Create beautiful drawings, flowcharts, and diagrams with a variety of intuitive drawing tools.",
      featureItems: ["Rich set of drawing tools", "Flexible canvas grid options"]
    },
    {
      SVG: Image,
      iconComponent: <FaImage size={40} />,
      title: "Export as Image",
      description: "Download your canvas creations as high-quality images to easily share or print them.",
      featureItems: ["Export drawings as PNG ", "High-resolution output"]
    },
    {
      SVG: Colors ,
      iconComponent: <HiColorSwatch size={40} />,
      title: "Color Options",
      description: "Personalize your canvas with a wide range of color options for backgrounds and stroke colors.",
      featureItems: ["Customizable background colors", "Variety of stroke colors for shapes"]
    },
    {
      SVG: Advanced ,
      iconComponent: <MdOutlineSettingsInputComponent size={40} />,
      title: "Advanced Features",
      description: "Enhance your drawing experience with advanced features.",
      featureItems: ["Undo and redo functionality", "Flexible zoom, canvas resizing and pan controls"]
    }
  ];

  return (
    <div className='flex mb-20 flex-wrap gap-20 items-center justify-center'>
      {features.map((feature, index) => (
        <FeatureCard
        key={feature.title}
        SVG={feature.SVG}
        iconComponent={feature.iconComponent}
        title={feature.title}
        description={feature.description}
        featureItems={feature.featureItems}
        index={feature.title} // Pass the index prop
      />      
      ))}
    </div>
  );
};

export default Features;
