import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to edit a user
function EditStudent(props) {
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  let navigate = useNavigate();
  const [student, setStudent] = useState({_id: '', firstName: '', lastName:'', studentNumber:'',
                                          password:'',address:'', city:'',phoneNumber:'',
                                          email:'',program:'',techSkills:'',favouriteTopics:''});  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/students/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName:student.firstName,lastName:student.lastName,studentNumber:student.studentNumber, password:student.password,address:student.address,
                    city:student.city, phoneNumber:student.phoneNumber,email:student.email,program:student.program,techSkills:student.techSkills,favouriteTopics:student.favouriteTopics };
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/show/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when student enters a field
  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateStudent}>
        <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Student Number</Form.Label>
                <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter last name" value={student.studentNumber} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" id="address" placeholder="Enter address" value={student.address} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control type="text" name="city" id="city" placeholder="Enter city" value={student.city} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phone number" value={student.phoneNumber} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Program</Form.Label>
                <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tech Skills</Form.Label>
                <Form.Control type="textarea" row="2" name="techSkills" id="techSkills" placeholder="Enter tech skills" value={student.techSkills} onChange={onChange} />
              </Form.Group>
             
              <Form.Group>
                <Form.Label>Favourite Topics</Form.Label>
                <Form.Control type="text" name="favouriteTopics" id="favouriteTopics" placeholder="Enter your favourite topics" value={student.favouriteTopics} onChange={onChange} />
              </Form.Group>
                  
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
    </div>
  );
}
//
export default EditStudent;
