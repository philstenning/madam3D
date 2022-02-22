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
             ok
            </p>
          
          </motion.div>
        )}
      </AnimatePresence>  
    </div>
  );
};

export default Accordion;
