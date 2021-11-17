// import React from "react";
import { db,  createProject } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import "./projects.css";
import {  RiAddLine } from "react-icons/ri";
import {  Outlet } from "react-router-dom";
import ProjectCard from './ProjectCard'
const Projects = () => {
  const projects = useLiveQuery(() =>
    db.projects.orderBy("created").reverse().toArray()
  );

  return (
    <div className="project-page">
      <header className="project-page__header">
        <button className="btn" onClick={() => createProject()}>
          <RiAddLine className="font-size--l" />
          <span className="font-size--m"> New</span>
        </button>
        {projects && (
          <p className="font-size--s">{`PROJECTS: ${projects.length}`}</p>
        )}
      </header>
      {/* this is section with the project list */}
      <div className="projects-list">
        {projects &&
          projects.map((project) => <ProjectCard project={project} key={project.id} />)}
      </div>
      <div>
        {/* display the results of the project selected. */}
        <Outlet />
      </div>
    </div>
  );
};

export default Projects;

