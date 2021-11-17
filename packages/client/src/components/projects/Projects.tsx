import React, { useState, useEffect } from "react";
import { db, IProject } from "../../db/db";
import { useLiveQuery } from "dexie-react-hooks";
import "./projects.css";
const Projects = () => {
  const projects = useLiveQuery(() =>
    db.projects.orderBy("created").reverse().toArray()
  );
  // const [projects, setProjects] = useState<IProject[]>([])

  const loadProjects = async () => {
    //    setProjects(await db.projects.orderBy('created').toArray())
  };

  // useEffect(()=>{
  //   loadProjects()
  // },[])

  const createProject = async () => {
    const createdAt = new Date();
    const project: IProject = {
      created: createdAt,
      updated: createdAt,
      name: "ok ",
      itemIds: [],
    };
    const id = await db.projects.add(project);
    if (id > 0) {
      project.id = id;
      //    setProjects(current=>[...current, project])
    }
  };
  return (
    <div className="project-page">
      {/* <div>top</div> */}

      <header className="project-page__header">
        <h2>Projects</h2>
        <button onClick={createProject}>Add</button>
        {projects && <p>{`Total projects: ${projects.length}`}</p>}
        <ul>
          <li>edit project</li>
          <li>delete project</li>
        </ul>
      </header>

      <div className="projects-list">
        {projects && projects.map((project) => <Card project={project} />)}
      </div>

      {/* <footer className="project-page__footer"></footer> */}
    </div>
  );
};

export default Projects;

type Props = {
  project: IProject;
};
const Card = ({ project }: Props) => {
  return (
    <article key={project.id} className="project-card">
      <header className="project-card__header"> {project.name}</header>
      <img src="https://source.unsplash.com/featured?technology" style={{width:'100%'}} alt="" />
      <ul className="project-card__list">
        <li className="project-card__list-item">
          files: {project.itemIds.length}
        </li>
        <li className="project-card__list-item">
          CREATED: {project.created.toLocaleString()}
        </li>
      </ul>
    </article>
  );
};
