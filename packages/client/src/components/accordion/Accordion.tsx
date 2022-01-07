import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Accordion = () => {
  const [isToggled, setIsToggled] = useState(false);
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsToggled(!isToggled);
  }

  return (
    <div>
      <AnimatePresence>
        <button type="button" onClick={(e) => handleClick(e)}>
          click me
        </button>
        {isToggled && (
          <motion.div
            style={{overflow:'hidden'}}
            initial={{ opacity: 0, height:0 }}
            animate={{ opacity: 1 , height:'auto'}}
            
            exit={{ opacity: 0 , height:0}}
          >
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
              laborum aliquam quidem ipsum fugiat sit? Accusantium deserunt
              minima hic quod ratione quibusdam perspiciatis voluptate
              temporibus? Sequi explicabo accusantium labore tenetur esse
              tempore officiis alias unde, incidunt similique quasi repellendus
              id ea, sapiente ducimus nihil eius numquam molestiae minima. Quos,
              expedita.
            </p>
          
          </motion.div>
        )}
      </AnimatePresence>  <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam
              dolores fugiat, facilis unde ipsa nam amet voluptatem praesentium!
              Non delectus fugiat eaque illum dolor consectetur nam sequi
              possimus distinctio nihil?
            </p>
    </div>
  );
};

export default Accordion;
