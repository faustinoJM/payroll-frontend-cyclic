import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./profile.scss"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";

const Profile = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="setting">
            <Sidebar />
            <div className="settingContainer">
                <Navbar />
                <div className="settingDiv">
                    <div className="title">
                        Perfil
                        <Link to={''} className="link">
                            Adicionar Novo
                        </Link>
                    </div>
                </div>
                <div className="profileDiv">
                    <div className="title">
                        Lista de Usuario
                    </div>
                    <table className="profileTab">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <td>joao</td>
                                <td>joao@123.com</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
            </div>
        </div>
    )
}

export default Profile;