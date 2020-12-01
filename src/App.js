import React, { useState, useEffect } from 'react';
import { Modal, Button,Container,Col,Row } from 'react-bootstrap';
import './bootstrap.min.css'
const App = () => {

  const [title, setTitle] = useState('')
  const [arrayVal, setArrayVal] = useState([])
  const [titleVal, setTitleVal] = useState('')
  const [idValue, setidVal] = useState(0)
  const [show, setShow] = useState(false);
 

  //adding a note
  const handleClick = () => {

    if (localStorage.getItem('notesData')) {

      let value = JSON.parse(localStorage.getItem('value'));
      value = value + 1
      let data = JSON.parse(localStorage.getItem('notesData'))
      let obj = {
        id: value,
        title
      }
      data.push(obj);
      setArrayVal(data)
      localStorage.setItem('value', JSON.stringify(value))
      localStorage.setItem('notesData', JSON.stringify(data))
      setTitle('');
    }

    else {
      let i = 1;
      let obj = {
        id: i,
        title
      }
     
      let arr = []
      arr.push(obj)
      setArrayVal(arr)
      localStorage.setItem('value', JSON.stringify(i))
      localStorage.setItem('notesData', JSON.stringify(arr))
      setTitle('')
    }
  }


  //deleting the note
  const handleDelete = (idval) => {
    let newArrayVal = arrayVal.filter((item) => {
      if (item.id !== idval) {
        return item
      }
    })

    setArrayVal(newArrayVal)
    localStorage.setItem('notesData', JSON.stringify(newArrayVal))
  }

  //updating a note
  const handleUpdate = () => {
   let updatedData = arrayVal.map((item) => {
      if (item.id === idValue) {
        item.title = titleVal;
        return item;
      }

      else{
        return item;
      }
    })

    setArrayVal(updatedData)
    localStorage.setItem('notesData', JSON.stringify(updatedData))
    setShow(false);
    setTitleVal('')
  }

  
  const handleClose = () => setShow(false);
  const handleShow = (idval, titlevalue) => {

    setidVal(idval);
    setTitleVal(titlevalue);
    setShow(true);
  }

  useEffect(() => {
    if (localStorage.getItem('notesData')) {
      let data = JSON.parse(localStorage.getItem('notesData'));
      setArrayVal(data)

    }
  }, [])

  return (
    <>
    <Container style={{marginTop:"1em"}}>
      <Row>
        <Col>
        <input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleClick}>Add Note</button>

      {
        arrayVal.length !== 0 ? (
          arrayVal.map((item, index) => (
            <div key={index}>
              {item.title} <i className="fas fa-edit" onClick={() => handleShow(item.id, item.title)}></i>  <i className="fas fa-trash-alt" onClick={() => handleDelete(item.id)}></i>
            </div>
          ))

        ) : <div>No notes present!!</div>
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Note..</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={idValue} onChange={(e) => setTitleVal(e.target.value)} hidden />
          <input type="text" placeholder="Enter title" value={titleVal} onChange={(e) => setTitleVal(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </Col>
      </Row>
    </Container>
      
    </>
  )
}

export default App;