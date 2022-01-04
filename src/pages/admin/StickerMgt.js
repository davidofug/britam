import Header from "../../parts/header/Header"
import Badge from "../../parts/Badge"
import { useEffect, useState } from 'react'
import data from '../../helpers/mock-data.json'
import { MdDownload } from 'react-icons/md'
import Datatable from '../../helpers/DataTable';
import Pagination from '../../helpers/Pagination';
import { CSVLink } from "react-csv";
import SearchBar from '../../parts/searchBar/SearchBar';
import { Table } from "react-bootstrap"

export default function StickerMgt() {
    useEffect(() => document.title = 'Britam - Stickers Management')

    

    const [q, setQ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1)
    const [employeesPerPage] = useState(10)

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentOrganisations = data.slice(indexOfFirstEmployee, indexOfLastEmployee)
    const totalPagesNum = Math.ceil(data.length / employeesPerPage)

  const columns = ["id", "category", "contact", "contact", "status"]
  const search = rows => rows.filter(row =>
    columns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1,));

  const handleSearch = ({target}) => setQ(target.value)

    return (
        <div className="components">
            <Header title="Sticker No. Management" subtitle="MANAGE STICKER NUMBERS" />

            <div className="componentsData">
                    <div className="sticker-mgt">
                            <Badge color={"#5CB85C"} number={104} title={"Motor Bikes"} />
                            <Badge color={"#46B8DA"} number={25} title={"Motor Transit"} />
                            <Badge color={"#D43F3A"} number={77} title={"Motor Private"} />
                            <Badge color={"#FFB848"} number={10} title={"Motor Commercial"} />
                    </div>
                    <div className="shadow-sm table-card">
                    <div id="search">
                            <SearchBar placeholder={"Search"} value={q} handleSearch={handleSearch}/>
                            <div>
                            </div>
                            <CSVLink
                                data={data}
                                filename={"Britam-Organisations.csv"}
                                className="btn btn-primary cta"
                                target="_blank"
                              >
                                Export <MdDownload />
                            </CSVLink>
                      </div>

                      <Table responsive hover bordered striped>
                          <thead>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>Total No Received</th><th>Status</th></tr>
                          </thead>
                          <tbody>
                            <tr><td>#</td><td>Category</td><td>Sticker Nos</td><td>Total No Received</td><td>Active</td></tr>
                            <tr><td>#</td><td>Category</td><td>Sticker Nos</td><td>Total No Received</td><td>Active</td></tr>
                            <tr><td>#</td><td>Category</td><td>Sticker Nos</td><td>Total No Received</td><td>Active</td></tr>
                          </tbody>
                          <tfoot>
                            <tr><th>#</th><th>Category</th><th>Sticker Nos</th><th>Total No Received</th><th>Status</th></tr>
                          </tfoot>
                      </Table>

                      <Pagination 
                          pages={totalPagesNum}
                          setCurrentPage={setCurrentPage}
                          currentClients={currentOrganisations}
                          sortedEmployees={data}
                          entries={'Sticker Numbers'} />
                    </div>
            </div>
            
        </div>
    )
}
