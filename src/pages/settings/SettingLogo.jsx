import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./settingLogo.scss"
import { useEffect, useState } from "react"
import DatePicker from "react-datepicker";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';


const SettingLogo = () => {
    const [file, setFile] = useState("");

    return (
        <div className="setting">
            <Sidebar />
            <div className="settingContainer">
                <Navbar />
                <div className="settingDiv">
                    {/* Settings
                    <DatePicker className="datas" selected={startDate} onChange={(date) => setStartDate(date)}/> */}
                    <ul>
                    <li><a href="../settings">Dados da Empresa</a></li>
                        <li><a >Titulo e Logo</a></li>
                        <li><a href="payroll">Folha de Salario</a></li>
                    </ul>
                </div>
                <div className="logoDiv">
                    <div className="company">
                        <label>Titulo/Nome da Empresa</label>
                        <input type="text" />
                    </div>
                    <div className="upload">
                        <div>
                            <label htmlFor="file">Logo da Empresa: <DriveFolderUploadOutlinedIcon className="icon" /></label>
                            <input   type="file" id="file" style={{ display: 'none' }}/>
                        </div> 
                        <div className="imgDiv">
                        <img 
                            src={
                            file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            } 
                            alt="" />
                        </div>
                        
                    </div>
                </div>
                <div className="buttonDiv">
                    <button type="submit">Salvar</button>
                </div>
            </div>
        </div>
    )
}

export default SettingLogo;