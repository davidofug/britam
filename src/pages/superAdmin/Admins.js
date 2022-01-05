import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import { MdDownload } from 'react-icons/md'
import Pagination from '../../helpers/Pagination';
import SearchBar from '../../parts/searchBar/SearchBar';
import Header from '../../parts/header/Header';
import { functions } from '../../helpers/firebase';
import { httpsCallable } from 'firebase/functions';
import { FaEllipsisV } from "react-icons/fa";
import { Table } from 'react-bootstrap'

function Admins() {

    useEffect(() => {
      document.title = 'Britam - Admins'

      const listUsers = httpsCallable(functions, 'listUsers')
      listUsers().then((results) => {
          const resultsArray = results.data
          const myUsers = resultsArray.filter(user => user.role.supervisor === true)
          setAdmins(myUsers)
      }).catch((err) => {
          console.log(err)
      })

    }, [])

    const [admins, setAdmins] = useState([]);
    const [supervisors, setSuperviors] = useState([]);
  //
    const [editFormData, setEditFormData] = useState({
        name: "",
        gender: "",
        email: "",
        contact: "",
        address: "",
    });

  const [editContactId, setEditContactId] = useState(null);

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };


  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      gender: editFormData.gender,
      email: editFormData.email,
      contact: editFormData.contact,
      address: editFormData.address,
    };
    
    const newSupervisors = [...supervisors];

    const index = supervisors.findIndex((supervisor) => supervisor.id === editContactId);

    newSupervisors[index] = editedContact;

    setAdmins(newSupervisors);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      gender: contact.gender,
      email: contact.email,
      contact: contact.contact,
      address: contact.address,
    };

    setEditFormData(formValues);
  };

  //

    //
    const [ currentPage, setCurrentPage ] = useState(1)
    const [adminsPerPage] = useState(10)

    const indexOfLastAdmin = currentPage * adminsPerPage
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage
    const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin)
    const totalPagesNum = Math.ceil(admins.length / adminsPerPage)



    const handleDeleteClick = (supervisorId) => {
        const newSupervisors = [...supervisors];
        const index = supervisors.findIndex(supervisor => supervisor.id === supervisorId);
        newSupervisors.splice(index, 1);
        console.log(newSupervisors)
        setAdmins(newSupervisors);
      };
  
      const handleCancelClick = () => {
        setEditContactId(null);
      };



    const [q, setQ] = useState('');

    const columnHeading = ["#", "License No.", "Name", "Gender", "Email", "NIN", "Contact", "Role", "Branch Name", "Actions"]
    const columns = ["id", "contact", "name", "gender", "email", "contact", "contact", "email", 'address']
    const search = rows => rows.filter(row =>
        columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

        const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className='components'>
          <Header title="Supervisors" subtitle="MANAGING SUPERVISORS" />

            <div id="add_client_group">
                <div></div>
                <Link to="/add-user">
                    <button className="btn btn-primary cta">Add supervisor</button>
                </Link>
                
            </div>

            <div className="shadow-sm table-card componentsData">   
                <div id="search">
                            <SearchBar placeholder={"Search for Supervisor"} value={q} handleSearch={handleSearch}/>
                            <div></div>
                            <button className='btn btn-primary cta mb-3'>Export <MdDownload /></button>
                      </div>

                <Table hover striped responsive>
                        <thead>
                            <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                          {admins.map((admin, index) => (
                              <tr key={admin.uid}>
                              <td>{index+1}</td>
                              <td>{admin.name}</td>
                              <td>{admin.email}</td>
                              <td>{admin.email}</td>
                              <td>Contact</td>
                              <td>Address</td>
                <td className="started">
                  <FaEllipsisV
                    className={`actions please`}
                    onClick={() => {
                      document
                        .querySelector(`.please`)
                        .classList.add("hello");
                    }}
                  />
                  <ul id="actionsUl" className="actions-ul">
                  
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please`)
                            .classList.remove("hello");
                          const confirmBox = window.confirm(
                            `Are you sure you want to delete's claim`
                          );
                          if (confirmBox === true) {
                          }
                        }}
                      >
                        Delete
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please`)
                            .classList.remove("hello");
                        }}
                      >
                        Edit
                      </button>
                    </li>
                    <hr style={{ color: "black" }}></hr>
                    <li>
                      <button
                        onClick={() => {
                          document
                            .querySelector(`.please`)
                            .classList.remove("hello");
                        }}
                      >
                        close
                      </button>
                    </li>
                  </ul>
                </td>
                          </tr>
                          ))}
                            
                        </tbody>
                        <tfoot>
                            <tr><th>#</th><th>Name</th><th>Gender</th><th>Email</th><th>Contact</th><th>Address</th><th>Action</th></tr>
                        </tfoot>
                    </Table>

                  <Pagination 
                    pages={totalPagesNum}
                    setCurrentPage={setCurrentPage}
                    currentClients={currentAdmins}
                    sortedEmployees={admins}
                    entries={'Admins'} />

               
            </div>
        </div>
    )
}

export default Admins