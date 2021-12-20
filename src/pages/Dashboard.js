import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/Auth'
import { Card, Container } from 'react-bootstrap'

import '../styles/dashboard.css'


function Dashboard() {
    const {currentUser} = useAuth()
    const [claims, setClaims] = useState(0)
    const [stickers, setStickers] = useState(13)
    const [policies, setPolicies] = useState(2)
    const [claimNotifications, setClaimNotifications] = useState(27)

    useEffect(() => {
        document.title = 'Britam - Welcome'
    }, [])

    return (
            <div className='components'>
                <div className='heading'>
                    <h1 className='title'>Welcome to Britam</h1>
                    <p className="subtitle">WITH YOU EVERY STEP OF THE WAY</p>
                </div>

                <div className="componentsData" >
                <div id="main-container">
                    <div className='mb-5' style={{display:"flex", gap:"2.5vw", width: "100%", justifyContent: "space-between"}}>
                        <div className="shadow-sm p-3 bg-body rounded" className="first-container">
                            <Container id="row-container">
                                <div style={{display:"flex", gap:"30px"}}>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#804C75"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${claims}`}</div>
                                                <div className="card-text">Claim Settlement</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#C82E29"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${stickers}`}</div>
                                                <div className="card-text">Stickers</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                                <div style={{display:"flex", gap:"30px"}}>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#FFB848"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${policies}`}</div>
                                                <div className="card-text">Policies</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col">
                                        <Card className="card" style={{"background-color":"#1FBBA6"}}>
                                            <Card.Body className="card-body">
                                                <div className="statistics">{`${claimNotifications}`}</div>
                                                <div className="card-text">Claim Notifications</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </Container>
                        </div>

                        <div className="shadow-sm p-3 bg-body rounded summaries " className="first-container" >
                            {/* Are these supposed to be links or just mere words? */}
                            <div style={{padding:"7vh 5vh", display:"flex", flexDirection:"column", gap:"20px"}}>
                                <h3>Agent issued reports</h3>
                                <h5>Grand totals</h5>
                                <p>Daily <span style={{"font-weight": "bold", "margin-left": "40px"}}>UGX 1000000000</span></p>
                                <p>Weekly <span style={{"font-weight": "bold", "margin-left": "40px"}}>UGX 1000000000</span></p>
                                <p>Monthly <span style={{"font-weight": "bold", "margin-left": "40px"}}>UGX 1000000000</span></p>
                            </div>
                
                        </div>
                    </div>

                    {/* Graph div  */}
                    <div className="shadow-sm p-3 mb-5 bg-body rounded graph-container" >
                    <h5 style={{"display":"flex", "gap": "10px"}}><span>
                        <div style={{"width": "20px", "height": "20px", "background-color": "#E0E7EC"}}></div>
                    </span>Monthly Stickers Issued</h5>
                    </div>
                </div>            
                        </div>
            </div>        
    )
}

export default Dashboard
