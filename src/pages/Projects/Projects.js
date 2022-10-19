import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Message from '../../components/layout/Message/Message';
import styles from './Projects.module.css';
import Container from '../../components/layout/Container/Container'
import LinkButton from '../../components/layout/LinkButton/LinkButton'
import ProjectCard from '../../components/project/Card/ProjectCard';
import Loading from '../../components/layout/Loading/Loading';

export default function Projects () {

  const [projects, setProjects] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setprojectMessage] = useState('')

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setProjects(data)
      setRemoveLoading(true)
    })
    .catch(err => console.log(err))
    }, 300);
  }, [])

  function removeProject ( id ) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(() => {
      setProjects(projects.filter(project => project.id !== id))
      setprojectMessage("Projeto removido com sucesso!")
    })
    .catch(err => console.log(err))
  }

  const location = useLocation();

  let message = ''

  if(location.state) {
    message = location.state.message
  }
  
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="sucess" message={message} />}
      {projectMessage && <Message type="sucess" message={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 && 
          projects.map(project => <ProjectCard 
            id={project.id}
            name={project.name}
            budget={project.budget}
            category={project.category.name}
            key={project.id}
            handleRemove={removeProject}
          /> )}
          {!removeLoading && <Loading/>}
          {removeLoading && projects.length === 0 && (
            <p className={styles.not_found}>Não há nada por aqui!</p>
          )}
      </Container>
    </div>
  )
}