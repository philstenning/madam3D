import React from 'react'
import IconAccessibility from "~icons/tabler/folders";
import IconHelp from "~icons/ic/outline-live-help";
// import html from '../markdown/help.md'
import help from '../markdown/help.md'
const Help = () => {
    return (
      <>
        <div className="details">
         
       
        </div>
        <div>
      
            <div dangerouslySetInnerHTML={{ __html: help }} />   <p>
            <a href="https://github.com/antfu/unplugin-icons">
              icons https://github.com/antfu/unplugin-icons
            </a>
            <br />
            <a href="https://icon-sets.iconify.design/?query=remove">
              info https://icon-sets.iconify.design/?query=remove
            </a>
          </p>
          <IconHelp style={{ fontSize: "2rem", color: "green" }} />
          <IconAccessibility />
        </div>
      </>
    );
}

export default Help
