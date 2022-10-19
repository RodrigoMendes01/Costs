import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parse, v4 as uuidv4} from 'uuid'
import styles from './Project.module.css';

import Loading from '../../components/layout/Loading/Loading';
import Container from '../../components/layout/Container/Container'
import ProjectForm from '../../components/project/ProjectForm/ProjectForm';
import Message from '../../components/layout/Message/Message';
import ServiceForm from '../../components/service/ServiceForm';
import ServiceCard from '../../components/service/ServiceCard'

export default function Project() {

  const [project, setProject] = useState([])
  const [services, setServices] = useState([])
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')


  const { id } = useParams();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          setProject(data)
          setServices(data.services)
        })
        .catch(err => console.log(err))
    }, 300)
  }, [id])

  function editPost (project) {
    setMessage('')
    if (project.budget < project.cost) {
      setMessage("O orçamento não pode ser menor que o serviço")
      setMessageType("error")
      return false
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setProject(data)
      setShowProjectForm(false)
      setMessage("Projeto atualizado com sucesso!")
      setMessageType("sucess")

    })
    .catch(err => console.log(err))
  }

  function createService (project) {
    setMessage('')
    const lastService = project.services[project.services.length - 1]
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost

    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    if(newCost > parseFloat(project.budget)) {
      setMessage("orçamento ultrapassado, verifique o valor do serviço")
      setMessageType('error')
      project.service.pop()
      return false
    }

    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => {
      setShowServiceForm(false)
    })
    .catch(err => console.log(err))
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  function removeService (id, cost) {
    setMessage('')
    const serviceUpdate = project.services.filter(service => {
      return service.id !== id
    })

    const projectUpdated = project

    projectUpdated.services = serviceUpdate
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
    .then(response => response.json())
    .then(data => {
      setProject(projectUpdated)
      setServices(serviceUpdate)
      setMessageType('sucess')
      setMessage('Serviço removido com sucesso')
    })
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_detail}>
          <Container customClass="column">
            {message && <Message type={messageType} message={message}/>}
            <div className={styles.details_container}>
              <h3>Projeto: {project.name}</h3>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm  
                    handleSubmit={editPost} 
                    btnText="Concluir edição"
                    projectData={project}
                    customForm="form_edit"
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
                <h3>Adicione um serviço:</h3>
                <button className={styles.btn} onClick={toggleServiceForm}>
                  {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                </button>
                <div className={styles.project_info}>
                  {showServiceForm && (
                    <ServiceForm
                      handleSubmit={createService}
                      btnText="Adicionar serviço"
                      projectData={project}
                    />
                  )}
                </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
                {services.length > 0 &&
                  services.map(service => (
                    <ServiceCard
                      id={service.id}
                      name={service.name}
                      cost={service.cost}
                      description={service.description}
                      key={service.id}
                      handleRemove={removeService}
                    />
                  ))
                }
                {services.length === 0 &&
                  <p>Não há serviços cadastrados</p>
                }
            </Container>
          </Container>
        </div>
      ) : (<Loading />)}
    </>
  )
}